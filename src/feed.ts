const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const USER_AGENT = "Gator/1.0 (+https://github.com/bmonagan/gator; RSS Feed Aggregator)";

async function fetchFeed(feedURL: string): Promise<RSSFeed> {
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