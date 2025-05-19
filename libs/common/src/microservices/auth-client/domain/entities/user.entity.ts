interface Properties {
  id: string;
  username: string;
  password: string;
  role: `${UserRole}`;
}

export enum UserRole {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

export class UserEntity {
  public readonly id: string;
  public readonly username: string;
  public readonly password: string;
  public readonly role: `${UserRole}`;

  constructor(props: Properties) {
    this.id = props.id;
    this.username = props.username;
    this.password = props.password;
    this.role = props.role;
  }
}
