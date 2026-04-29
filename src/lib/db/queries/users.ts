import { db } from "..";
import { eq, sql } from "drizzle-orm";
import { users, feeds } from "../schema";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name:string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function delUsers(): Promise<void> {
  await db.execute(sql`TRUNCATE TABLE ${users} CASCADE`);
}
export async function listUsers() {
  const result = await db.select({ name: users.name }).from(users);
  return result;
}