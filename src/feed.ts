import { XMLParser } from "fast-xml-parser";
const USER_AGENT = "Gator/1.0 (+https://github.com/bmonagan/gator; RSS Feed Aggregator)";

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
	const response = await fetch(feedURL, {
		headers: {
			"User-Agent": USER_AGENT,
		},
	});
	if (!response.ok) {
		throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`);
	}

	const xmlText = await response.text();
	const parser = new XMLParser();
	const feed = parser.parse(xmlText);
	if (!feed.channel) {
		throw new Error("Channel is required");
	}
	const channel = feed.channel;
	if (!channel.title) {
		throw new Error("Channel title is required");
	}
	if (!channel.link) {
		throw new Error("Channel link is required");
	}
	if (!channel.description) {
		throw new Error("Channel description is required");
	}
	if (!channel.item) {
		throw new Error("Channel items are required");
	}
	const title = channel.title;
	const link = channel.link;
	const description = channel.description;
	const item: RSSItem[] = (Array.isArray(channel.item) ? channel.item : [channel.item])
		.filter((i: unknown) =>
			i !== null &&
			typeof i === "object" &&
			typeof (i as RSSItem).title === "string" &&
			typeof (i as RSSItem).link === "string" &&
			typeof (i as RSSItem).description === "string" &&
			typeof (i as RSSItem).pubDate === "string"
		);

	return {
		channel: {
			title,
			link,
			description,
			item,
		},
	};
}

type RSSFeed = {
	channel: {
		title: string;
		link: string;
		description: string;
		item: RSSItem[];
	};
};

type RSSItem = {
	title: string;
	link: string;
	description: string;
	pubDate: string;
};