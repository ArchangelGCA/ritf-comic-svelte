<script>
    import {Info} from "lucide-svelte";

    export let comic;
    export let showDescription = false;
</script>

<div class="col-12 col-md-3">
    <div class="row">
        <div class="col-12">
            <p class="h4 text-center bg-light bg-opacity-10 py-2 rounded-4"><a class="link-light text-decoration-none" href={comic.id}>{comic.title}</a> </p>
        </div>
        <div class="col-12">
            <a href="{comic.id}" class="text-decoration-none">
                <div class="card comic rounded-4">
                    <img src={comic.coverUrl} class="card-img-top rounded-4" alt={comic.cover} data-bs-toggle="tooltip" title={comic.title}>
                </div>
            </a>
        </div>
        <!-- Description -->
        {#if showDescription}
            <div class="col-12">
                <button class="btn btn-custom w-100 mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDescription{comic.id}" aria-expanded="false" aria-controls="collapseDescription{comic.id}">
                    <Info /> Description
                </button>
            </div>
            <div class="collapse col-12" id="collapseDescription{comic.id}">
                <div class="card card-body bg-light bg-opacity-10 rounded-4 border-0 mt-2">
                    <p>{@html comic.description}</p>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .comic {
        transition: all 0.2s;
    }

    .comic:hover {
        transform: scale(1.025);
        box-shadow: 0 0 10px var(--accent-color);
    }
</style>