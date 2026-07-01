import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async loginWithGoogle(credential: string) {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;

    if (!googleClientId) {
      throw new InternalServerErrorException(
        'Falta configurar GOOGLE_CLIENT_ID',
      );
    }

    let ticket;

    try {
      ticket = await this.googleClient.verifyIdToken({
        idToken: credential,
        audience: googleClientId,
      });
    } catch {
      throw new UnauthorizedException('Token de Google inválido');
    }

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException('Token de Google inválido');
    }

    const email = payload.email;
    const emailVerified = payload.email_verified;
    const googleId = payload.sub;

    if (!email || !emailVerified) {
      throw new UnauthorizedException('Email de Google no verificado');
    }

    const user = await this.usersService.findOrCreateFromGoogle({
      email,
      googleId,
      fullName: payload.name ?? null,
      picture: payload.picture ?? null,
    });

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      subscriptionActive: user.subscriptionActive,
    });

    return {
      accessToken,
      user: this.toPublicUser(user),
    };
  }

  async getMe(userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.toPublicUser(user);
  }

  private toPublicUser(user: any) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      picture: user.picture,
      subscriptionActive: user.subscriptionActive,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionStartedAt: user.subscriptionStartedAt,
      subscriptionEndsAt: user.subscriptionEndsAt,
    };
  }
}