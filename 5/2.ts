import { IUser } from "./1";
import { UserRole } from "./5";

interface IAdmin extends IUser {
  role: UserRole;
}

const admin = { id: 4, name: "Maria", role: "admin", status: "active" };
