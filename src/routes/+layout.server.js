export const load = async ({ request, locals: { pocketbase, user } }) => {
    const comics = await pocketbase.collection('comics').getFullList({
        sort: '+order, -created',
    });

    comics.forEach(comic => {
        comic.coverUrl = pocketbase.files.getUrl(comic, comic.cover, {'thumb': '500x0'});
    });

    const settings = await pocketbase.collection('settings').getFullList();

    return {
        comics,
        settings: settings[0],
    }
}