import { db } from "..";
import { eq } from "drizzle-orm";
import { feeds, users } from "../schema";

export async function createFeed(name: string, url: string, userId: string) {
    const [result] = await db
        .insert(feeds)
        .values({ name, url, user_id: userId })
        .returning();
    return result;
}

export async function listAllFeeds() {
	return await db
		.select({
			feedName: feeds.name,
			url: feeds.url,
			userName: users.name,
		})
		.from(feeds)
		.innerJoin(users, eq(feeds.user_id, users.id));
}

export async function getFeedByURL(url: string) {
    const result = await db
        .select()
        .from(feeds)
        .where(eq(feeds.url, url));
    return result[0];
}