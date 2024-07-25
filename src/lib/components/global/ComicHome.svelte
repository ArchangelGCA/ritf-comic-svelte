<script>
    export let comic;
</script>

<div class="col-12 col-md-3">
    <div class="row">
        <div class="col-12">
            <p class="h4 text-center bg-light bg-opacity-10 py-2 rounded-4"><a class="link-light text-decoration-none" href={comic.id}>{comic.title}</a></p>
        </div>
        <div class="col-12">
            <a href="{comic.id}" class="text-decoration-none">
                <div class="card comic rounded-4">
                    <img src={comic.coverUrl} class="card-img-top rounded-4" alt={comic.cover} data-bs-toggle="tooltip" title={comic.title}>
                </div>
            </a>
        </div>
        <div class="col-12 mt-1">
            <p class="text-center text-truncate bg-secondary bg-opacity-10 pt-3 rounded-4">{@html comic.description}</p>
        </div>
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