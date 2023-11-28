<script lang="ts">
    const test = 'this'
</script>

<style>
    a {
        @apply text-blue-600 underline;
    }
</style>

<div class="w-full p-4">
    <h1 class="font-bold text-2xl">
        kit-prisma-auth-template
    </h1>
    <a href="https://github.com/aidan-neel/kit-prismauth-template">
        View on Github
    </a>
    <p class="mt-4">
        Built with <a href="https://github.com/prisma/prisma">Prisma</a>, <a href="https://github.com/aidan-neel/PrismaAuth.js">PrismaAuth.js</a>, <a href="https://github.com/sveltejs/kit">SvelteKit</a>, <a href="https://github.com/huntabyte/shadcn-svelte">shadcn-svelte</a>, and more.
    </p>
    <h2 class="font-bold text-xl mt-4">
        Configuration
    </h2>
    <p>
        <span class="font-semibold">1. </span> Set the random JWT secret in the <code>.env</code> file.
    </p>
    <div class="p-3 px-4 mt-2 bg-zinc-100 rounded-lg">
        <code class='text-blue-300'>
            <span class="text-blue-500">DATABASE_URL</span><span class='text-blue-500'>=</span>"file:./dev.db"
            <span class="text-blue-500">JWT_SECRET</span><span class='text-blue-500'>=</span>"RANDOMLY_GENERATED_STRING"
        </code>
    </div>
    <p class="mt-6">
        <span class="font-semibold">1. </span> Set the random JWT secret in the <code>.env</code> file.
    </p>
    <div class="p-3 px-4 mt-2 bg-zinc-100 rounded-lg">
        <code class='text-black'>
            <span class="text-red-500">export let</span> url <span class='text-blue-500'>=</span> isDev ? <span class='text-blue-500'>'http://localhost:5173'</span> : <span class='text-blue-500'>'http://example.com'</span>
        </code>
    </div>
    <h2 class="font-bold text-xl mt-6">
        Notes
    </h2>
    <p>
        <span class="font-semibold">1. </span> The database is interchangeable. You can anything as long as Prisma supports it out of the box.
    </p>
</div>