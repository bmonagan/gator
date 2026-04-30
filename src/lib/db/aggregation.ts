import { fetchFeed } from "src/feed";
import { getNextFeedToFetch, markFeedFetched, } from "./queries/feeds";
export async function scrapeFeeds() {
    while (true) {
        const feedToFetch = await getNextFeedToFetch();
        if (feedToFetch) {
            markFeedFetched(feedToFetch.id);
            try {
                const feedData = await fetchFeed(feedToFetch.url);
                for (const item of feedData.channel.item) {
                    console.log(`New item in feed ${feedToFetch.name}: ${item.title}`);
                }

            } catch (error) {
                console.error(`Error fetching feed ${feedToFetch.url}:`, error);
            }
        }
    }
}

export function parseDuration(durationStr: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (!match) {
        throw new Error("Invalid duration format. Use values like 500ms, 10s, 5m, or 1h.");
    }

    const value = Number.parseInt(match[1], 10);
    if (!Number.isFinite(value) || value <= 0) {
        throw new Error("Duration must be a positive number.");
    }

    const unit = match[2];
    const unitToMs: Record<string, number> = {
        ms: 1,
        s: 1000,
        m: 60_000,
        h: 3_600_000,
    };

    return value * unitToMs[unit];

}