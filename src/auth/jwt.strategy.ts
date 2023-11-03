import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:process.env.JWT_SECRET_KEY ,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    if (payload.email && payload.password) {
        const { email, password } = payload;
        return { email, password };
    }
    return {
        id: payload.id,
        email: payload.email
    };
}
}   
