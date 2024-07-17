<script>
    import {deserialize} from "$app/forms";
    import {goto} from "$app/navigation";

    let loginActive = false;
    let statusMessage = "";
    let statusMessageSuccess = false;
    async function handleLogin(e){
        e.preventDefault();

        if (loginActive) return;

        loginActive = true;

        const formData = new FormData(e.target);

        statusMessage = "Logging in...";
        statusMessageSuccess = true;

        const response = await fetch("?/login", {
            method: "POST",
            body: formData
        });

        const result = deserialize(await response.text());
        if (result.type === 'success'){
            if (result.data.status === 200 || result.data.status === 303){
                statusMessage = result.data.body.message;
                statusMessageSuccess = true;
                await goto(result.data.body.location);
            } else {
                statusMessage = result.data.body.message;
                statusMessageSuccess = false;
            }
        } else {
            statusMessage = "Something went wrong...";
            statusMessageSuccess = false;
        }

        loginActive = false;
    }
</script>

<!-- Login Page -->
<div class="container">
    <div class="row text-center justify-content-center mt-5">
        <div class="col">
            <p class="h1">Admin Login</p>
        </div>
    </div>
    <div class="row justify-content-center mt-4">
        <div class="col-10 col-xl-6 bg-light bg-opacity-10 rounded-5 p-4">
            <form method="POST" action="?/login" on:submit={handleLogin}>
                <div class="mb-3">
                    <label for="username" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email" name="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-lg btn-outline-warning bg-light bg-opacity-10 w-100">Login</button>
                {#if statusMessage && statusMessage !== ""}
                    <div class="alert {statusMessageSuccess ? 'alert-success' : 'alert-danger'} mt-3 mb-0" role="alert">
                        {statusMessage}
                    </div>
                {/if}
            </form>
        </div>
    </div>
</div>

<style>
    .btn-outline-warning {
        border: 1px solid transparent;
        color: #fff;
        transition: all 0.3s;
    }

    .btn-outline-warning:hover {
        border: 1px solid var(--accent-color);
        color: var(--accent-color);
        background: rgba(255, 255, 255, 0.15) !important;
    }
</style>