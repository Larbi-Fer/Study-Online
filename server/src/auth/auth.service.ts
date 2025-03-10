import { ForbiddenException, Injectable } from '@nestjs/common';
import { ActDto, LoginDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CODES } from 'src/lib/codes';
import { sendEmailVerification } from 'src/lib/sendMail';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: LoginDto) {
    // Get data
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {lesson: {select: {topicId: true}}}
    })

    // Verify data
    if (!user) throw new ForbiddenException(CODES.AUTH.EMAIL_NOT_FOUND)
    const pwMatches = await argon.verify(user.password, dto.password)

    if (!pwMatches) throw new ForbiddenException(CODES.AUTH.WRONG_PASSWORD)
    if (!user.isActive) throw new ForbiddenException(CODES.AUTH.INACTIVE_ACCOUNT)

    // return user
    delete user.isActive
    delete user.password

    return user;
  }

  async register(dto: SignupDto) {
    // Check email
    const u = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { email: true }
    })

    if (u) throw new ForbiddenException(CODES.AUTH.EXIST_EMAIL)

    // generate the password hash
    const hash = await argon.hash(dto.password);

    const { otp, date } = generateOtp()

    const firstLesson = await this.prisma.lesson.findFirst({
      where: { number: 1, topic: { number: 1 } }
    })

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
        lesson: { connect: { id: firstLesson.id } }
      },
      omit: {
        isActive: true,
        password: true
      }
    })

    // Send a confirmation email
    // sendEmailVerification(dto.email, otp, dto.fullname)

    // return the user
    return user;
  }

  async activate(dto: ActDto) {
    // Get data
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        otp: {
          select: { otp: true, limit: true }
        }
      }
    })

    // Verify data
    if (!user) throw new ForbiddenException(CODES.AUTH.EMAIL_NOT_FOUND)
    if (user.isActive) throw new ForbiddenException(CODES.AUTH.ACTIVE_ACCOUNT)

    if (new Date() > user.otp.limit) {
      // generate new number
      const { otp, date } = generateOtp();

      // update the user
      await this.prisma.otp.update({
        data: { otp, limit: date },
        where: { userId: user.id }
      })

      sendEmailVerification(dto.email, otp, user.fullname)

      throw new ForbiddenException(CODES.AUTH.NEW_OTP_GENERATED)
    }

    if (dto.otd !== user.otp.otp) throw new ForbiddenException(CODES.AUTH.WRONG_OTP)

    // Delete
    const a = await this.prisma.otp.delete({
      where: { userId: user.id }
    })
    await this.prisma.user.update({
      data: { isActive: true },
      where: { id: user.id }
    })

    // return user
    delete user.otp
    delete user.isActive
    return user;
  }


  async searchEmail(email: string) {
    // Get data
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, fullname: true }
    })

    // Verify data
    if (!user) throw new ForbiddenException(CODES.AUTH.EMAIL_NOT_FOUND)

    return { message: CODES.AUTH.EXIST_EMAIL, payload: { id: user.id } }
  }

  async sendOtp(id: string) {
    // Get data
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { email: true, fullname: true }
    })

    // Verify data
    if (!user) throw new ForbiddenException(CODES.AUTH.EMAIL_NOT_FOUND)

    // generate new number
    const { otp, date } = generateOtp()

    // update the user
    await this.prisma.otp.upsert({
      create: { otp, limit: date, userId: id },
      update: { otp, limit: date },
      where: { userId: id }
    })

    // Send a confirmation email
    sendEmailVerification(user.email, otp, user.fullname)

    return { message: CODES.AUTH.NEW_OTP_GENERATED }
  }

  async verifyOtp(id: string, otp: number) {
    // Get data
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        otp: {
          select: { otp: true, limit: true }
        }
      }
    })

    // Verify data
    if (!user) throw new ForbiddenException(CODES.AUTH.EMAIL_NOT_FOUND)
    if (new Date() > user.otp.limit) {
      // generate new number
      const { otp, date } = generateOtp();

      // update the user
      await this.prisma.otp.update({
        data: { otp, limit: date },
        where: { userId: id }
      })

      sendEmailVerification(user.email, otp, user.fullname)

      throw new ForbiddenException(CODES.AUTH.NEW_OTP_GENERATED)
    }
    if (otp !== user.otp.otp) throw new ForbiddenException(CODES.AUTH.WRONG_OTP)

    // return user
    delete user.otp
    return { message: CODES.AUTH.CORRECT_OTP };
  }

  async resetPassword(id: string, password: string, otp: number) {
    // Check otp
    const otpTable = await this.prisma.otp.findUnique({
      where: { userId: id },
      select: { limit: true, otp: true }
    })

    if (!otpTable) throw new ForbiddenException(CODES.AUTH.OTP_NOT_FOUND)
    if (otpTable.otp !== otp) throw new ForbiddenException(CODES.AUTH.WRONG_OTP)
    if (new Date() > otpTable.limit) throw new ForbiddenException(CODES.AUTH.INVALID_OTP)

    // generate the password hash
    const hash = await argon.hash(password);

    // update the user
    const user = await this.prisma.user.update({
      data: { password: hash },
      where: { id }
    })

    // Delete otp
    await this.prisma.otp.deleteMany({
      where: { userId: id }
    })

    // return user
    delete user.password
    return { message: CODES.AUTH.PASSWORD_RESET };
  }
}

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000)
  let date = new Date();
  date.setDate(date.getDate() + 1);
  return { otp, date }
}