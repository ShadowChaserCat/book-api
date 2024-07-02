import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CurrentUser } from './user.decorator';
import { Users } from './entity/users.dao';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@CurrentUser() user: Users) {
    return this.usersService.getCurrentUser(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(0b100)
  @Put(':id/role')
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') newRole: number,
  ) {
    console.log('work?');
    return this.usersService.updateUserRole(id, newRole);
  }
}
