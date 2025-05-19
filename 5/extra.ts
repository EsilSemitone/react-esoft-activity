export type Status = ("active" | "inactive") | (0 | 1);

export function getStatusDescription(status: Status): string {
  if (status in ["active", 1]) {
    return "Этот стаус говорит о том что пользователь прошел верификацию почты";
  }
  return "Этот стаус говорит о том что пользователь не прошел верификацию почты";
}
