<script>
    import autoAnimate from "@formkit/auto-animate";
    import Seo from "sk-seo";
</script>

<Seo
        index="false"
/>

<div class="container-fluid px-0">
    <div class="row">
        <div class="col-5 col-md-2 bg-dark bg-opacity-25 text-white" style="min-height: 100vh;">
            <p class="h4 text-start ms-3 mt-3 mb-0">Admin</p>
            <hr>
            <ul class="nav nav-pills flex-column ms-2 mb-auto">
                <li class="nav-item rounded-3">
                    <a href="/admin/dashboard/" class="nav-link text-white" aria-current="page">
                        Dashboard
                    </a>
                </li>
                <li class="nav-item rounded-3">
                    <a href="/admin/dashboard/comics" class="nav-link text-white">
                        Comics
                    </a>
                </li>
                <li class="nav-item rounded-3">
                    <a href="/admin/dashboard/settings" class="nav-link text-white">
                        Settings
                    </a>
                </li>
                <li class="nav-item rounded-3">
                    <a href="/admin/dashboard/logout" class="nav-link text-danger-emphasis">
                        Logout
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-7 col-md-10" use:autoAnimate>
            <slot></slot>
        </div>
    </div>
</div>

<style>
    .nav-item {
        transition: background-color 0.1s;
    }

    .nav-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
</style>