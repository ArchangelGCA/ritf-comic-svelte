<script>
    export let data = "000 000"; // Shape of the wave
    export let rotation = 0;

    export let fill = "red";
    export let classes = "";

    $: rotation = parseInt(rotation);
    $: height = parseInt(height);
</script>

<div class="row {classes}">
    <div class="col px-0">
        <svg id="wave" style="transform:rotate({rotation}deg);" viewBox="0 0 1440 94"
             xmlns="http://www.w3.org/2000/svg" {fill}>
            <path fill-opacity="1"
                  d="{data}"></path>
        </svg>
    </div>
</div>
