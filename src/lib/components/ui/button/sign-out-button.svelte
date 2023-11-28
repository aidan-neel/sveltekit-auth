<script lang="ts">
    import { goto } from "$app/navigation";
    import { toast } from "$lib/toast";
    import loadingIcon from '@iconify/icons-eos-icons/loading';
    import Icon from "@iconify/svelte";
    import Button from "./button.svelte";

    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        const res = await fetch('/api/sign-out', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const body = await res.json();

        console.log(body.status);

        if(body.status === 'success') {
            toast(body.data);
            goto('/login')
            isLoading = false;
            return;
        } else if(body.status === 'error') {
            toast(body.data);
            isLoading = false;
            return;
        }
    }
</script>

<Button disabled={isLoading} on:click={handleSubmit}>
    {#if isLoading}
        <Icon icon={loadingIcon} class="mr-2" />
    {/if}
    Sign Out
</Button>