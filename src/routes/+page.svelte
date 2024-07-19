<script>
    import Seo from "sk-seo";
    import {BookImage, BookMarked, Menu, SquareChevronRight} from "lucide-svelte";
    import ComicPreview from "$lib/components/global/ComicPreview.svelte";

    export let data;
    const { comics, settings } = data;

    let sizeMenuIcon = 40;
</script>

<svelte:head>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="container-fluid">
    <div class="position-fixed bottom-0 end-0 mb-3 me-3">
        <button class="btn btn-custom text-accent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavigation" aria-controls="offcanvasNavigation">
            <SquareChevronRight size={sizeMenuIcon}/>
        </button>
    </div>
    <div class="row mt-3">
        <div class="col">
            <p class="h1 text-center bg-light bg-opacity-10 rounded-4 py-3">{settings.title}</p>
        </div>
    </div>
</div>

<!-- OffCanvas -->
<div class="offcanvas offcanvas-start bg-surface border-0" tabindex="-1" id="offcanvasNavigation" aria-labelledby="offcanvasNavigationLabel">
    <div class="offcanvas-header">
        <p class="h5 my-auto" id="offcanvasNavigationLabel"><BookMarked size={sizeMenuIcon}/> Explorer</p>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body border-top border-light-subtle">
        <!-- Collapsed Comics with button to open collapsed (not an accordion) -->
        <div class="row">
            <div class="col">
                <button class="btn btn-custom w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">
                    <BookImage /> Comics
                </button>
            </div>
        </div>
        <!-- Collapsed Comics -->
        <div class="collapse row justify-content-center bg-light bg-opacity-10 rounded-4 py-2 mx-auto mt-2" id="collapseComics">
            {#each comics as comic}
                <ComicPreview comic={comic}/>
            {/each}
        </div>
    </div>
</div>