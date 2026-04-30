import { db } from "..";
import { eq, desc } from "drizzle-orm";
import { posts, feeds, users } from "../schema";

export async function createPost(title: string, url: string, description: string, publishedAt: Date, feedId: string) {
    const [result] = await db
        .insert(posts)
        .values({ title, url, description, publishedAt, feed_id: feedId })
        .returning();
    return result;
}

export async function getPostsForUser(userId: string, limit: number = 20) {
    const result = await db
        .select({
            title: posts.title,
            url: posts.url,
            description: posts.description,
            publishedAt: posts.publishedAt,
            feedName: feeds.name,
            userName: users.name,
        })
        .from(posts)
        .innerJoin(feeds, eq(posts.feed_id, feeds.id))
        .innerJoin(users, eq(feeds.user_id, users.id))
        .where(eq(users.id, userId))
        .orderBy(desc(posts.publishedAt))
        .limit(limit);
    return result;
}