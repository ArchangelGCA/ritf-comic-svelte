<script>
    import Seo from "sk-seo";
    import {ArrowLeft, ArrowRight, BookOpenText, FileWarning} from "lucide-svelte";

    export let data;
    let { comic, page, settings } = data;
    $: ({ comic, page } = data);

    let sizeWarningIcon = 30;
</script>

<Seo
        title="{comic.title + ' - Page ' + page.number}"
        description="{page.description}"
        index="false"
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
    <div class="container">
        {#if !page || !page.imageUrl}
            <div class="row text-center justify-content-center">
                <div class="col-12">
                    <p class="h4 text-warning"><FileWarning size={sizeWarningIcon}/> Page not found! </p>
                    <!-- Button to go back -->
                    <a href="{comic.id}" class="btn btn-custom text-accent"><ArrowLeft /> Go back</a>
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
            <div class="row mt-3">
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
                    <!-- currennt page / total pages -->
                    <p class="text-center text-light text-opacity-75">{page.number} / {comic.pagesTotal}</p>
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
                <div class="collapse col-12 justify-content-center bg-light bg-opacity-10 rounded-4 pt-3 mt-2" id="collapseDescription">
                    {@html comic.description}
                </div>
            </div>
        {/if}
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
</style>