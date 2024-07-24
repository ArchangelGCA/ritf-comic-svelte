<script>
    export let comic;
</script>

<div class="col-12 col-md-6 my-1 shadow-sm">
    <a href="{comic.id}" class="text-decoration-none">
        <div class="card comic rounded-4">
            <img src={comic.coverUrl} class="card-img-top rounded-4" alt={comic.cover} data-bs-toggle="tooltip" title={comic.title}>
        </div>
    </a>
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