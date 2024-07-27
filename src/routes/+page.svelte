<script>
    import Seo from "sk-seo";
    import ComicHome from "$lib/components/global/ComicHome.svelte";
    import SocialIcons from "@rodneylab/svelte-social-icons";
    import favicon from "$lib/assets/images/favicon.webp?enhanced";
    import rose from "$lib/assets/images/rose-original.webp?enhanced";

    export let data;
    const { settings, comics } = data;
</script>

<Seo
        title={settings.title}
        description={settings.description}
        index={false}
/>

<svelte:head>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="container-fluid">
    <div class="row text-center bg-light bg-opacity-10 rounded-bottom-4 pt-3 pb-2">
        <div class="col">
            <a href="/" class="link-light text-decoration-none">
                <enhanced:img src="{favicon}" alt="Roses in The Flames icon" class="img-fluid img-brand mb-2 me-2"/>
            </a>
            <span class="h2">{settings.title}</span>
        </div>
    </div>
    <div class="row justify-content-center my-3">
        {#if comics && comics.length > 0}
            <div class="col-12 my-3">
                <p class="h3 text-center mb-0">🚀 Read our comics </p>
                <p class="text-center text-muted">Click to read!</p>
            </div>
            {#each comics as comic (comic.id)}
                <ComicHome {comic} showDescription={false}/>
            {/each}
        {:else}
            <div class="col-12 text-center">
                <p class="h4 text-warning">No comics found!</p>
            </div>
        {/if}
    </div>
    <!-- Socials -->
    <div class="row justify-content-center pt-3 pb-3 my-3 mt-5 bg-light bg-opacity-10 rounded-4">
        <div class="col-12">
            <p class="h3 text-center">Follow us on social media!</p>
        </div>
        <div class="col-12">
            <div class="row justify-content-center text-cente mt-2">
                <!-- Socials -->
                {#if settings.discord}
                    <div class="col-auto">
                        <a href="{settings.discord}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="discord" alt="discord"/>
                        </a>
                    </div>
                {/if}
                {#if settings.twitter}
                    <div class="col-auto">
                        <a href="{settings.twitter}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="twitter" alt="twitter"/>
                        </a>
                    </div>
                {/if}
                {#if settings.instagram}
                    <div class="col-auto">
                        <a href="{settings.instagram}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="instagram" alt="instagram"/>
                        </a>
                    </div>
                {/if}
                {#if settings.facebook}
                    <div class="col-auto">
                        <a href="{settings.facebook}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="facebook" alt="facebook"/>
                        </a>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .img-brand {
        max-height: 35px;
        width: auto;
    }
</style>