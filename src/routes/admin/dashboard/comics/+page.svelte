<script>
    import {deserialize} from "$app/forms";
    import {invalidateAll} from "$app/navigation";

    export let data;
    const { comics } = data;

    let isCreating = false;

    async function handleComicCreate(e){
        e.preventDefault();

        if (isCreating) return;

        isCreating = true;

        const formData = new FormData(e.target);

        const response = await fetch('?/create', {
            method: 'POST',
            body: formData
        });

        const result = deserialize(await response.text());
        if (result.type === 'success'){
            if (result.data.status === 200 || result.data.status === 303){
                alert(result.data.body.message);
            } else {
                alert(result.data.body.message);
            }
        } else {
            alert('Something went wrong...');
        }

        isCreating = false;
        await invalidateAll();
    }
</script>

<div class="container">
    <!-- Title -->
    <div class="row mt-2">
        <div class="col">
            <p class="h1 text-center">Comics</p>
        </div>
    </div>
    <!-- Create Comic -->
    <div class="row mt-2">
        <div class="col">
            <button class="btn btn-lg btn-outline-primary bg-light bg-opacity-10 w-100" type="button" data-bs-toggle="collapse" data-bs-target="#createComicForm" aria-expanded="false" aria-controls="createComicForm">Add Comic</button>
        </div>

        <!-- Create Comic Form -->
        <div class="collapse" id="createComicForm">
            <div class="card card-body bg-light bg-opacity-10 mt-2">
                <form method="POST" action="?/create" on:submit={handleComicCreate}>
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="title" name="title" required>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" name="description"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="cover" class="form-label">Cover</label>
                        <input type="file" class="form-control" id="cover" name="cover" required>
                    </div>
                    <div class="mb-3">
                        <label for="banner" class="form-label">Banner</label>
                        <input type="file" class="form-control" id="banner" name="banner" value=''>
                    </div>
                    <button type="submit" class="btn btn-lg btn-outline-primary bg-light bg-opacity-10 w-100">Create Comic</button>
                </form>
            </div>
        </div>
    </div>
    <!-- Comics -->
    <div class="row mt-2">
        {#each comics as comic}
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-2">
                <div class="card">
                    <img src={comic.coverUrl} class="card-img-top" alt={comic.title}>
                    <div class="card-body">
                        <h5 class="card-title text-center">{comic.title}</h5>
                        <p class="card-text">{comic.description}</p>
                        <a href="comics/{comic.id}" class="btn btn-primary w-100">View</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>

</div>

<style>
</style>