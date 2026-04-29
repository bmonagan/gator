const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

function fetchFeed(feedURL: string): RSSFeed { 


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