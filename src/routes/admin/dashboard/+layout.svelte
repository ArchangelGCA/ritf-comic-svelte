<script>
    import autoAnimate from "@formkit/auto-animate";
    import Seo from "sk-seo";
    import {BookImage, Gauge, LogOut, Settings, Shield} from "lucide-svelte";
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    let tooltipList = [];

    onMount(() => {
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

    let sizeTitleIcon = 45;
    let sizeNavIcons = 30;
</script>

<Seo
        index="false"
/>

<div class="container-fluid">
    <div class="row">
        <div class="col-2 col-sm-1 bg-light bg-opacity-10 text-white" style="min-height: 100vh;">
            <div class="col-12 mt-3 text-center">
                <a href="/admin/dashboard/" class="link-light">
                    <Shield size={sizeTitleIcon}/>
                </a>
            </div>
            <hr>
            <div class="col-12">
                <a href="/admin/dashboard/" class="btn btn-custom px-1 px-md-2 py-2 mb-2 w-100 text-center" data-bs-toggle="tooltip" data-bs-placement="right" title="Dashboard">
                    <Gauge size={sizeNavIcons}/>
                </a>
            </div>
            <div class="col-12">
                <a href="/admin/dashboard/comics/" class="btn btn-custom px-1 px-md-2 py-2 mb-2 w-100 text-center" data-bs-toggle="tooltip" data-bs-placement="right" title="Comics">
                    <BookImage size={sizeNavIcons}/>
                </a>
            </div>
            <div class="col-12">
                <a href="/admin/dashboard/settings/" class="btn btn-custom px-1 px-md-2 py-2 mb-2 w-100 text-center" data-bs-toggle="tooltip" data-bs-placement="right" title="Settings">
                    <Settings size={sizeNavIcons}/>
                </a>
            </div>
            <!-- logout -->
            <div class="col-12">
                <a href="/admin/dashboard/logout/" class="btn btn-custom px-1 px-md-2 py-2 text-danger-emphasis w-100 text-center" data-bs-toggle="tooltip" data-bs-placement="right" title="Logout">
                    <LogOut size={sizeNavIcons}/>
                </a>
            </div>
        </div>
        <div class="col-10 col-sm-11" use:autoAnimate>
            <slot></slot>
        </div>
    </div>
</div>