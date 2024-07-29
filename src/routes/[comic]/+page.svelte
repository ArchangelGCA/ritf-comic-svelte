<script>
    import Seo from "sk-seo";
    import autoAnimate from "@formkit/auto-animate";
    import {ArrowLeft, ArrowRight, BookOpenText, FileWarning, List} from "lucide-svelte";

    export let data;
    let { comic, page, settings } = data;
    $: ({ comic, page } = data);

    let sizeWarningIcon = 30;
</script>

<Seo
        title="{comic.title + ' - Page ' + (!page.number ? 'Not found' : page.number)}"
        description="{page.description}"
        index={false}
/>

<div class="container-fluid">
    <!-- Banner -->
    <div class="row gradient" style="background-image: url({comic.bannerUrl}); height: 20vh; background-repeat: no-repeat; background-position: center; background-size: cover;">
        <div class="col my-auto" style="z-index: 2">
            <!-- Reminder for myself, I can add content here and it will be over background image and gradient, decrease z-index to apply same gradient -->
        </div>
    </div>
    <!-- Title -->
    <div class="row my-3 mt-4">
        <div class="col">
            <p class="text-center h3">{comic.title} - #{page.number ? page.number : 'Not found'}</p>
        </div>
    </div>
    <!-- Page -->
    <div class="container mb-3" use:autoAnimate>
        {#if !page || !page.imageUrl}
            <div class="row text-center justify-content-center">
                <div class="col-12">
                    {#if comic.pagesTotal === 0}
                        <p class="h4 text-warning"><FileWarning size={sizeWarningIcon}/> This comic doesn't have pages! </p>
                        <!-- Button to go back -->
                        <a href="/" class="btn btn-custom text-accent"><ArrowLeft /> Go back</a>
                    {:else}
                        <p class="h4 text-warning"><FileWarning size={sizeWarningIcon}/> Page not found! </p>
                        <!-- Button to go back -->
                        <a href="{comic.id}" class="btn btn-custom text-accent"><ArrowLeft /> Go back</a>
                    {/if}
                </div>
            </div>
        {:else}
            <div class="row text-center justify-content-center">
                <!-- Image -->
                <div class="col-12" data-bs-toggle="tooltip" title="View full-resolution">
                    <a href={page.imageUrl} target="_blank">
                        <img src={page.imageUrl} class="img-fluid rounded-4" alt={comic.title + ' - Page ' + page.number}>
                    </a>
                </div>
            </div>
            <!-- Controls to go forward and back -->
            <div class="row mt-3 justify-content-center">
                <div class="col-6 text-center">
                    {#if page.hasPrevious}
                        <a href="{comic.id}?page={page.number - 1}" class="btn btn-custom text-accent"><ArrowLeft /> Previous</a>
                    {/if}
                </div>
                <div class="col-6 text-center">
                    {#if page.hasNext}
                        <a href="{comic.id}?page={page.number + 1}" class="btn btn-custom text-accent">Next <ArrowRight /></a>
                    {/if}
                </div>
                <div class="col-12">
                    <!-- current page / total pages -->
                    <p class="text-center text-light text-opacity-75">{page.number} / {comic.pagesTotal}</p>
                </div>
                <!-- Open offcanvas with page navigation -->
                <div class="col-6 col-md-2">
                    <button class="btn btn-custom w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasPageNavigation" aria-controls="offcanvasPageNavigation">
                        <List /> Pages
                    </button>
                </div>
            </div>
            <!-- Description -->
            <div class="row my-3">
                <!-- Title that when clicked opens a collapsed description -->
                <div class="col-12">
                    <button class="btn btn-custom w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDescription" aria-expanded="false" aria-controls="collapseDescription">
                        <BookOpenText /> More
                    </button>
                </div>
                <!-- Collapsed description -->
                <div class="collapse col-12 justify-content-center bg-light bg-opacity-10 rounded-4 mt-2" id="collapseDescription">
                    <div class="pt-3">
                        {@html comic.description}
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <!-- Bottom offcanvas page navigation -->
    <div class="offcanvas offcanvas-bottom border-top border-primary" tabindex="-1" id="offcanvasPageNavigation" aria-labelledby="offcanvasPageNavigationLabel">
        <div class="offcanvas-header pb-0">
            <h5 id="offcanvasPageNavigationLabel">Page Selection</h5>
            <button type="button" class="btn-close text-reset me-md-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body pt-1 pt-md-2">
            <div class="row">
                <div class="col-12">
                    <div class="row row-horizontal flex-nowrap justify-content-center">
                        {#each Array.from({ length: comic.pagesTotal }, (_, i) => i + 1) as pageNumber}
                            <div class="col-3 col-md-2 col-lg-1">
                                <a href="{comic.id}?page={pageNumber}" class="btn btn-custom {pageNumber === page.number ? 'active' : ''} w-100">{pageNumber}</a>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .gradient {
        position: relative;
        height: 300px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .gradient::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
        z-index: 1;
    }

    .row-horizontal {
        overflow-x: auto;
        white-space: nowrap;
    }
</style>