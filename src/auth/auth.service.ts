import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RoleEnum } from '../roles/roles.enum';
import { User } from '../users/entities/user.entity';
import { AllConfigType } from '../config/main/config.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'notFound',
        },
      });
    }

    if (!user.password) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const { token, tokenExpires } = await this.getTokenData({
      id: user._id.toString(),
      role: user.role
    });

    return {
      token,
      tokenExpires,
      user,
    };
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    await this.usersService.create({
      ...dto,
      email: dto.email,
      role: {
        id: String(RoleEnum.user),
        name: RoleEnum[RoleEnum.user]
      }
    });
  }

  private async getTokenData(data: {
    id: string;
    role: User['role'];
  }) {
    const tokenExpiresInMinutes = Number(this.configService.getOrThrow('auth.expires', {
      infer: true,
    }));

    const tokenExpires = Date.now() + (tokenExpiresInMinutes * 60000);

    const token = await this.jwtService.signAsync(
      {
        _id: data.id,
        role: data.role,
      },
      {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: String(tokenExpires),
      },
    )

    return {
      token,
      tokenExpires
    };
  }
}
