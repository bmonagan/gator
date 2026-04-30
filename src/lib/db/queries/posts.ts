import { db } from "..";
import { eq } from "drizzle-orm";
import { posts, feeds, users } from "../schema";
export async function createPost(title: string, url: string, description: string, publishedAt: Date, feedId: string) {
    const [result] = await db
        .insert(posts)
        .values({ title, url, description, publishedAt, feed_id: feedId })
        .returning();
    return result;
}