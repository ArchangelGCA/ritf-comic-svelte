import {POCKETBASE_URL} from '$env/static/private';
import PocketBase from 'pocketbase';

export const handle = async ({ event, resolve }) => {
    const pocketbase = new PocketBase(POCKETBASE_URL);

    pocketbase.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    try {
        if (pocketbase.authStore.isValid) await pocketbase.collection('users').authRefresh();
    } catch (_) {
        pocketbase.authStore.clear();
    }

    event.locals.pocketbase = pocketbase;
    event.locals.user = pocketbase.authStore.model;

    const response = await resolve(event);

    response.headers.set(
        'set-cookie',
        pocketbase.authStore.exportToCookie({ httpOnly: false })
    );

    return response;
}