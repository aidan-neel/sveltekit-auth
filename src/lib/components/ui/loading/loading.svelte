<script>
    import { loading } from "$lib/extra";
    import loadingIcon from '@iconify/icons-eos-icons/loading';
    import Icon from "@iconify/svelte";
</script>

{#if $loading}
    <main class="w-screen h-screen fixed z-40 bg-white flex items-center justify-center">
        <Icon icon={loadingIcon} class="w-16 h-16 text-black/70" />
    </main>
{/if}