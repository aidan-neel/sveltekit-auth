<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import { fly } from "svelte/transition";
	import { alertVariants, type Variant } from ".";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		variant?: Variant;
	};

	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export { className as class };
</script>

<div transition:fly="{{y: 40, duration: 350}}"
	class={cn(alertVariants({ variant }), className)}
	{...$$restProps}
	role="alert"
>
	<slot />
</div>
