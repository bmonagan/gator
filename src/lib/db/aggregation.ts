import { fetchFeed } from "src/feed";
import { getNextFeedToFetch, markFeedFetched, } from "./queries/feeds";
await async function scrapeFeeds() {
    while (true) {
        const feedToFetch = await getNextFeedToFetch();
        if (feedToFetch) {
            markFeedFetched(feedToFetch.id);
            try {
                const feedData = await fetchFeed(feedToFetch.url);
                for (const item of feedData.items) {
                    console.log(`New item in feed ${feedToFetch.name}: ${item.title}`);
                }

            } catch (error) {
                console.error(`Error fetching feed ${feedToFetch.url}:`, error);
            }
        }
    }
}