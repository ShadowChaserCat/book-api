import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entity/users.dao';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private userRepository: typeof Users,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getCurrentUser(user): Promise<Users> {
    try {
      return await this.userRepository.findByPk(user.id, {
        attributes: { exclude: ['password'] },
      });
    } catch (e) {
      throw new NotFoundException(`User with id ${user.id} not found`);
    }
  }

  async updateUserRole(id: number, newRole: number): Promise<string> {
    const user = await this.userRepository.findByPk(id);
    const payload = { email: user.email, id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    user.role = newRole;
    await user.save();

    return token;
  }

  async getUsersByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserByEmailOrUsername(identifier: string): Promise<Users | null> {
    return this.userRepository.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });
  }

  async getUsersByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return user;
  }
}
