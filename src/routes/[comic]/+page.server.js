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
    const comicData = await pocketbase.collection('comics').getOne(comic);

    if (!comicData || comicData.length === 0) {
        return errorx(404, 'Comic not found');
    }

    // Fetch Comic Pages
    const pageData = await pocketbase.collection('pages').getFullList({
        sort: '-created',
    });

    let page = {};

    // Filter page by number
    if (!pageData || pageData.length === 0 || pageData.length < pageNumber) {
        page = [];
    } else {
        page = pageData[pageNumber-1];
    }

    return {
        page,
    }
}