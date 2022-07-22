export class CreateUser {
  public name: string;
  public role: string;
  public email: string;
  public createdAt: Date;

  constructor({
    name,
    role,
    email,
    createdAt,
  }: {
    name: string;
    role: string;
    email: string;
    createdAt: Date;
  }) {
    this.name = name;
    this.role = role;
    this.email = email;
    this.createdAt = createdAt;
  }
}
