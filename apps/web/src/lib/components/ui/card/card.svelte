<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn, type WithElementRef } from '$lib/utils.js';

    let {
        ref = $bindable(null),
        class: className,
        children,
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
    bind:this={ref}
    data-slot="card"
    class={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-none md:rounded-xl py-3 px-5 shadow-none md:shadow-sm border-none',
        className
    )}
    {...restProps}
>
    {@render children?.()}
</div>
