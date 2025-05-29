import { IUser } from "./1";

function greetUser(user: IUser): string {
  const age = user.age ? `Тебе ${user.age} лет.` : "";

  return `Привет, ${user.name}!${age}`;
}
