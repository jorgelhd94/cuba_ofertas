import { IUser } from "./IUser";

export interface ILoginResponse {
  access: string;
  refresh: string;
  user: IUser;
}
