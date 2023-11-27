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
    import { onMount } from "svelte";
    import type { SuperValidated } from "sveltekit-superforms";
  
    export let form: SuperValidated<FormSchema>;
    
    onMount(() => {
        // If the user IS logged in, redirect them to the dashboard.
        if(user !== 'Not logged in.') {
            goto('/dashboard')
        }
    });
  </script>
  
  <style>
    a {
        @apply underline;
    }
  </style>

<!-- Button on log in and registration to act as an anchor between eachother -->
<Button on:click={() => { goto('/login') }} variant="outline" class="absolute bottom-6" href="/">Log In</Button>


<!-- Main log in form -->
<article class="pb-48 items-center flex flex-col w-4/5 justify-center">
    <Form.Root
        schema={formSchema}
        {form}
        let:config
        action='?/login'
        class="w-full flex flex-col gap-1"
    >
        <div class="text-center">
            <h1 class="text-3xl font-bold">
                Register for an account
            </h1>
            <p class="text-zinc-500 mb-6">
                Enter your credentials below to register for an account
            </p>
        </div>
        <Form.Field {config} name="email">
            <Form.Item>
                <Form.Input class="" type="email" placeholder="name@example.com" />
                <Form.Validation />
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="password">
            <Form.Item>
            <Form.Input class="" type="password" placeholder="password" />
            <Form.Validation />
            </Form.Item>
        </Form.Field>
        <Form.Button class="w-full">Sign Up</Form.Button>
    </Form.Root>
  <div class="w-full mt-10 relative flex items-center justify-center">
    <p class="text-zinc-400 absolute text-sm bg-white px-2 text-center">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a> and <a href="policy">Privacy Policy</a>
    </p>
    
  </div>
</article>