<script>
    import SocialIcons from "@rodneylab/svelte-social-icons";
    import Seo from "sk-seo";
    import {deserialize} from "$app/forms";
    import {toast} from "svelte-sonner";
    import {invalidateAll} from "$app/navigation";
    import {RotateCcw, Save, Share2} from "lucide-svelte";


    export let data;
    let { settings } = data;
    $: ({ settings } = data);

    let isActionActive = false;

    async function handleSave(e){
        e.preventDefault();
        if (isActionActive) return;

        isActionActive = true;

        const formData = new FormData(e.target);

        toast.info("Saving...");

        const response = await fetch("?/save", {
            method: "POST",
            body: formData
        });

        const result = deserialize(await response.text());
        if (result.type === 'success') {
            if (result.data.status === 200 || result.data.status === 303) {
                toast.success(result.data.body.message);
                await invalidateAll();
            } else {
                toast.error(result.data.body.message);
            }
        } else {
            toast.error("Something went wrong...");
        }

        isActionActive = false;
    }

    const sizeSocials = 24;
    const sizeShare = 30;
</script>

<Seo
        title="Settings"
        description="Admin settings"
        index={false}
/>

<div class="container">
    <div class="row mt-3">
        <div class="col">
            <p class="h1 text-center">Settings</p>
        </div>
    </div>
    <!-- Settings -->
    <!-- Socials (discord, twitter, instagram, facebook) -->
    <div class="row mt-3">
        <div class="col">
            <p class="h3"><Share2 size={sizeShare}/> Socials</p>
        </div>
    </div>
    <div class="row mt-2 bg-light bg-opacity-10 pt-3 px-1 rounded-4">
        <div class="col">
            <form method="POST" action="?/save" on:submit={handleSave}>
                <div class="mb-3">
                    <label for="discord" class="form-label"><SocialIcons network="discord" width={sizeSocials} height={sizeSocials} /> Discord</label>
                    <input type="url" class="form-control" id="discord" name="discord" value="{settings.discord}">
                </div>
                <div class="mb-3">
                    <label for="twitter" class="form-label"><SocialIcons network="twitter" width={sizeSocials} height={sizeSocials} /> Twitter</label>
                    <input type="url" class="form-control" id="twitter" name="twitter" value="{settings.twitter}">
                </div>
                <div class="mb-3">
                    <label for="instagram" class="form-label"> <SocialIcons network="instagram" width={sizeSocials} height={sizeSocials} /> Instagram</label>
                    <input type="url" class="form-control" id="instagram" name="instagram" value="{settings.instagram}">
                </div>
                <div class="mb-3">
                    <label for="facebook" class="form-label"><SocialIcons network="facebook" width={sizeSocials} height={sizeSocials} /> Facebook</label>
                    <input type="url" class="form-control" id="facebook" name="facebook" value="{settings.facebook}">
                </div>
                <!-- Reset and Save buttons -->
                <div class="mb-3">
                    <button type="reset" class="btn btn-danger"><RotateCcw /> Reset</button>
                    <button type="submit" class="btn btn-primary"><Save /> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
</style>