import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<number[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
   
      const user = this.jwtService.verify(token);
      const userRoles = user.role;
      const hasRequiredRoles = requiredRoles.some(
        (role) => (userRoles & role) === role,
      );

      if (!hasRequiredRoles) {
        throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
      }
      console.log('roles guard');
      req.user = user;
      return true;
    } catch (e) {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
