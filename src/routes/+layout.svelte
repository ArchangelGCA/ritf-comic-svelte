<script>
    import '$lib/css/theme.css';
    import {Toaster} from 'svelte-sonner';
    import {browser} from "$app/environment";
    import {onMount} from "svelte";
    import {page} from '$app/stores'
    import {BookImage, BookMarked, House, SquareChevronRight} from "lucide-svelte";
    import ComicPreview from "$lib/components/global/ComicPreview.svelte";
    import {onNavigate} from "$app/navigation";
    import autoAnimate from "@formkit/auto-animate";
    import Seo from "sk-seo";
    import SocialIcons from "@rodneylab/svelte-social-icons";
    import SVGWave from "$lib/components/global/SVGWave.svelte";
    import favicon from "$lib/assets/images/favicon.webp?enhanced";

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
        const offcanvasElementList = document.querySelectorAll('.offcanvas');
        const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl));
        // const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasNavigation'));
        offcanvasList.forEach(offcanvas => offcanvas.hide());
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

<!-- Header -->
{#if $page.url.pathname === '/'}
    <!-- Title -->
    <div class="row text-center bg-light bg-opacity-10 pt-3">
        <div class="col">
            <a href="/" class="link-light text-decoration-none">
                <enhanced:img src="{favicon}" alt="Roses in The Flames icon" class="img-fluid img-brand mb-2 me-2"/>
            </a>
            <span class="h2">{settings.title}</span>
        </div>
    </div>
    <!-- Navbar -->
    <div class="row">
        <div class="col">
            <nav class="navbar navbar-expand py-0 navbar-light bg-light bg-opacity-10">
                <div class="container-fluid">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item">
                                <a class="nav-link rounded-3" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link rounded-3" href="https://rosesintheflames.com/about" target="_blank">About Us</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link rounded-3" href="https://rosesintheflames.com/contacts" target="_blank">Contact Us</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link rounded-3" href="https://tales.rosesintheflames.com" target="_blank">Platform</a>
                            </li>
                        </ul>
                </div>
            </nav>
        </div>
    </div>
    <SVGWave fill="#3c1d34" rotation="180"
             data="M0,0L34.3,0C68.6,0,137,0,206,10C274.3,20,343,40,411,43.3C480,47,549,33,617,23.3C685.7,13,754,7,823,8.3C891.4,10,960,20,1029,28.3C1097.1,37,1166,43,1234,38.3C1302.9,33,1371,17,1440,10C1508.6,3,1577,7,1646,11.7C1714.3,17,1783,23,1851,26.7C1920,30,1989,30,2057,36.7C2125.7,43,2194,57,2263,61.7C2331.4,67,2400,63,2469,63.3C2537.1,63,2606,67,2674,61.7C2742.9,57,2811,43,2880,45C2948.6,47,3017,63,3086,63.3C3154.3,63,3223,47,3291,43.3C3360,40,3429,50,3497,53.3C3565.7,57,3634,53,3703,43.3C3771.4,33,3840,17,3909,11.7C3977.1,7,4046,13,4114,16.7C4182.9,20,4251,20,4320,18.3C4388.6,17,4457,13,4526,23.3C4594.3,33,4663,57,4731,66.7C4800,77,4869,73,4903,71.7L4937.1,70L4937.1,100L4902.9,100C4868.6,100,4800,100,4731,100C4662.9,100,4594,100,4526,100C4457.1,100,4389,100,4320,100C4251.4,100,4183,100,4114,100C4045.7,100,3977,100,3909,100C3840,100,3771,100,3703,100C3634.3,100,3566,100,3497,100C3428.6,100,3360,100,3291,100C3222.9,100,3154,100,3086,100C3017.1,100,2949,100,2880,100C2811.4,100,2743,100,2674,100C2605.7,100,2537,100,2469,100C2400,100,2331,100,2263,100C2194.3,100,2126,100,2057,100C1988.6,100,1920,100,1851,100C1782.9,100,1714,100,1646,100C1577.1,100,1509,100,1440,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z"/>

    <div use:autoAnimate>
        <slot></slot>
    </div>
{:else}
    <div use:autoAnimate>
        <slot></slot>
    </div>
{/if}

<!-- Footer -->
{#if !($page.url.pathname.startsWith('/admin'))}
    <!-- Footer -->
    <div class="container-fluid">
        <SVGWave fill="#3c1d34"
                 data="M0,0L34.3,0C68.6,0,137,0,206,10C274.3,20,343,40,411,43.3C480,47,549,33,617,23.3C685.7,13,754,7,823,8.3C891.4,10,960,20,1029,28.3C1097.1,37,1166,43,1234,38.3C1302.9,33,1371,17,1440,10C1508.6,3,1577,7,1646,11.7C1714.3,17,1783,23,1851,26.7C1920,30,1989,30,2057,36.7C2125.7,43,2194,57,2263,61.7C2331.4,67,2400,63,2469,63.3C2537.1,63,2606,67,2674,61.7C2742.9,57,2811,43,2880,45C2948.6,47,3017,63,3086,63.3C3154.3,63,3223,47,3291,43.3C3360,40,3429,50,3497,53.3C3565.7,57,3634,53,3703,43.3C3771.4,33,3840,17,3909,11.7C3977.1,7,4046,13,4114,16.7C4182.9,20,4251,20,4320,18.3C4388.6,17,4457,13,4526,23.3C4594.3,33,4663,57,4731,66.7C4800,77,4869,73,4903,71.7L4937.1,70L4937.1,100L4902.9,100C4868.6,100,4800,100,4731,100C4662.9,100,4594,100,4526,100C4457.1,100,4389,100,4320,100C4251.4,100,4183,100,4114,100C4045.7,100,3977,100,3909,100C3840,100,3771,100,3703,100C3634.3,100,3566,100,3497,100C3428.6,100,3360,100,3291,100C3222.9,100,3154,100,3086,100C3017.1,100,2949,100,2880,100C2811.4,100,2743,100,2674,100C2605.7,100,2537,100,2469,100C2400,100,2331,100,2263,100C2194.3,100,2126,100,2057,100C1988.6,100,1920,100,1851,100C1782.9,100,1714,100,1646,100C1577.1,100,1509,100,1440,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z"/>
        <div class="row text-center justify-content-center bg-light bg-opacity-10 pt-4 pb-2">
            <div class="col-4 col-md-auto mb-2">
                <a href="https://rosesintheflames.com/about" target="_blank"
                   class="link-light text-decoration-none">About
                    Us</a>
            </div>
            <div class="col-4 col-md-auto mb-2">
                <a href="https://rosesintheflames.com/contacts" target="_blank"
                   class="link-light text-decoration-none">Contact
                    Us</a>
            </div>
            <div class="col-4 col-md-auto mb-2">
                <a href="https://tales.rosesintheflames.com/" target="_blank"
                   class="link-light text-decoration-none">Platform</a>
            </div>
            <div class="col-12">
                <div class="row justify-content-center text-center mt-2">
                    {#if settings.discord}
                        <div class="col-auto">
                            <a href="{settings.discord}" target="_blank" class="link-light text-decoration-none">
                                <SocialIcons network="discord" width={socialIconsFooterSize}
                                             height={socialIconsFooterSize}/>
                            </a>
                        </div>
                    {/if}
                    {#if settings.twitter}
                        <div class="col-auto">
                            <a href="{settings.twitter}" target="_blank" class="link-light text-decoration-none">
                                <SocialIcons network="twitter" width={socialIconsFooterSize}
                                             height={socialIconsFooterSize}/>
                            </a>
                        </div>
                    {/if}
                    {#if settings.instagram}
                        <div class="col-auto">
                            <a href="{settings.instagram}" target="_blank" class="link-light text-decoration-none">
                                <SocialIcons network="instagram" width={socialIconsFooterSize}
                                             height={socialIconsFooterSize}/>
                            </a>
                        </div>
                    {/if}
                    {#if settings.facebook}
                        <div class="col-auto">
                            <a href="{settings.facebook}" target="_blank" class="link-light text-decoration-none">
                                <SocialIcons network="facebook" width={socialIconsFooterSize}
                                             height={socialIconsFooterSize}/>
                            </a>
                        </div>
                    {/if}
                </div>
            </div>
            <!-- Privacy Policy and ToS -->
            <div class="col-12 text-center mt-3">
                <a class="link-body-emphasis text-decoration-none" href="https://rosesintheflames.com/legal/privacy-policy" target="_blank" data-bs-toggle="tooltip" title="Read Privacy Policy">Privacy Policy</a>
                <span class="text-muted mx-2">|</span>
                <a class="link-body-emphasis text-decoration-none" href="https://rosesintheflames.com/legal/tos" target="_blank" data-bs-toggle="tooltip" title="Read Terms of Service">Terms of Service</a>
            </div>
            <!-- Credits -->
            <div class="col-12 my-1">
                <p class="text-muted mb-0">Made with ❤️ by <a class="link-light text-decoration-none"
                                                              href="https://archangelgca.eu/" target="_blank">ArchangelGCA</a>
                    for <a class="link-light text-decoration-none" href="https://rosesintheflames.com"
                           target="_blank">RiTF</a>
                </p>
            </div>
            <div class="col-12 text-center">
                <p class="text-muted mb-1">&copy; {new Date().getFullYear()} <a
                        class="link-light text-decoration-none"
                        href="https://rosesintheflames.com"
                        target="_blank">Roses in The Flames</a>.
                    All rights reserved.</p>
            </div>
        </div>
    </div>
{/if}

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
    <div class="offcanvas-body border-top border-primary">
        <!-- Comics -->
        <div class="row">
            <!-- Homepage -->
            <div class="col-12 mb-2">
                <a href="/" class="btn btn-custom w-100" title="Home">
                    <House />
                    Home
                </a>
            </div>
            <div class="col-12">
                <button class="btn btn-custom w-100" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">
                    <BookImage />
                    Comics
                </button>
            </div>
        </div>
        <!-- Collapsed Comics -->
        <div class="collapse row bg-light bg-opacity-10 rounded-4 mx-auto mt-2" id="collapseComics">
            <div class="col py-2">
                <div class="row justify-content-center">
                    {#each comics as comic (comic.id)}
                        <ComicPreview {comic} />
                    {/each}
                </div>
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