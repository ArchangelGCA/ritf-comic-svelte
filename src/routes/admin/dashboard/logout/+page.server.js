import {redirect} from "@sveltejs/kit";

export const load = async ({ params, locals: { pocketbase, user } }) => {
    if (!user){
        throw redirect(303, '/admin');
    }

    pocketbase.authStore.clear();
    user = null;
    throw redirect(303, '/admin');
}