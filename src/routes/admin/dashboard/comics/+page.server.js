import {POCKETBASE_URL, POCKETBASE_EMAIL, POCKETBASE_PSW} from '$env/static/private';
import PocketBase from 'pocketbase';

export const load = async ({ locals: { pocketbase, user } }) => {
    const comics = await pocketbase.collection('comics').getFullList({
        sort: '-created',
    });

    comics.forEach(comic => {
        comic.coverUrl = pocketbase.files.getUrl(comic, comic.cover, {'thumb': '500x0'});
        comic.bannerUrl = pocketbase.files.getUrl(comic, comic.banner, {'thumb': '500x0'});
    });

    return {
        comics,
    }
}

export const actions = {
    create: async ({ request, locals: { pocketbase, user } }) => {
        const formData = Object.fromEntries(await request.formData());
        const {title, description, cover, banner} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to create a comic'
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

        if (!description) {
            formData.description = '';
        }

        if (!cover) {
            return {
                status: 400,
                body: {
                    message: 'Cover is required'
                }
            }
        }

        // Check if banner (It is a File object) is provided, if not, use cover as banner
        if (!banner || banner.size === 0) {
            // If banner is not provided, use cover as banner
            formData.banner = cover;
        }

        // Add data to formData
        formData.owner = user.id;
        formData.order = 0;

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        try {
            await pbAdmin.collection('comics').create(formData);
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
                message: 'Comic created successfully!'
            }
        }
    }
}