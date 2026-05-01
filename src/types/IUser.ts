import type { Rol } from "./Rol";

export interface IUser {
  email: string;
  password: String;
  loggedIn: boolean;
  role: Rol;
}
