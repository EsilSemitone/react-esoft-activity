import { Status } from "./extra";

export interface IUser {
  id: number;
  name: string;
  age?: number;
  email?: string;
  status: Status;
}

const user_1 = {
  id: 1,
  name: "Alex",
  status: "active",
  age: 10,
  email: "Alex@mail.ru",
};
const user_2 = { id: 2, name: "Pasha", status: "active", age: 12 };
const user_3 = { id: 3, name: "Bob", status: "active", email: "Bob@mail.ru" };
const user_4 = { id: 4, name: "Maria", status: "active" };
