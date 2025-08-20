<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import { cn } from '$lib/utils.js';
    import type { HTMLAttributes } from 'svelte/elements';

    // Props 인터페이스 정의
    interface Props extends HTMLAttributes<HTMLDivElement> {
        class?: string;
        id?: string;
    }

    let { class: className, id = 'login-form', ...restProps }: Props = $props();
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
    <Card.Root class="overflow-hidden p-0">
        <Card.Content class="grid p-0 md:grid-cols-2">
            <form class="p-6 md:p-8">
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col items-center text-center">
                        <h1 class="text-2xl font-bold">Damoang </h1>
                        <p class="text-balance text-muted-foreground">Login to account</p>
                    </div>
                    <div class="grid gap-3">
                        <Label for="email-{id}">Email</Label>
                        <Input id="email-{id}" type="email" placeholder="m@example.com" required />
                    </div>
                    <div class="grid gap-3">
                        <div class="flex items-center">
                            <Label for="password">Password</Label>
                        </div>
                        <Input id="password-{id}" type="password" required />
                    </div>
                    <Button type="submit" class="w-full">Login</Button>
                </div>
            </form>
            <div class="relative hidden items-center justify-center bg-muted md:flex">
                <img
                    src="https://cdn.damoang.net/data/editor/64abd-66bd1f5106437-1c11615bec24fe4cc58fee1f83353fb0a939fa9c.svg"
                    alt="다모앙"
                    class="w-full  object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </Card.Content>
    </Card.Root>
    <div class="text-center text-xs text-balance text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
       © SDK Co., Ltd. All rights reserved.
    </div>
</div>
