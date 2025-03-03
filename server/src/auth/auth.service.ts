import { ForbiddenException, Injectable } from '@nestjs/common';
import { ActDto, LoginDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CODES } from 'lib/codes';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: LoginDto) {
    // Get data
    const user = await this.prisma.user.findUnique({
      where: {email: dto.email},
    })
    
    // Verify data
    if (!user) throw new ForbiddenException(CODES.AUTH.EMAIL_NOT_FOUND)
    const pwMatches = await argon.verify(user.password, dto.password)

    if(!pwMatches) throw new ForbiddenException(CODES.AUTH.WRONG_PASSWORD)
    if (!user.isActive) throw new ForbiddenException(CODES.AUTH.INACTIVE_ACCOUNT)

    // return user
    delete user.isActive
    delete user.password
    
    return user;
  }

  async register(dto: SignupDto) {
    // Check email
    const u = await this.prisma.user.findUnique({
      where: {email: dto.email},
      select: {email: true}
    })

    if (u) throw new ForbiddenException(CODES.AUTH.EXIST_EMAIL)

    // generate the password hash
    const hash = await argon.hash(dto.password);
    const otp = Math.floor(100000 + Math.random() * 900000)
    let date = new Date();
    date.setDate(date.getDate() + 1);

    // save the user to the database
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        fullname: dto.fullname,
        password: hash,
        otp: {
          create: {
            otp, limit: date
          },
        },
      },
      omit: {
        isActive: true,
        password: true
      }
    })

    // Send a confirmation email
    // return the user
    return user;
  }

  async activate(dto: ActDto) {
    // Get data
    const user = await this.prisma.user.findUnique({
      where: {email: dto.email},
      include: {otp: {
        select: {otp: true, limit: true}
      }}
    })

    // Verify data
    if (!user) throw new ForbiddenException(CODES.AUTH.EMAIL_NOT_FOUND)
    if (user.isActive) throw new ForbiddenException(CODES.AUTH.ACTIVE_ACCOUNT)

    if (new Date() > user.otp.limit) {
      // generate new number
      const otp = Math.floor(100000 + Math.random() * 900000)
      let date = new Date();
      date.setDate(date.getDate() + 1);

      // update the user
      await this.prisma.otp.update({
        data: {otp, limit: date},
        where: {userId: user.id}
      })

      throw new ForbiddenException(CODES.AUTH.NEW_OTD_GENERATED)
    }

    if (dto.otd !== user.otp.otp) throw new ForbiddenException(CODES.AUTH.WRONG_OTD)

    // Delete
    const a = await this.prisma.otp.delete({
      where: {userId: user.id}
    })
    await this.prisma.user.update({
      data: {isActive: true},
      where: {id: user.id}
    })

    // return user
    return user;
  }
}
