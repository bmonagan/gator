# Gator

A CLI RSS feed aggregator. Register an account, subscribe to feeds, and browse the latest posts — all from the terminal.

## Requirements

- Node.js
- PostgreSQL database
- A `.gatorconfig.json` file in your home directory:

```json
{
  "db_url": "postgres://user:password@localhost:5432/gator",
  "current_user_name": null
}
```

## Setup

```bash
npm install
npm run migrate
```

## Usage

```bash
npm start -- <command> [args]
```

### Commands

| Command | Args | Auth required | Description |
|---|---|---|---|
| `register` | `<username>` | No | Create a new user account |
| `login` | `<username>` | No | Set the active user |
| `users` | | No | List all users |
| `reset` | | No | Delete all users |
| `addfeed` | `<name> <url>` | Yes | Add a new RSS feed and follow it |
| `feeds` | | No | List all feeds |
| `follow` | `<url>` | Yes | Follow an existing feed |
| `unfollow` | `<url>` | Yes | Unfollow a feed |
| `following` | | Yes | List feeds you follow |
| `agg` | `<interval>` | No | Start the feed aggregator (e.g. `30s`, `5m`, `1h`) |
| `browse` | `[limit]` | Yes | Browse latest posts (default: 10) |

### Examples

```bash
# Register and log in
npm start -- register alice
npm start -- login alice

# Add and follow feeds
npm start -- addfeed "Wagslane" https://www.wagslane.dev/index.xml

# Run the aggregator every 30 seconds
npm start -- agg 30s

# Browse the 5 most recent posts
npm start -- browse 5
```
