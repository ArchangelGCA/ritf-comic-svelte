<script>
    import {toast} from "svelte-sonner";
    import autoAnimate from "@formkit/auto-animate";
    import {goto, invalidateAll} from "$app/navigation";
    import {deserialize} from "$app/forms";
    import Editor from '@tinymce/tinymce-svelte';
    import {dndzone} from "svelte-dnd-action";
    import {
        ChevronDown,
        FilePlus2,
        Images,
        ImageUp,
        NotebookText,
        Pencil,
        RotateCcw,
        Save,
        Trash2
    } from "lucide-svelte";
    import ComicPage from "$lib/components/admin/ComicPage.svelte";

    export let data;
    let {comic, pages} = data;
    $: ({comic, pages} = data);

    let previewUrl;
    $: previewCoverUrl = comic.coverUrl;
    $: previewBannerUrl = comic.bannerUrl;

    let fileName;
    $: fileNameCoverUrl = comic.cover;
    $: fileNameBannerUrl = comic.banner;

    let conf = {
        skin: 'oxide-dark',
        content_css: 'dark',
        license_key: 'gpl',
        block_unsupported_drop: true,
        branding: false,
        plugins: 'link autolink wordcount charmap code fullscreen',
        default_link_target: '_blank',
        images_upload_handler: () => Promise.reject({
            remove: true,
            message: 'You can\'t upload images in the description.',
        }),
        toolbar_mode: 'sliding',
        toolbar: [
            {
                name: 'history',
                items: ['undo', 'redo']
            },
            {
                name: 'links',
                items: ['link']
            },
            {
                name: 'formatting',
                items: ['bold', 'italic']
            },
            {
                name: 'alignment',
                items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
            },
            {
                name: 'indentation',
                items: ['outdent', 'indent']
            },
            {
                name: 'tools',
                items: ['wordcount', 'charmap', 'code', 'fullscreen']
            }
        ],
        setup: function (editor) {
            editor.on('init', function () {
                const promotionLink = document.querySelector('.tox-promotion-link');
                if (promotionLink) {
                    promotionLink.remove();
                }
            });
        },
    };

    let editorContent = comic.description;
    let editingTitle = false;

    let isActionActive = false;
    let isDragging = false;
    let isDraggingCover = false;
    let isDraggingBanner = false;

    async function handlePageCreate(e) {
        e.preventDefault();

        if (isActionActive) return;

        isActionActive = true;

        const formData = new FormData(e.target);
        formData.append('comic', comic.id);

        toast.info('Creating page...');

        const response = await fetch('?/create', {
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
                await invalidateAll(); // TODO: Test again
            } else {
                toast.warning(result.data.body.message);
            }
        } else {
            toast.error('Something went wrong...');
        }

        isActionActive = false;
    }

    async function handleCoverEdit(e) {
        e.preventDefault();

        if (isActionActive) return;

        isActionActive = true;

        const formData = new FormData(e.target);
        formData.append('comic', comic.id);

        toast.info('Editing cover...');

        const response = await fetch('?/edit_cover', {
            method: 'POST',
            body: formData
        });

        const result = deserialize(await response.text());
        if (result.type === 'success') {
            if (result.data.status === 200 || result.data.status === 303) {
                toast.success(result.data.body.message);
                previewCoverUrl = '';
                fileNameCoverUrl = '';
                e.target.reset();
                await invalidateAll(); // TODO: Test again
            } else {
                toast.warning(result.data.body.message);
            }
        } else {
            toast.error('Something went wrong...');
        }

        isActionActive = false;
    }

    async function handleBannerEdit(e) {
        e.preventDefault();

        if (isActionActive) return;

        isActionActive = true;

        const formData = new FormData(e.target);
        formData.append('comic', comic.id);

        toast.info('Editing banner...');

        const response = await fetch('?/edit_banner', {
            method: 'POST',
            body: formData
        });

        const result = deserialize(await response.text());
        if (result.type === 'success') {
            if (result.data.status === 200 || result.data.status === 303) {
                toast.success(result.data.body.message);
                previewBannerUrl = '';
                fileNameBannerUrl = '';
                e.target.reset();
                await invalidateAll(); // TODO: Test again
            } else {
                toast.warning(result.data.body.message);
            }
        } else {
            toast.error('Something went wrong...');
        }

        isActionActive = false;
    }

    async function handleDescriptionEdit() {
        if (isActionActive) return;

        isActionActive = true;

        const formData = new FormData();
        formData.append('comic', comic.id);
        formData.append('description', editorContent);

        toast.info('Editing description...');

        const response = await fetch('?/edit_description', {
            method: 'POST',
            body: formData
        });

        const result = deserialize(await response.text());

        if (result.type === 'success') {
            if (result.data.status === 200 || result.data.status === 303) {
                toast.success(result.data.body.message);
                await invalidateAll();
            } else {
                toast.warning(result.data.body.message);
            }
        } else {
            toast.error('Something went wrong...');
        }

        isActionActive = false;
    }

    async function handleTitleEdit(e) {
        e.preventDefault();
        if (isActionActive) return;

        isActionActive = true;

        const formData = new FormData(e.target);
        formData.append('comic', comic.id);

        toast.info('Editing title...');

        const response = await fetch('?/edit_title', {
            method: 'POST',
            body: formData
        });

        const result = deserialize(await response.text());
        if (result.type === 'success') {
            if (result.data.status === 200 || result.data.status === 303) {
                toast.success(result.data.body.message);
                editingTitle = false;
                await invalidateAll();
            } else {
                toast.warning(result.data.body.message);
            }
        } else {
            toast.error('Something went wrong...');
        }

        isActionActive = false;
    }

    async function handleSaveOrder() {
        // Changes order appropriately
        const newPages = pages.map((page, index) => ({...page, order: pages.length - index}));

        toast.info('Saving order...');

        const promises = newPages.map(async page => {
            const formData = new FormData();
            formData.append('page', page.id);
            formData.append('order', page.order);

            return fetch('?/edit_page_order', {
                method: 'POST',
                body: formData
            }).then(response => response.text())
                .then(text => deserialize(text));
        });

        const results = await Promise.all(promises);

        const failedResult = results.find(result => result.type !== 'success' || result.data.status !== 200);

        if (failedResult) {
            const errorMessage = failedResult.type !== 'success' ? 'Something went wrong...' : failedResult.data.body.message;
            toast.error(errorMessage);
        } else {
            toast.success('Order saved successfully!');
        }

        await invalidateAll();
    }

    async function handleComicDelete() {
        if (isActionActive) return;

        isActionActive = true;

        const formData = new FormData();
        formData.append('comic', comic.id);

        toast.info('Deleting comic...');

        const response = await fetch('?/delete_comic', {
            method: 'POST',
            body: formData
        });

        const result = deserialize(await response.text());

        if (result.type === 'success') {
            if (result.data.status === 200 || result.data.status === 303) {
                toast.success(result.data.body.message);
                await invalidateAll();
                await goto('/admin/dashboard/comics');
            } else {
                toast.warning(result.data.body.message);
            }
        } else {
            toast.error('Something went wrong...');
        }

        isActionActive = false;
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    function handleDragEnter(event) {
        event.preventDefault();
        let id = event.target.id;
        if (!id) {
            id = event.target.parentElement.id;
            if (!id) {
                id = event.target.parentElement.parentElement.id;
            }
        }
        switch (id) {
            case 'coverDropzone':
                isDraggingCover = true;
                break;
            case 'bannerDropzone':
                isDraggingBanner = true;
                break;
            default:
                isDragging = true;
        }
    }

    function handleDragLeave(event) {
        event.preventDefault();
        let id = event.target.id;
        if (!id) {
            id = event.target.parentElement.id;
            if (!id) {
                id = event.target.parentElement.parentElement.id;
            }
        }
        switch (id) {
            case 'coverDropzone':
                isDraggingCover = true;
                break;
            case 'bannerDropzone':
                isDraggingBanner = true;
                break;
            default:
                isDragging = true;
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length <= 0) return;
        if (!files[0].type.startsWith('image/')) {
            toast.warning('Please upload an image file!');
            return;
        }
        let id = event.target.id;
        if (!id) {
            id = event.target.parentElement.id;
            if (!id) {
                id = event.target.parentElement.parentElement.id;
            }
        }
        switch (id) {
            case 'coverDropzone':
                isDraggingCover = false;
                loadImagePreview({target: {files: [files[0]]}}, 'cover');
                document.getElementById('cover').files = files;
                break;
            case 'bannerDropzone':
                isDraggingBanner = false;
                loadImagePreview({target: {files: [files[0]]}}, 'banner');
                document.getElementById('banner').files = files;
                break;
            default:
                isDragging = false;
                loadImagePreview({target: {files: [files[0]]}});
                document.getElementById('image').files = files;
        }
    }

    function handleDndEvent({detail: {items}}) {
        pages = items;
        handleSaveOrder();
    }

    function handleDndMoveEvent({detail: {items}}) {
        pages = items;
    }

    function loadImagePreview(event, type) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                switch (type) {
                    case 'cover':
                        previewCoverUrl = reader.result;
                        fileNameCoverUrl = file.name;
                        break;
                    case 'banner':
                        previewBannerUrl = reader.result;
                        fileNameBannerUrl = file.name;
                        break;
                    default:
                        previewUrl = reader.result;
                        fileName = file.name
                }
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<div class="container pb-2">
    <!-- Title -->
    <div class="row my-3 my-md-4">
        <div class="col">
            <div class="d-flex justify-content-center align-items-center" use:autoAnimate>
                <p class="h1 mb-0">Title:</p>
                {#if editingTitle}
                    <!-- Editing title form -->
                    <form action="?/edit_title" method="POST" on:submit={handleTitleEdit} class="d-flex ms-2">
                        <div class="input-group">
                            <input type="text" class="form-control form-control-lg bg-dark bg-opacity-50"
                                   placeholder="Title" name="title" value={comic.title} required/>
                            <button class="btn btn-primary" type="submit">
                                <Save/>
                            </button>
                        </div>
                    </form>
                {:else}
                    <p class="h1 mb-0 ms-2">{comic.title}</p>
                {/if}
                <!-- Edit title button -->
                <button class="btn btn-custom text-warning-emphasis ms-2" type="button"
                        on:click={() => editingTitle = !editingTitle}>
                    <Pencil/>
                </button>
            </div>
        </div>
    </div>
    <!-- Cover and Banner -->
    <div class="row mt-2 mb-2">
        <!-- Cover and Banner button -->
        <div class="col">
            <button class="btn btn-outline-primary w-100" type="button" data-bs-toggle="collapse"
                    data-bs-target="#coverBanner" aria-expanded="false" aria-controls="coverBanner">
                <Images/>
                Cover / Banner
                <ChevronDown/>
            </button>
        </div>
        <!-- Cover and Banner -->
        <div class="col-12 mt-2 collapse" id="coverBanner">
            <div class="row">
                <!-- Cover -->
                <div class="col-12 col-md-6">
                    <div class="card card-body">
                        <form action="?/edit_cover" method="POST" enctype="multipart/form-data"
                              on:submit={handleCoverEdit}>
                            <div class="mb-3 dropzone border border-2 border-dark-subtle p-3 px-2 px-md-3 rounded-3 d-flex flex-column justify-content-center drop-zone"
                                 id="coverDropzone"
                                 style="min-height: 15vh"
                                 on:dragover={handleDragOver}
                                 on:drop={handleDrop}
                                 on:dragenter={handleDragEnter}
                                 on:dragleave={handleDragLeave}
                                 class:dragging={isDraggingCover}
                                 role="button" aria-label="Cover upload drop zone" tabindex="0">
                                <label for="cover" class="form-label h4 text-center" title="cover">Cover</label>
                                <input class="form-control form-control-lg bg-dark bg-opacity-50 mb-2" type="file"
                                       id="cover" name="cover" accept="image/*"
                                       on:change={event => loadImagePreview(event, 'cover')} required/>
                                {#if previewCoverUrl}
                                    <img src={previewCoverUrl} alt="Preview"
                                         class="img-thumbnail mt-2 mb-2 rounded-4"
                                         style="max-height: 50vh; width: auto; object-fit: contain"/>
                                {/if}
                                {#if fileNameCoverUrl}
                                    <span class="text-light text-opacity-75">Selected file: {fileNameCoverUrl}</span>
                                {/if}
                            </div>
                            <!-- Submit button -->
                            <div class="text-center">
                                <button type="submit" class="btn btn-primary w-100">
                                    <ImageUp/>
                                    Save Cover
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- Banner -->
                <div class="col-12 col-md-6">
                    <div class="card card-body">
                        <form action="?/edit_banner" method="POST" enctype="multipart/form-data"
                              on:submit={handleBannerEdit}>
                            <div class="mb-3 dropzone border border-2 border-dark-subtle p-3 px-2 px-md-3 rounded-3 d-flex flex-column justify-content-center drop-zone"
                                 id="bannerDropzone" style="min-height: 15vh"
                                 on:dragover={handleDragOver}
                                 on:drop={handleDrop}
                                 on:dragenter={handleDragEnter}
                                 on:dragleave={handleDragLeave}
                                 class:dragging={isDraggingBanner}
                                 role="button" aria-label="Banner upload drop zone" tabindex="0">
                                <label for="banner" class="form-label h4 text-center" title="banner">Banner</label>
                                <input class="form-control form-control-lg bg-dark bg-opacity-50 mb-2" type="file"
                                       id="banner" name="banner" accept="image/*"
                                       on:change={event => loadImagePreview(event, 'banner')} required/>
                                {#if previewBannerUrl}
                                    <img src={previewBannerUrl} alt="Preview"
                                         class="img-thumbnail mt-2 mb-2 rounded-4"
                                         style="max-height: 50vh; width: auto; object-fit: contain"/>
                                {/if}
                                {#if fileNameBannerUrl}
                                    <span class="text-light text-opacity-75">Selected file: {fileNameBannerUrl}</span>
                                {/if}
                            </div>
                            <!-- Submit button -->
                            <div class="text-center">
                                <button type="submit" class="btn btn-primary w-100">
                                    <ImageUp/>
                                    Save Banner
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Page Creation -->
    <div class="row bg-light bg-opacity-10 pt-2 pb-3 rounded-4">
        <div class="col">
            <!-- Section title (actions) -->
            <div class="row mt-2">
                <div class="col">
                    <p class="h3 text-center">Actions:</p>
                </div>
            </div>
            <!-- Page Create -->
            <div class="row mt-2">
                <!-- Page Creation button -->
                <div class="col-12 col-md-6">
                    <button class="btn btn-outline-primary w-100" type="button" data-bs-toggle="collapse"
                            data-bs-target="#createPage" aria-expanded="false" aria-controls="createPage">
                        <FilePlus2/>
                        Add Page
                        <ChevronDown/>
                    </button>
                </div>
                <!-- Comic Description editor button -->
                <div class="col-12 col-md-6 mt-2 mt-md-auto">
                    <button class="btn btn-outline-secondary w-100" type="button" data-bs-toggle="collapse"
                            data-bs-target="#editDescription" aria-expanded="false" aria-controls="editDescription">
                        <NotebookText/>
                        Comic Description
                        <ChevronDown/>
                    </button>
                </div>
                <!-- Page creation form -->
                <div class="col-12 mt-2 collapse" id="createPage">
                    <div class="card card-body">
                        <!-- Pages only require this comic id (comic.id) and image (input from user) -->
                        <form action="?/create" method="POST" enctype="multipart/form-data"
                              on:submit={handlePageCreate}>
                            <div class="mb-3">
                                <div class="mb-3 dropzone border border-2 border-dark-subtle p-3 px-2 px-md-3 rounded-3 d-flex flex-column justify-content-center drop-zone"
                                     style="min-height: 15vh"
                                     on:dragover={handleDragOver}
                                     on:drop={handleDrop}
                                     on:dragenter={handleDragEnter}
                                     on:dragleave={handleDragLeave}
                                     class:dragging={isDragging}
                                     role="button" aria-label="File upload drop zone" tabindex="0">
                                    <label for="file" class="form-label text-center" title="image"> Image</label>
                                    <input class="form-control form-control-lg bg-dark bg-opacity-50 mb-2" type="file"
                                           id="image" name="image" accept="image/*"
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
                                <div class="col pe-0 pe-sm-1 mb-2 mb-sm-auto">
                                    <button type="reset" class="btn btn-danger w-100"
                                            on:click={() => {fileName = ''; previewUrl = ''}}>
                                        <RotateCcw/>
                                        Cancel
                                    </button>
                                </div>
                                <div class="col ps-1 ps-sm-1">
                                    <button type="submit" class="btn btn-primary w-100">
                                        <ImageUp/>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-12 mt-2 collapse" id="editDescription">
                    <div class="card card-body">
                        <Editor {conf}
                                scriptSrc="../../../tinymce/tinymce.min.js"
                                bind:value={editorContent}
                        />
                        <!-- Reset and save buttons -->
                        <div class="row text-center justify-content-center mt-2">
                            <div class="col pe-0 pe-sm-1 mb-2 mb-sm-auto">
                                <button type="reset" class="btn btn-danger w-100"
                                        on:click={() => {editorContent = ''}}>
                                    <RotateCcw/>
                                    Reset
                                </button>
                            </div>
                            <div class="col ps-1 ps-sm-1">
                                <button type="button" class="btn btn-primary w-100"
                                        on:click={handleDescriptionEdit}>
                                    <ImageUp/>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="my-4">
            <!-- Comic Deletion -->
            <div class="row mt-2">
                <div class="col">
                    <button class="btn btn-outline-danger w-100" type="button" data-bs-toggle="collapse"
                            data-bs-target="#deleteComic" aria-expanded="false" aria-controls="deleteComic">
                        <Trash2/>
                        Delete Comic
                        <ChevronDown/>
                    </button>
                </div>
                <div class="col-12 mt-2">
                    <div class="collapse" id="deleteComic">
                        <div class="card card-body bg-danger bg-opacity-25">
                            <p class="text-center text-danger-emphasis">Are you sure you want to delete this comic?</p>
                            <div class="row text-center justify-content-center mt-2">
                                <div class="col pe-0 pe-sm-1 mb-2 mb-sm-auto">
                                    <button class="btn btn-outline-danger w-100" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#deleteComic" aria-expanded="false"
                                            aria-controls="deleteComic">
                                        <RotateCcw/>
                                        Cancel
                                    </button>
                                </div>
                                <div class="col ps-1 ps-sm-1">
                                    <button class="btn btn-danger w-100" on:click={handleComicDelete}>
                                        <Trash2/>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Pages Title -->
    <div class="row mt-3" use:autoAnimate>
        <div class="col-12">
            <p class="h3 text-center mb-0">Pages:</p>
        </div>
        {#if pages.length === 0}
            <div class="col">
                <p class="text-center text-light text-opacity-75">No pages found...</p>
            </div>
        {/if}
    </div>
    <!-- Tip -->
    <div class="row mb-2">
        <div class="col">
            <p class="text-center text-light text-opacity-75">🚀 Drag and drop to reorder pages.</p>
        </div>
    </div>
    <!-- Pages -->
    <div class="row" use:dndzone={{ items: pages }} on:consider={handleDndMoveEvent} on:finalize={handleDndEvent}>
        {#each pages as page (page.id)}
            <ComicPage {page} on:reload={() => invalidateAll()}/>
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