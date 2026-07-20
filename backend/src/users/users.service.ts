import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

type GoogleUserData = {
  email: string;
  fullName: string | null;
  googleId: string;
  picture: string | null;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

 async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya existe');
    }

    const user = this.usersRepository.create({
      email: createUserDto.email,
      username: createUserDto.username ?? null,
      fullName: createUserDto.fullName ?? null,
      googleId: createUserDto.googleId ?? null,
      picture: createUserDto.picture ?? null,
      password: createUserDto.password ?? null,

      membershipActive: false,
      membershipStatus: null,
      membershipStartedAt: null,
      membershipEndsAt: null,

      mercadoPagoLastPaymentId: null,
      mercadoPagoLastPreferenceId: null,
      mercadoPagoPayerEmail: null,
      mercadoPagoPaymentStatus: null,
      mercadoPagoLastPaymentDate: null,
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { googleId },
    });
  }

  async findOrCreateFromGoogle(data: GoogleUserData): Promise<User> {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      let shouldUpdate = false;

      if (!existingUser.googleId) {
        existingUser.googleId = data.googleId;
        shouldUpdate = true;
      }

      if (!existingUser.fullName && data.fullName) {
        existingUser.fullName = data.fullName;
        shouldUpdate = true;
      }

      if (!existingUser.picture && data.picture) {
        existingUser.picture = data.picture;
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        return this.usersRepository.save(existingUser);
      }

      return existingUser;
    }

    const username = data.email.split('@')[0];

    const newUser = this.usersRepository.create({
      email: data.email,
      username,
      fullName: data.fullName,
      googleId: data.googleId,
      picture: data.picture,
      password: null,

      membershipActive: false,
      membershipStatus: null,
      membershipStartedAt: null,
      membershipEndsAt: null,

      mercadoPagoLastPaymentId: null,
      mercadoPagoLastPreferenceId: null,
      mercadoPagoPayerEmail: null,
      mercadoPagoPaymentStatus: null,
      mercadoPagoLastPaymentDate: null,
    });

    return this.usersRepository.save(newUser);
  }
}