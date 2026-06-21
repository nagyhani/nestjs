import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest()
        const authorization = request.headers.authorization
        if(!authorization) throw new UnauthorizedException("Token required")

            const token = authorization.split(" ")[1]

          request.user = this.jwtService.verify(token)
        return true
    }

}