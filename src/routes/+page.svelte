<script lang="ts">
    export let data;

    async function funt() {
        const r = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: 'hello' // 'key' is an example key name
            })
        });
    }
</script>

<button on:click={funt}>
    register
</button>