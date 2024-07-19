<script>
    import autoAnimate from "@formkit/auto-animate";
    import Seo from "sk-seo";
    import {BookImage, Gauge, LogOut, Settings, Shield} from "lucide-svelte";
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    onMount(() => {
        if (browser) {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        }
    });

    let sizeTitleIcon = 50;
    let sizeNavIcons = 30;
</script>

<Seo
        index="false"
/>

<div class="container-fluid">
    <div class="row">
        <div class="col-2 col-sm-1 bg-dark bg-opacity-25 text-white" style="min-height: 100vh;">
            <p class="h4 text-center mt-3 mb-0"><Shield size={sizeTitleIcon}/></p>
            <hr>
            <div class="col-12">
                <a href="/admin/dashboard/" class="btn btn-custom py-2 w-100 text-start text-md-center" data-bs-toggle="tooltip" data-bs-placement="right" title="Dashboard">
                    <Gauge size={sizeNavIcons}/>
                </a>
            </div>
            <div class="col-12">
                <a href="/admin/dashboard/comics/" class="btn btn-custom py-2 w-100 text-start text-md-center" data-bs-toggle="tooltip" data-bs-placement="right" title="Comics">
                    <BookImage size={sizeNavIcons}/>
                </a>
            </div>
            <div class="col-12">
                <a href="/admin/dashboard/settings/" class="btn btn-custom py-2 w-100 text-start text-md-center" data-bs-toggle="tooltip" data-bs-placement="right" title="Settings">
                    <Settings size={sizeNavIcons}/>
                </a>
            </div>
            <!-- logout -->
            <div class="col-12">
                <a href="/admin/dashboard/logout/" class="btn btn-custom py-2 text-danger-emphasis w-100 text-start text-md-center" data-bs-toggle="tooltip" data-bs-placement="right" title="Logout">
                    <LogOut size={sizeNavIcons}/>
                </a>
            </div>
        </div>
        <div class="col-10 col-sm-11" use:autoAnimate>
            <slot></slot>
        </div>
    </div>
</div>

<style>
    .btn-custom {
        color: var(--text-color);
        background-color: transparent !important;
        border-color: transparent !important;
        transition: all 0.3s;
    }

    .btn-custom:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
    }
</style>