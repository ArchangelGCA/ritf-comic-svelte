<script>
    import Seo from "sk-seo";
    import ComicPreview from "$lib/components/global/ComicPreview.svelte";
    import ComicHome from "$lib/components/global/ComicHome.svelte";

    export let data;
    const { settings, comics } = data;
</script>

<Seo
        title="{settings.title}"
        description="{settings.description}"
        index="false"
/>

<svelte:head>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="container">
    <div class="row mt-3">
        <div class="col">
            <p class="h1 text-center bg-light bg-opacity-10 rounded-4 py-3">{settings.title}</p>
        </div>
    </div>
    <div class="row justify-content-center my-3">
        {#if comics && comics.length > 0}
            <div class="col-12 mb-1">
                <p class="h3 text-center mb-0">Read our comics</p>
                <p class="text-center text-muted">Click to read!</p>
            </div>
            {#each comics as comic (comic.id)}
                <ComicHome {comic} />
            {/each}
        {:else}
            <div class="col-12 text-center">
                <p class="h4 text-warning">No comics found!</p>
            </div>
        {/if}
    </div>
    <!-- Socials -->
    <div class="row justify-content-center pt-3 my-3 bg-light bg-opacity-10 rounded-4">
        <div class="col-12">
            <p class="h3 text-center">Follow us on social media!</p>
        </div>
        <div class="col-12">
            <div class="row justify-content-center">
                <!-- coming soon text -->
                <div class="col-12">
                    <p class="text-center">Coming soon!</p>
                </div>
            </div>
        </div>
    </div>
</div>