import { feed_folows,feeds,users } from "../schema";
import { db } from "..";
import { eq, and} from "drizzle-orm";

export async function createFeedFollow(feedId: string, userId: string) {
    await db
        .insert(feed_folows)
        .values({ feed_id: feedId, user_id: userId });
    
    const result = await db
        .select()
        .from(feed_folows)
        .innerJoin(feeds, eq(feed_folows.feed_id, feeds.id))
        .innerJoin(users, eq(feed_folows.user_id, users.id))
        .where(and(eq(feed_folows.feed_id, feedId),eq(feed_folows.user_id, userId)));
    
    return result[0];
}