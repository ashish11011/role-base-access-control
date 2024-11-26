import jwt from "jsonwebtoken";
type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  admin: [
    "edit:dictionary",
    "create:dictionary",
    "edit:dictionary",
    "delete:dictionary",
    "edit:user",
    "delete:user",
  ],
  editDictionary: ["edit:dictionary", "create:dictionary", "edit:dictionary"],
  createDictionary: ["create:dictionary"],
  deleteDictionary: ["edit:dictionary", "delete:dictionary"],
  user: ["view:dictionary"],
  userManager: ["edit:user", "delete:user"],
} as const;

export function hasPermission(token: any, permission: Permission) {
  const user = jwt.decode(token) as { id: string; role: Role };
  return (ROLES[user.role] as readonly Permission[]).includes(permission);
}
