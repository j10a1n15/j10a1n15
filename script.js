document.getElementById('createZip').addEventListener('click', async function () {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a PNG file.');
        return;
    }

    const file = fileInput.files[0];

    const fileReader = new FileReader();

    fileReader.onload = function (event) {
        const zip = new JSZip();

        // Add the custom pack.mcmeta to the zip
        const packMeta = `{
  "pack": {
    "pack_format": 1,
    "description": "§eSkyHanni Custom Scoreboard Background"
  }
}`;
        zip.file("pack.mcmeta", packMeta);

        // Create assets directory structure and add the selected PNG, renaming it to scoreboard.png
        const assetsFolder = zip.folder("assets");
        const skyhanniFolder = assetsFolder.folder("skyhanni");
        skyhanniFolder.file("scoreboard.png", event.target.result.split(',')[1], { base64: true });

        // Generate the zip and trigger download
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = 'custom_pack.zip';
                a.click();
            });
    };

    fileReader.readAsDataURL(file);
});
