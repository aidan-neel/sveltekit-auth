# SvelteKit Authentication Template
Built with [Prisma](https://github.com/prisma/prisma), [PrismaAuth.js](https://github.com/aidan-neel/PrismaAuth.js), [SvelteKit](https://github.com/sveltejs/kit), [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte), and more.

## Configuration
**1.** Set the random JWT token key in the .env file in the root directory like so:
```javascript
DATABASE_URL="file:./dev.db"
JWT_SECRET="RANDOMLY_GENERATED_STRING"
```

**3.** Inside the *src/lib/isDev.ts* file change the url to the appropriate domain like so:
```javascript
export let url = isDev ? 'http://localhost:5173' : 'https://url.com'; // Change this to your own url
```

## Notes
**1.** The database is interchangeable. You can use SQLite3, MySQL, PostgreSQL with Vercel, etc. As long as Prisma supports it, the template supports it.
