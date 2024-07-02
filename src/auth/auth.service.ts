import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/entity/users.dao';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generatedToken(user);
  }

  async register(userDto: CreateUserDto) {
    try {
      const candidateByEmail = await this.usersService.getUsersByEmail(
        userDto.email,
      );
      const candidateByUsername = await this.usersService.getUsersByEmail(
        userDto.username,
      );
      if (candidateByEmail || candidateByUsername) {
        throw new HttpException(
          `Пользователь с такой почтой, либо никнеймом уже существует`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await bcrypt.hash(userDto.password, 5);

      const user = await this.usersService.createUser({
        ...userDto,
        password: hashedPassword,
      });

      return this.generatedToken(user);
    } catch (error) {
      console.error('Error in AuthService.register:', error);
      throw new HttpException(
        'Произошла ошибка при регистрации пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generatedToken(user: Users) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmailOrUsername(
      userDto.email,
    );
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный email  или password',
    });
  }
}
