<script>
    import autoAnimate from "@formkit/auto-animate";
    import Seo from "sk-seo";
</script>

<Seo
        index="false"
/>

<div class="container-fluid">
    <div class="row">
        <div class="col-5 col-md-2 bg-dark bg-opacity-25 text-white" style="min-height: 100vh;">
            <p class="h4 text-start ms-3 mt-3 mb-0">Admin</p>
            <hr>
            <div class="col-12">
                <a href="/admin/dashboard/" class="btn btn-custom w-100 text-start">
                    Dashboard
                </a>
            </div>
            <div class="col-12">
                <a href="/admin/dashboard/comics/" class="btn btn-custom w-100 text-start">
                    Comics
                </a>
            </div>
            <div class="col-12">
                <a href="/admin/dashboard/settings/" class="btn btn-custom w-100 text-start">
                    Settings
                </a>
            </div>
            <!-- logout -->
            <div class="col-12">
                <a href="/admin/dashboard/logout/" class="btn btn-custom text-danger-emphasis w-100 text-start">
                    Logout
                </a>
            </div>
        </div>
        <div class="col-7 col-md-10" use:autoAnimate>
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