import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

interface LoginInput {
  email: string;
  password: string;
}

interface LoginSuccess {
  accessToken: string;
  refreshToken: string;
}

type LoginResult = Result<LoginSuccess, string>;

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      return { ok: false, reason: 'Invalid email or password' };
    }

    const isPasswordValid = await compare(input.password, user.password);
    if (!isPasswordValid) {
      return { ok: false, reason: 'Invalid email or password' };
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.id, email: user.email },
        { expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: user.id, email: user.email },
        { expiresIn: '7d' },
      ),
    ]);

    return {
      ok: true,
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}
