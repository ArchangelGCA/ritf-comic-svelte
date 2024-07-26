<script>
    export let comic;
</script>

<div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-2" data-id={comic.id}>
    <a href="comics/{comic.id}" class="text-decoration-none">
        <div class="card comic rounded-4 border-primary">
            <img src={comic.coverUrl} class="card-img-top rounded-top-4" alt={comic.cover}>
            <div class="card-body text-center bg-light bg-opacity-10 rounded-bottom-4">
                <h5 class="card-title text-center my-auto">{comic.title}</h5>
            </div>
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