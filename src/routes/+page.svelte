<script>
    import Seo from "sk-seo";
    import ComicHome from "$lib/components/global/ComicHome.svelte";
    import SocialIcons from "@rodneylab/svelte-social-icons";
    import favicon from "$lib/assets/images/favicon.webp?enhanced";
    import rose from "$lib/assets/images/rose-original.webp?enhanced";
    import SVGWave from "$lib/components/global/SVGWave.svelte";

    export let data;
    const { settings, comics } = data;
</script>

<Seo
        title={settings.title}
        description={settings.description}
        index={false}
/>

<svelte:head>
    <meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="container-fluid mb-5">
    <div class="row justify-content-center my-5 pb-5 pt-4">
        {#if comics && comics.length > 0}
            <div class="col-12 my-3">
                <p class="h3 text-center mb-0">🚀 Read our comics </p>
                <p class="text-center text-muted">Click to read!</p>
            </div>
            {#each comics as comic (comic.id)}
                <ComicHome {comic} showDescription={false}/>
            {/each}
        {:else}
            <div class="col-12 text-center">
                <p class="h4 text-warning">No comics found!</p>
            </div>
        {/if}
    </div>

    <!-- Socials -->
    <SVGWave fill="#3c1d34" data="M0,0L34.3,0C68.6,0,137,0,206,10C274.3,20,343,40,411,43.3C480,47,549,33,617,23.3C685.7,13,754,7,823,8.3C891.4,10,960,20,1029,28.3C1097.1,37,1166,43,1234,38.3C1302.9,33,1371,17,1440,10C1508.6,3,1577,7,1646,11.7C1714.3,17,1783,23,1851,26.7C1920,30,1989,30,2057,36.7C2125.7,43,2194,57,2263,61.7C2331.4,67,2400,63,2469,63.3C2537.1,63,2606,67,2674,61.7C2742.9,57,2811,43,2880,45C2948.6,47,3017,63,3086,63.3C3154.3,63,3223,47,3291,43.3C3360,40,3429,50,3497,53.3C3565.7,57,3634,53,3703,43.3C3771.4,33,3840,17,3909,11.7C3977.1,7,4046,13,4114,16.7C4182.9,20,4251,20,4320,18.3C4388.6,17,4457,13,4526,23.3C4594.3,33,4663,57,4731,66.7C4800,77,4869,73,4903,71.7L4937.1,70L4937.1,100L4902.9,100C4868.6,100,4800,100,4731,100C4662.9,100,4594,100,4526,100C4457.1,100,4389,100,4320,100C4251.4,100,4183,100,4114,100C4045.7,100,3977,100,3909,100C3840,100,3771,100,3703,100C3634.3,100,3566,100,3497,100C3428.6,100,3360,100,3291,100C3222.9,100,3154,100,3086,100C3017.1,100,2949,100,2880,100C2811.4,100,2743,100,2674,100C2605.7,100,2537,100,2469,100C2400,100,2331,100,2263,100C2194.3,100,2126,100,2057,100C1988.6,100,1920,100,1851,100C1782.9,100,1714,100,1646,100C1577.1,100,1509,100,1440,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z" />

    <div class="row justify-content-center py-5 bg-light bg-opacity-10">
        <div class="col-12">
            <p class="h3 text-center">Follow us on social media!</p>
        </div>
        <div class="col-12">
            <div class="row justify-content-center text-cente mt-2">
                <!-- Socials -->
                {#if settings.discord}
                    <div class="col-auto">
                        <a href="{settings.discord}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="discord" />
                        </a>
                    </div>
                {/if}
                {#if settings.twitter}
                    <div class="col-auto">
                        <a href="{settings.twitter}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="twitter" />
                        </a>
                    </div>
                {/if}
                {#if settings.instagram}
                    <div class="col-auto">
                        <a href="{settings.instagram}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="instagram" />
                        </a>
                    </div>
                {/if}
                {#if settings.facebook}
                    <div class="col-auto">
                        <a href="{settings.facebook}" target="_blank" class="link-light text-decoration-none">
                            <SocialIcons network="facebook" />
                        </a>
                    </div>
                {/if}
            </div>
        </div>
    </div>

    <SVGWave fill="#3c1d34" rotation="180" data="M0,0L34.3,0C68.6,0,137,0,206,10C274.3,20,343,40,411,43.3C480,47,549,33,617,23.3C685.7,13,754,7,823,8.3C891.4,10,960,20,1029,28.3C1097.1,37,1166,43,1234,38.3C1302.9,33,1371,17,1440,10C1508.6,3,1577,7,1646,11.7C1714.3,17,1783,23,1851,26.7C1920,30,1989,30,2057,36.7C2125.7,43,2194,57,2263,61.7C2331.4,67,2400,63,2469,63.3C2537.1,63,2606,67,2674,61.7C2742.9,57,2811,43,2880,45C2948.6,47,3017,63,3086,63.3C3154.3,63,3223,47,3291,43.3C3360,40,3429,50,3497,53.3C3565.7,57,3634,53,3703,43.3C3771.4,33,3840,17,3909,11.7C3977.1,7,4046,13,4114,16.7C4182.9,20,4251,20,4320,18.3C4388.6,17,4457,13,4526,23.3C4594.3,33,4663,57,4731,66.7C4800,77,4869,73,4903,71.7L4937.1,70L4937.1,100L4902.9,100C4868.6,100,4800,100,4731,100C4662.9,100,4594,100,4526,100C4457.1,100,4389,100,4320,100C4251.4,100,4183,100,4114,100C4045.7,100,3977,100,3909,100C3840,100,3771,100,3703,100C3634.3,100,3566,100,3497,100C3428.6,100,3360,100,3291,100C3222.9,100,3154,100,3086,100C3017.1,100,2949,100,2880,100C2811.4,100,2743,100,2674,100C2605.7,100,2537,100,2469,100C2400,100,2331,100,2263,100C2194.3,100,2126,100,2057,100C1988.6,100,1920,100,1851,100C1782.9,100,1714,100,1646,100C1577.1,100,1509,100,1440,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z" />
</div>