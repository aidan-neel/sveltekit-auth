<script lang="ts">
    import * as Alert from "$lib/components/ui/alert";
    import { notifications } from "$lib/toast";
        
    export let user;
</script>

{#if $notifications}
    {#each $notifications as notification}
    <Alert.Root class="w-[95%] absolute top-6 z-50 shadow-sm pt-4">
        <Alert.Title class="font-bold">Buildboard.net // Beta</Alert.Title>
        <Alert.Description>
            {notification}
        </Alert.Description>
    </Alert.Root>
    {/each}
{/if}