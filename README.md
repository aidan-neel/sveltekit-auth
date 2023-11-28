# SvelteKit Authentication Template
Built with Prisma, PrismaAuth.js, SvelteKit, and more.

## Key Notes
**1.** Set the random JWT token key in the .env file in the root directory like so:
```javascript
DATABASE_URL="file:./dev.db"
JWT_SECRET="RANDOMLY_GENERATED_STRING"
```

**2.** Change the database URL to a Vercel Postgres database.
**3.** Inside the *src/lib/isDev.ts* file change the url to the appropriate domain like so:
```javascript
export let url = isDev ? 'http://localhost:5173' : 'https://url.com'; // Change this to your own url
```

## Intended Features
**1.** Migration to new **KodaDB.js** system (when it's fully ready).
