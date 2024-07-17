import { redirect } from '@sveltejs/kit'

export const load = async ({ params, locals: { user } }) => {
    if (user){
        throw redirect(303, '/admin/dashboard');
    }
}

export const actions = {
    login: async ({ request, locals: { pocketbase, user } }) => {
        const formData = Object.fromEntries(await request.formData());

        if (user){
            return {
                status: 401,
                body: {
                    message: 'You are already logged in',
                    location: '/admin/dashboard'
                }
            }
        }

        const { email, password } = formData;

        try {
            await pocketbase.collection('users').authWithPassword(email, password);
        } catch (e) {
            console.error(e);
            return {
                status: 401,
                body: {
                    message: e.message
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Logged in successfully!',
                location: '/admin/dashboard'
            }
        }
    }
}