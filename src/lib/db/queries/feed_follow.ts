import { feed_follows,feeds,users } from "../schema";
import { db } from "..";
import { eq, and} from "drizzle-orm";

export async function createFeedFollow(feedId: string, userId: string) {
    await db
        .insert(feed_follows)
        .values({ feed_id: feedId, user_id: userId });
    
    const result = await db
        .select()
        .from(feed_follows)
        .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
        .innerJoin(users, eq(feed_follows.user_id, users.id))
        .where(and(eq(feed_follows.feed_id, feedId),eq(feed_follows.user_id, userId)));
    
    return result[0];
}

export async function getFeedFollowsForUser(userId: string) {
    const result = await db
        .select()
        .from(feed_follows)
        .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
        .innerJoin(users, eq(feed_follows.user_id, users.id))
        .where(eq(feed_follows.user_id, userId));
    
    return result;
}