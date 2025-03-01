import { ForbiddenException, Injectable } from '@nestjs/common';
import { ActDto, LoginDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: LoginDto) {
    // Get data
    const user = await this.prisma.user.findUnique({
      where: {email: dto.email},
    })
    
    // Verify data
    if (!user) throw new ForbiddenException('Email doesn\'t exist')
    const pwMatches = await argon.verify(user.password, dto.password)

    if(!pwMatches) throw new ForbiddenException('Wrong password')
    if (!user.isActive) throw new ForbiddenException('The account is not activated yet.')

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

    if (u) return { message: ['Existing email'] }

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
    if (!user) throw new ForbiddenException('Email doesn\'t exist')
    if (user.isActive) throw new ForbiddenException('Your account is already active')

    if (new Date() > user.otp.limit) {
      // resend new number

      throw new ForbiddenException('Invalid number, we sent a new number')
    }

    if (dto.otd !== user.otp.otp) throw new ForbiddenException('Wrong number')

    // Delete
    const a = await this.prisma.otp.delete({
      where: {userId: user.id}
    })
    await this.prisma.user.update({
      data: {isActive: true},
      where: {id: user.id}
    })

    console.log(a);

    // return user
    return user;
  }
}
