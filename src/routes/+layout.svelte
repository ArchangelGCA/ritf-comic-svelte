<script>
    import '$lib/css/theme.css';
    import {Toaster} from 'svelte-sonner';
    import {browser} from "$app/environment";
    import {onMount} from "svelte";
    import {BookImage, BookMarked, House, SquareChevronRight} from "lucide-svelte";
    import ComicPreview from "$lib/components/global/ComicPreview.svelte";
    import {onNavigate} from "$app/navigation";
    import autoAnimate from "@formkit/auto-animate";
    import Seo from "sk-seo";
    import SocialIcons from "@rodneylab/svelte-social-icons";

    export let data;
    const {comics, settings} = data;

    let tooltipList = [];


    onMount(() => {
        if (browser) {
            initAndCloseTooltips();
            initAndCloseOffcanvas();
        }
    });

    onNavigate(() => {
        if (browser) {
            initAndCloseTooltips();
            initAndCloseOffcanvas();
        }
    });

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
    let socialIconsFooterSize = 30;
</script>

<Seo title="{settings.title}" description="{settings.description}"/>

<svelte:head>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<Toaster theme="dark"/>

<!-- Navigation-Chevron -->
<div class="container-fluid">
    <div class="position-fixed bottom-0 end-0 mb-3 me-3" style="z-index: 1">
        <button class="btn btn-custom text-accent" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavigation" aria-controls="offcanvasNavigation">
            <SquareChevronRight size={sizeMenuIcon}/>
        </button>
    </div>
</div>

<!-- OffCanvas -->
<div class="offcanvas offcanvas-start bg-surface border-0" tabindex="-1" id="offcanvasNavigation"
     aria-labelledby="offcanvasNavigationLabel">
    <div class="offcanvas-header">
        <a class="text-decoration-none link-light" href="/" data-bs-toggle="tooltip" title="home">
            <p class="h5 my-auto" id="offcanvasNavigationLabel">
                <BookMarked size={sizeMenuIcon}/>
                Explorer
            </p>
        </a>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body border-top border-light-subtle">
        <!-- Comics -->
        <div class="row">
            <!-- Homepage -->
            <div class="col-12 mb-2">
                <a href="/" class="btn btn-custom w-100" title="Home">
                    <House/>
                    Home
                </a>
            </div>
            <div class="col-12">
                <button class="btn btn-custom w-100" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">
                    <BookImage/>
                    Comics
                </button>
            </div>
        </div>
        <!-- Collapsed Comics -->
        <div class="collapse row bg-light bg-opacity-10 rounded-4 mx-auto mt-2" id="collapseComics">
            <div class="col py-2">
                <div class="row justify-content-center">
                    {#each comics as comic (comic.id)}
                        <ComicPreview {comic}/>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<div use:autoAnimate>
    <slot></slot>
</div>

<!-- Footer -->
<div class="container-fluid">
    <div class="row text-center justify-content-center bg-light bg-opacity-10 rounded-top border-top border-3 border-primary pt-3 pb-2">
        <div class="col-4 col-md-auto mb-2">
            <a href="https://rosesintheflames.com/about" target="_blank" class="link-light text-decoration-none">About Us</a>
        </div>
        <div class="col-4 col-md-auto mb-2">
            <a href="https://rosesintheflames.com/contacts" target="_blank" class="link-light text-decoration-none">Contact Us</a>
        </div>
        <div class="col-4 col-md-auto mb-2">
            <a href="https://tales.rosesintheflames.com/" target="_blank" class="link-light text-decoration-none">Platform</a>
        </div>
        <div class="col-12">
            <div class="row justify-content-center text-center mt-2">
                {#if settings.discord}
                    <div class="col-auto">
                        <a href="{settings.discord}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="discord" alt="discord" width={socialIconsFooterSize} height={socialIconsFooterSize}/>
                        </a>
                    </div>
                {/if}
                {#if settings.twitter}
                    <div class="col-auto">
                        <a href="{settings.twitter}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="twitter" alt="twitter" width={socialIconsFooterSize} height={socialIconsFooterSize}/>
                        </a>
                    </div>
                {/if}
                {#if settings.instagram}
                    <div class="col-auto">
                        <a href="{settings.instagram}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="instagram" alt="instagram" width={socialIconsFooterSize} height={socialIconsFooterSize}/>
                        </a>
                    </div>
                {/if}
                {#if settings.facebook}
                    <div class="col-auto">
                        <a href="{settings.facebook}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="facebook" alt="facebook" width={socialIconsFooterSize} height={socialIconsFooterSize}/>
                        </a>
                    </div>
                {/if}
            </div>
        </div>
        <!-- Made by -->
        <div class="col-12 mt-3">
            <p class="text-muted mb-0">Made with ❤️ by <a class="link-light text-decoration-none" href="https://archangelgca.eu/" target="_blank">ArchangelGCA</a> for <a  class="link-light text-decoration-none" href="https://rosesintheflames.com" target="_blank">RiTF</a></p>
        </div>
        <div class="col-12 text-center">
            <p class="text-muted mb-1">&copy; {new Date().getFullYear()} <a class="link-light text-decoration-none" href="https://rosesintheflames.com" target="_blank">Roses in The Flames</a>. All rights reserved.</p>
        </div>
    </div>
</div>