<script>
    import {deserialize} from "$app/forms";
    import {createEventDispatcher} from "svelte";
    import {toast} from "svelte-sonner";
    import {FilePenLine, ImageUp, RotateCcw, Trash2} from "lucide-svelte";

    export let page;

    $: previewUrl = page.imageUrl;
    $: fileName = page.image;

    let isActionActive = false;
    let isDragging = false;

    const dispatch = createEventDispatcher();

    async function handlePageDelete() {
        if (isActionActive) return;
        if (!confirm("Are you sure you want to delete this page?")) return;

        isActionActive = true;
        const formData = new FormData();
        formData.append("page", page.id);

        const response = await fetch(`?/delete_page`, {
            method: "POST",
            body: formData
        });

        const result = deserialize(await response.text());

        if (result.type === "success") {
            if (result.data.status === 200 || result.data.status === 303) {
                toast.success(result.data.body.message);
                reload();
            } else {
                toast.warning(result.data.body.message);
            }
        } else {
            toast.error("Something went wrong...");
        }

        isActionActive = false;
    }

    async function handlePageImageEdit(e) {
        e.preventDefault();
        if (isActionActive) return;

        isActionActive = true;

        const formData = new FormData(e.target);
        formData.append('page', page.id);

        toast.info('Updating page image...');

        const response = await fetch('?/edit_page_image', {
            method: 'POST',
            body: formData
        });

        const result = deserialize(await response.text());
        if (result.type === 'success') {
            if (result.data.status === 200 || result.data.status === 303) {
                toast.success(result.data.body.message);
                previewUrl = '';
                fileName = '';
                e.target.reset();
                reload();
            } else {
                toast.warning(result.data.body.message);
            }
        } else {
            toast.error('Something went wrong...');
        }

        isActionActive = false;
    }

    function reload() {
        dispatch("reload");
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    function handleDragEnter(event) {
        event.preventDefault();
        isDragging = true;
    }

    function handleDragLeave(event) {
        event.preventDefault();
        isDragging = false;
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
            loadImagePreview({target: {files: [files[0]]}});
            // Set the files to the input
            document.getElementById(`image${page.id}`).files = files;
            console.log(document.getElementById(`image${page.id}`).files);
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

    function formatDate(date) {
        return new Date(date).toLocaleString();
    }
</script>

<!-- open offcanvas on div card click -->
<div class="col-12 col-md-6 col-lg-4 col-xl-3" data-id={page.id}>
    <a class="text-decoration-none" data-bs-toggle="offcanvas" href="#editPage{page.id}" role="button"
       aria-controls="editPage{page.id}">
        <div class="card bg-dark bg-opacity-10 page">
            <img src={page.imageUrl} class="card-img-top" alt={page.image}>
            <div class="card-body">
                <p class="card-text text-light text-opacity-75">Created: {formatDate(page.created)}</p>
            </div>
        </div>
    </a>
    <!-- offcanvas -->
    <div class="offcanvas offcanvas-end" data-bs-backdrop="false" tabindex="-1" id="editPage{page.id}">
        <div class="offcanvas-header">
            <h5 id="editPage{page.id}Label" class="offcanvas-title"><FilePenLine /> Edit Page</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <!-- Delete Page -->
            <div class="row">
                <div class="col-12">
                    <!-- Delete Page button -->
                    <button class="btn btn-danger w-100" type="button" on:click={handlePageDelete}><Trash2 /> Delete Page</button>
                </div>
                <!-- Dropzone to change image -->
                <div class="col-12 mt-2">
                    <div class="card card-body">
                        <!-- Pages Form -->
                        <form action="?/create" method="POST" enctype="multipart/form-data"
                              on:submit={handlePageImageEdit}>
                            <div class="mb-3">
                                <div class="mb-3 dropzone border border-2 border-dark-subtle p-3 px-2 px-md-3 rounded-3 d-flex flex-column justify-content-center drop-zone"
                                     style="min-height: 15vh"
                                     on:dragover={handleDragOver}
                                     on:drop={handleDrop}
                                     on:dragenter={handleDragEnter}
                                     on:dragleave={handleDragLeave}
                                     class:dragging={isDragging}
                                     role="button" aria-label="File upload drop zone" tabindex="0">
                                    <label for="file" class="form-label" title="image"> Image</label>
                                    <input class="form-control form-control-lg bg-dark bg-opacity-50 mb-2" type="file"
                                           id="image{page.id}" name="image" accept="image/*"
                                           on:change={event => loadImagePreview(event)} required/>
                                    {#if previewUrl}
                                        <img src={previewUrl} alt="Preview" class="img-thumbnail mt-2 mb-2 rounded-4"
                                             style="max-height: 50vh; width: auto; object-fit: contain"/>
                                    {/if}
                                    {#if fileName}
                                        <span class="text-light text-opacity-75">Selected file: {fileName}</span>
                                    {/if}
                                </div>
                            </div>
                            <div class="row text-center justify-content-center">
                                <div class="col">
                                    <button type="submit" class="btn btn-primary w-100">
                                        <ImageUp/>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<style>
    .page {
        transition: all 0.2s;
    }

    .page:hover {
        transform: scale(1.025);
        box-shadow: 0 0 10px var(--accent-color);
    }
</style>