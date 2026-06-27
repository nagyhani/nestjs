import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionRepository } from "src/models/permissions/permissions.repository";

export class RBACGuard implements CanActivate{

    constructor(
        private readonly permissionRepository:PermissionRepository,
        private readonly reflector: Reflector

    ){}
   async canActivate(context: ExecutionContext):  Promise<boolean>  {

        const request = context.switchToHttp().getRequest()

        const permission = this.reflector.get('permission',context.getHandler())

      const userPermissions =  await this.permissionRepository.getOne({userId:request.user.sub})

      
      if(!userPermissions?.permissions.includes(permission))  throw new UnauthorizedException(`You are not allowed ${permission}` )

        return true

      
    }
    
}