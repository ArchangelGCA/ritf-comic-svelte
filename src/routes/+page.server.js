export const load = async ({ request, locals: { pocketbase, user } }) => {
    const comics = await pocketbase.collection('comics').getFullList({
        sort: '-created',
    });

    return {
        comics,
    }
}