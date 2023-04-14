import { User } from "@prisma/client";

export type SafeUser = Omit<
User,
 "emailVerified" | "createdAt" | "updatedAt"
 > & {
    createdAt : string;
    updatedAt : string;
    emailVerified : string | null;
 };