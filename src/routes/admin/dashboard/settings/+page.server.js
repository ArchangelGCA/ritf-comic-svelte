import {POCKETBASE_URL, POCKETBASE_EMAIL, POCKETBASE_PSW} from '$env/static/private';
import PocketBase from 'pocketbase';

export const actions = {
    save: async ({ request, locals: { pocketbase, user } }) => {
        const formData = Object.fromEntries(await request.formData());
        const {discord, twitter, instagram, facebook} = formData;

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'You need to be logged in to save settings'
                }
            }
        }

        const pbAdmin = new PocketBase(POCKETBASE_URL);
        await pbAdmin.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PSW);

        // Fetch previous settings using the user's ID
        const query = 'owner = "' + user.id + '"';
        const settings = await pbAdmin.collection('settings').getFirstListItem(query);

        // Using id from settings, update the settings
        if (settings) {
            await pbAdmin.collection('settings').update(settings.id, {
                discord,
                twitter,
                instagram,
                facebook
            });
        } else {
            // If no settings found, create a new one
            await pbAdmin.collection('settings').create({
                user: user.id,
                discord,
                twitter,
                instagram,
                facebook
            });
        }

        return {
            status: 200,
            body: {
                message: 'Settings saved successfully!'
            }
        }
    }
}