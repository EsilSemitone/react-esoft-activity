const UserStatus = {
  Active: "active",
  Inactive: "inactive",
  Pending: "pending",
} as const;

export type UserStatusType = keyof typeof UserStatus;
