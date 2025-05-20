export class LoginRequestDto {
  username: string;
  password: string;
}

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}
