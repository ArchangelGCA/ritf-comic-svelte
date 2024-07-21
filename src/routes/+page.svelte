<script>
    import Seo from "sk-seo";

    export let data;
    const { settings } = data;
</script>

<svelte:head>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="container">
    <div class="row mt-3">
        <div class="col">
            <p class="h1 text-center bg-light bg-opacity-10 rounded-4 py-3">{settings.title}</p>
        </div>
    </div>
</div>