<script>
    export let data;
    let { comics, page } = data;
    $: ({ comics, page } = data);
</script>