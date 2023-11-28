<script lang="ts" context="module">
    import { z } from "zod";
  
    export const formSchema = z.object({
      email: z.string().min(5).max(100),
      password: z.string().min(6).max(24),
    });
    export type FormSchema = typeof formSchema;
  </script>
  
  <script lang="ts">
    export let data; // props
    const user = data.props.userData.data; // User Data

    import { goto } from "$app/navigation";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Form from "$lib/components/ui/form";
    import { loginLoading } from "$lib/extra";
    import { toast } from "$lib/toast.js";
    import loadingIcon from '@iconify/icons-eos-icons/loading';
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import type { SuperValidated } from "sveltekit-superforms";

    export let form: SuperValidated<FormSchema>;
    
    $: {
        console.log(user);
    }

    onMount(() => {
        // If the user IS logged in, redirect them to the dashboard.
        if(user !== 'Not logged in.') {
            goto('/dashboard')
        }
    });

    // Handle the submission of the form
    async function handleSubmit(event) {
        // Prevent default form submission
        loginLoading.set(true);
        event.preventDefault();

        // Submit the form
        const formData = new FormData(event.target);
        const response = await fetch('?/register', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        const body_result = await result.data;
        const json_body_result = JSON.parse(body_result);

        const STATUS_CODE = json_body_result[2];
        const STATUS_MESSAGE = json_body_result[3];

        // console.log(STATUS_CODE, STATUS_MESSAGE);
        // console.log(json_body_result)
        // console.log(result);
        
        if(STATUS_CODE === 200) { // If the status code is 200, then the user has successfully logged in.
            loginLoading.set(false);
            goto('/dashboard');
        } else { // If the status code is not 200, then the user has not successfully logged in.
            loginLoading.set(false);
            toast(STATUS_MESSAGE); // Send a toast with the message of the status, typically an error.
        }
    }
    
</script>
  
<style>
    a {
        @apply underline;
    } 
</style>

<!-- Button on log in and registration to act as an anchor between eachother -->
<Button href='/login' variant="outline" class="absolute bottom-6">Log In</Button>


<!-- Main log in form -->
<article class="pb-48 fadeUp items-center flex flex-col w-4/5 justify-center">
    <Form.Root
        on:submit={handleSubmit}
        schema={formSchema}
        {form}
        let:config
        class="w-full flex flex-col gap-1"
    >
        <div class="text-center">
            <h1 class="text-3xl font-bold">
                Register for an account
            </h1>
            <p class="text-zinc-500 mb-6">
                Enter your credentials below to register
            </p>
        </div>
        <Form.Field {config} name="email">
            <Form.Item>
                <Form.Input disabled={$loginLoading} class="" type="email" placeholder="name@example.com" />
                <Form.Validation />
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="password">
            <Form.Item>
            <Form.Input disabled={$loginLoading} class="" type="password" placeholder="password" />
            <Form.Validation />
            </Form.Item>
        </Form.Field>
        <Form.Button disabled={$loginLoading} class="w-full">
            {#if $loginLoading}
                <Icon icon={loadingIcon} class="mr-2" />
            {/if}
            Sign Up
        </Form.Button>
    </Form.Root>
  <div class="w-full mt-10 relative flex items-center justify-center">
    <p class="text-zinc-400 absolute text-sm bg-white px-2 text-center">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a> and <a href="policy">Privacy Policy</a>
    </p>
  </div>
</article>