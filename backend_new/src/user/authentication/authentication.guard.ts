import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ContextIdFactory } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class verifyUser implements CanActivate {
    constructor(private jwtService: JwtService) {}
    
    canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        try {
            const jwt = req.cookies['clientID'];
            return this.jwtService.verify(jwt);
        }
        catch (error) {
            throw new UnauthorizedException('unauthorized');
        }
    }
}