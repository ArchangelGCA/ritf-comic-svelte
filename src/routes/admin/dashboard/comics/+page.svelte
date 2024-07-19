<script>
    import {deserialize} from "$app/forms";
    import autoAnimate from "@formkit/auto-animate";
    import {invalidateAll} from "$app/navigation";
    import {toast} from "svelte-sonner";
    import {BookPlus, ChevronDown, ImageUp} from "lucide-svelte";
    import Comic from "$lib/components/admin/Comic.svelte";

    export let data;
    let { comics } = data;
    $: ({ comics } = data);

    let previewUrl = '';
    let fileName = '';

    let bannerPreviewUrl = '';
    let bannerFileName = '';

    let isDragging = false;
    let isDraggingBanner = false;
    let isCreating = false;

    async function handleComicCreate(e){
        e.preventDefault();

        if (isCreating) return;

        isCreating = true;

        const formData = new FormData(e.target);

        toast.info('Creating comic...');

        const response = await fetch('?/create', {
            method: 'POST',
            body: formData
        });

        const result = deserialize(await response.text());
        if (result.type === 'success'){
            if (result.data.status === 200 || result.data.status === 303){
                toast.success(result.data.body.message);
                previewUrl = '';
                fileName = '';
                e.target.reset();
                await invalidateAll(); // TODO: Test again
            } else {
                toast.warning(result.data.body.message);
            }
        } else {
            toast.error('Something went wrong...');
        }

        isCreating = false;
    }

    // DragEvents (Dropzone)
    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    function handleDragEnter(event) {
        event.preventDefault();
        if (event.target.id === 'bannerDropzone') {
            isDraggingBanner = true;
        } else {
            isDragging = true;
        }
    }

    function handleDragLeave(event) {
        event.preventDefault();
        // if it is banner dropzone
        if (event.target.id === 'bannerDropzone') {
            isDraggingBanner = false;
        } else {
            isDragging = false;
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        isDragging = false;
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            // Check if file is an image, if not return
            if (!files[0].type.startsWith('image/')) {
                toast.warning('Please upload an image file!');
                return;
            }
            loadImagePreview({ target: { files: [files[0]] } });
            // Set the files to the input
            document.getElementById('cover').files = files;
        }
    }

    function handleBannerDrop(event) {
        event.preventDefault();
        isDragging = false;
        isDraggingBanner = false;
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            // Check if file is an image, if not return
            if (!files[0].type.startsWith('image/')) {
                toast.warning('Please upload an image file!');
                return;
            }
            loadBannerPreview({ target: { files: [files[0]] } });
            // Set the files to the input
            document.getElementById('banner').files = files;
        }
    }

    function loadImagePreview(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                previewUrl = reader.result;
            };
            reader.readAsDataURL(file);
            fileName = file.name;
        }
    }

    function loadBannerPreview(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                bannerPreviewUrl = reader.result;
            };
            reader.readAsDataURL(file);
            bannerFileName = file.name;
        }
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
            <button class="btn btn-lg btn-outline-primary w-100" type="button" data-bs-toggle="collapse" data-bs-target="#createComicForm" aria-expanded="false" aria-controls="createComicForm">
                <BookPlus /> Add Comic <ChevronDown />
            </button>
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
                    <div class="mb-3 dropzone border border-2 border-dark-subtle p-3 px-2 px-md-3 rounded-3 d-flex flex-column justify-content-center drop-zone" style="min-height: 15vh"
                         on:dragover={handleDragOver}
                         on:drop={handleDrop}
                         on:dragenter={handleDragEnter}
                         on:dragleave={handleDragLeave}
                         class:dragging={isDragging}
                         role="button" aria-label="File upload drop zone" tabindex="0">
                        <label for="file" class="form-label" title="cover"> Cover</label>
                        <input class="form-control form-control-lg bg-dark bg-opacity-50 mb-2" type="file" id="cover" name="cover" accept="image/*" on:change={loadImagePreview} required/>
                        {#if previewUrl}
                            <img src={previewUrl} alt="Preview" class="img-thumbnail mt-2 mb-2 rounded-4" style="max-height: 50vh; width: auto; object-fit: contain" />
                        {/if}
                        {#if fileName}
                            <span class="text-light text-opacity-75">Selected file: {fileName}</span>
                        {/if}
                    </div>
                    <div class="mb-3 dropzone border border-2 border-dark-subtle p-3 px-2 px-md-3 rounded-3 d-flex flex-column justify-content-center drop-zone" id="bannerDropzone" style="min-height: 15vh"
                         on:dragover={handleDragOver}
                         on:drop={handleBannerDrop}
                         on:dragenter={handleDragEnter}
                         on:dragleave={handleDragLeave}
                         class:dragging={isDraggingBanner}
                         role="button" aria-label="File upload drop zone" tabindex="0">
                        <label for="file" class="form-label" title="cover"> Banner</label>
                        <input class="form-control form-control-lg bg-dark bg-opacity-50 mb-2" type="file" id="banner" name="banner" accept="image/*" on:change={loadBannerPreview} required/>
                        {#if bannerPreviewUrl}
                            <img src={bannerPreviewUrl} alt="Preview Banner" class="img-thumbnail mt-2 mb-2 rounded-4" style="max-height: 50vh; width: auto; object-fit: contain" />
                        {/if}
                        {#if bannerFileName}
                            <span class="text-light text-opacity-75">Selected file: {bannerFileName}</span>
                        {/if}
                    </div>
                    <button type="submit" class="btn btn-lg btn-primary w-100"><ImageUp /> Create Comic</button>
                </form>
            </div>
        </div>
    </div>
    <!-- Comics -->
    <div class="row mt-2" use:autoAnimate>
        {#each comics as comic (comic.id)}
            <Comic {comic} />
        {/each}
    </div>
</div>

<style>
    .dropzone {
        background-color: rgba(0, 0, 0, 0.1);
        border: 2px dashed var(--primary-color) !important;
    }

    .dropzone.dragging {
        background-color: rgb(47, 0, 89) !important;
    }
</style>