<script>
    import '$lib/css/theme.css';
    import { Toaster } from 'svelte-sonner';
</script>

<svelte:head>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<Toaster theme="dark"/>
<slot></slot>

<style>

</style>