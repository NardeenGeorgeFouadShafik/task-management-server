import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserRole } from "./enums/user_role.enum";
import { User } from "./user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user: User = context.switchToHttp().getRequest().user;
    if (user.user_Role === UserRole.ADMIN) return true;
    return false;
  }
}
