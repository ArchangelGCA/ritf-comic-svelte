import {POCKETBASE_URL, POCKETBASE_EMAIL, POCKETBASE_PSW} from '$env/static/private';
import {error as errorx} from '@sveltejs/kit';
import PocketBase from "pocketbase";

export const load = async ({ params, url, locals: { pocketbase } }) => {

    if (!params.comic) {
        return errorx(404, 'Comic not found');
    }

    const comic = params.comic;

    // Check if comic exists
    let comicData = [];

    try {
        comicData = await pocketbase.collection('comics').getOne(comic);
    } catch (e){
        return errorx(404, 'Comic not found');
    }

    if (!comicData || comicData.length === 0) {
        return errorx(404, 'Comic not found');
    }

    comicData.coverUrl = pocketbase.files.getUrl(comicData, comicData.cover, {'thumb': '500x0'});
    comicData.bannerUrl = pocketbase.files.getUrl(comicData, comicData.banner, {'thumb': '500x0'});

    // Fetch Comic Pages
    const pages = await pocketbase.collection('pages').getFullList({
        sort: '+order, -created',
        filter: `comic = '${comic}'`,
    });

    pages.forEach(page => {
        page.imageUrl = pocketbase.files.getUrl(page, page.image, {'thumb': '500x0'});
    });

    return {
        comic: comicData,
        pages,
    }
}

export const actions = {
    create: async ({request, locals: {pocketbase, user}}) => {
        const formData = Object.fromEntries(await request.formData());
        const {comic,image} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!comic) {
            return {
                status: 400,
                body: {
                    message: 'Comic is required'
                }
            }
        }

        if (!image) {
            return {
                status: 400,
                body: {
                    message: 'Image is required'
                }
            }
        }

        // Add data to formData
        formData.order = 0;

        // Create admin supabase
        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        try {
            await pbAdmin.collection('pages').create(formData);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Page created successfully'
            }
        }
    },
    edit_title: async ({request, params, locals: { pocketbase, user }}) => {
        const formData = Object.fromEntries(await request.formData());
        const {comic, title} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!comic) {
            return {
                status: 400,
                body: {
                    message: 'Comic is required'
                }
            }
        }

        if (!title) {
            return {
                status: 400,
                body: {
                    message: 'Title is required'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        const data = {
            title
        }

        try {
            await pbAdmin.collection('comics').update(comic, data);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Comic title updated successfully'
            }
        }
    },
    edit_description: async ({request, params, locals: { pocketbase, user }}) => {
        const formData = Object.fromEntries(await request.formData());
        const {comic, description} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!comic) {
            return {
                status: 400,
                body: {
                    message: 'Comic is required'
                }
            }
        }

        if (!description) {
            return {
                status: 400,
                body: {
                    message: 'Description is required'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        const data = {
            description
        }

        try {
            await pbAdmin.collection('comics').update(comic, data);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Comic description updated successfully'
            }
        }
    },
    edit_order: async ({request, params, locals: { pocketbase, user }}) => {
        const formData = Object.fromEntries(await request.formData());
        const {comic, order} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!comic) {
            return {
                status: 400,
                body: {
                    message: 'Comic is required'
                }
            }
        }

        if (!order) {
            return {
                status: 400,
                body: {
                    message: 'Order is required'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        const data = {
            order
        }

        try {
            await pbAdmin.collection('comics').update(comic, data);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Comic order updated successfully'
            }
        }
    },
    edit_cover: async ({request, params, locals: { pocketbase, user }}) => {
        const formData = Object.fromEntries(await request.formData());
        const {comic, cover} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!comic) {
            return {
                status: 400,
                body: {
                    message: 'Comic is required'
                }
            }
        }

        if (!cover) {
            return {
                status: 400,
                body: {
                    message: 'Cover is required'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        const data = {
            cover
        }

        try {
            await pbAdmin.collection('comics').update(comic, data);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Comic cover updated successfully'
            }
        }
    },
    edit_banner: async ({request, params, locals: { pocketbase, user }}) => {
        const formData = Object.fromEntries(await request.formData());
        const {comic, banner} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!comic) {
            return {
                status: 400,
                body: {
                    message: 'Comic is required'
                }
            }
        }

        if (!banner) {
            return {
                status: 400,
                body: {
                    message: 'Banner is required'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        const data = {
            banner
        }

        try {
            await pbAdmin.collection('comics').update(comic, data);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Comic banner updated successfully'
            }
        }
    },
    edit_page_order: async ({request, params, locals: { pocketbase, user }}) => {
        const formData = Object.fromEntries(await request.formData());
        const {page, order} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!page) {
            return {
                status: 400,
                body: {
                    message: 'Page is required'
                }
            }
        }

        if (!order) {
            return {
                status: 400,
                body: {
                    message: 'Order is required'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        const data = {
            order
        }

        try {
            await pbAdmin.collection('pages').update(page, data);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Page order updated successfully'
            }
        }
    },
    edit_page_image: async ({request, params, locals: { pocketbase, user }}) => {
        const formData = Object.fromEntries(await request.formData());
        const {page, image} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!page) {
            return {
                status: 400,
                body: {
                    message: 'Page is required'
                }
            }
        }

        if (!image) {
            return {
                status: 400,
                body: {
                    message: 'Image is required'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        const data = {
            image
        }

        try {
            await pbAdmin.collection('pages').update(page, data);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Page image updated successfully'
            }
        }
    },
    delete_comic: async ({request, params, locals: { pocketbase, user }}) => {
        const formData = Object.fromEntries(await request.formData());
        const {comic} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!comic) {
            return {
                status: 400,
                body: {
                    message: 'Comic is required'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        try {
            await pbAdmin.collection('comics').delete(comic);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Comic deleted successfully'
            }
        }
    },
    delete_page: async ({request, params, locals: { pocketbase, user }}) => {
        const formData = Object.fromEntries(await request.formData());
        const {page} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a page'
                }
            }
        }

        if (!page) {
            return {
                status: 400,
                body: {
                    message: 'Page is required'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        try {
            await pbAdmin.collection('pages').delete(page);
        } catch (e) {
            console.error(e);
            return {
                status: 500,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Page deleted successfully'
            }
        }
    }
}