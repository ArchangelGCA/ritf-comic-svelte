<script>
    import '$lib/css/theme.css';
    import { Toaster } from 'svelte-sonner';
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    onMount(() => {
       if (browser) {
           const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
           const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
           tooltipList.forEach(tooltip => tooltip.hide());
       }
    });
</script>

<svelte:head>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<Toaster theme="dark"/>
<slot></slot>