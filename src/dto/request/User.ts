export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface ISignIn {
  email: string;
  password: string;
}
