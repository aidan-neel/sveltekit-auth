<script>    
    import '$lib/styles/app.css'; // tailwind styles
    import '../app.pcss'; // custom styles
    
    import { browser } from '$app/environment';
    import Loading from '$lib/components/ui/loading/loading.svelte';
    import Toast from '$lib/components/ui/toast/toast.svelte';
    import { loading } from '$lib/extra';

    export let data; // props
    const user = data.props.userData.data; // this is how you get the user data, wacky af

    $: {
        if(browser) {
            if(user) {
                loading.set(false);
            }
        }
    }
</script>

<main class="w-screen flex items-center justify-center h-screen ">
    <Toast user={user} />
    <Loading />
    <slot user={user}></slot>
</main>
