import {error as errorx} from '@sveltejs/kit';

export const load = async ({ params, url, locals: { pocketbase } }) => {

    if (!params.comic) {
        return errorx(404, 'Comic not found');
    }

    const comic = params.comic;
    let pageNumber;

    // Get params
    if (url.searchParams.get('page') === null || ''){
        pageNumber = 1;
    } else {
        pageNumber = parseInt(url.searchParams.get('page'));
        if (isNaN(pageNumber)){
            pageNumber = 1;
        }
    }

    // Check if comic exists
    let comicData = {};
    try {
        comicData = await pocketbase.collection('comics').getOne(comic);
    } catch (e) {
        try {
            const stringQuery = 'title="' + comic + '"';
            comicData = await pocketbase.collection('comics').getFirstListItem(stringQuery);
        } catch (e) {
            return errorx(404, 'Comic not found');
        }
    }

    // Get bannerUrl and coverUrl
    comicData.coverUrl = pocketbase.files.getUrl(comicData, comicData.cover, {'thumb': '500x0'});
    comicData.bannerUrl = pocketbase.files.getUrl(comicData, comicData.banner, {'thumb': '500x0'});

    // Fetch Comic Pages
    const pageData = await pocketbase.collection('pages').getFullList({
        filter: 'comic="' + comicData.id + '"',
        sort: '+order, +created',
    });

    let page = {};

    // Filter page by number
    if (!pageData || pageData.length === 0 || pageData.length < pageNumber) {
        page = [];
    } else {
        page = pageData[pageNumber-1];
    }

    if (page){
        page.imageUrl = pocketbase.files.getUrl(page, page.image, {'thumb': '500x0'});
    }

    return {
        page,
    }
}