<script>
    import '$lib/css/theme.css';
    import { Toaster } from 'svelte-sonner';
    import {browser} from "$app/environment";
    import {onMount} from "svelte";
    import {BookImage, BookMarked, House, SquareChevronRight} from "lucide-svelte";
    import ComicPreview from "$lib/components/global/ComicPreview.svelte";
    import {onNavigate} from "$app/navigation";
    import Seo from "sk-seo";

    export let data;
    const { comics, settings } = data;

    let tooltipList = [];


    onMount(() => {
       if (browser) {
           initAndCloseTooltips();
           initAndCloseOffcanvas();
       }
    });

    onNavigate(() => {
        if (browser) {
            console.log('Navigating...');
            initAndCloseTooltips();
            initAndCloseOffcanvas();
        }
    });

    /**
    * Function to close offcanvas and remove backdrop leftovers.
    * */
    async function hideOffcanvas() {
        if (document.querySelector('.offcanvas.show')) {
            document.querySelector('.offcanvas.show').classList.remove('show');
            document.querySelector('.offcanvas-backdrop').remove();
            // clear style from body
            document.body.style = '';
        }
    }

    /**
     * Function to initialize and close all offcanvas.
     * */
    async function initAndCloseOffcanvas() {
        if (document.querySelector('.offcanvas.show')) {
            document.querySelector('.offcanvas.show').classList.remove('show');
            document.querySelector('.offcanvas-backdrop').remove();
            // clear style from body
            document.body.style = '';
        }
        const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasNavigation'));
        offcanvas.hide();
    }

    /**
     * Function to initialize and close all tooltips.
     */
    async function initAndCloseTooltips() {
        if (tooltipList.length > 0) {
            tooltipList.forEach(tooltip => tooltip.hide());
        }
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        tooltipList.forEach(tooltip => tooltip.hide());
    }

    let sizeMenuIcon = 40;
</script>

<Seo title="{settings.title}" description="{settings.description}" />

<svelte:head>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<Toaster theme="dark"/>

<div class="container-fluid">
    <div class="position-fixed bottom-0 end-0 mb-3 me-3">
        <button class="btn btn-custom text-accent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavigation" aria-controls="offcanvasNavigation">
            <SquareChevronRight size={sizeMenuIcon}/>
        </button>
    </div>
</div>

<!-- OffCanvas -->
<div class="offcanvas offcanvas-start bg-surface border-0" tabindex="-1" id="offcanvasNavigation" aria-labelledby="offcanvasNavigationLabel">
    <div class="offcanvas-header">
        <a class="text-decoration-none link-light" href="/" data-bs-toggle="tooltip" title="home"><p class="h5 my-auto" id="offcanvasNavigationLabel"><BookMarked size={sizeMenuIcon}/> Explorer</p></a>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body border-top border-light-subtle">
        <!-- Collapsed Comics with button to open collapsed (not an accordion) -->
        <div class="row">
            <!-- Homepage -->
            <div class="col-12 mb-2">
                <a href="/" class="btn btn-custom w-100" title="Home"><House /> Home</a>
            </div>
            <div class="col-12">
                <button class="btn btn-custom w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">
                    <BookImage /> Comics
                </button>
            </div>
        </div>
        <!-- Collapsed Comics -->
        <div class="collapse row justify-content-center bg-light bg-opacity-10 rounded-4 py-2 mx-auto mt-2" id="collapseComics">
            {#each comics as comic (comic.id)}
                <ComicPreview {comic} />
            {/each}
        </div>
    </div>
</div>

<slot></slot>