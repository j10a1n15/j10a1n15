const button = document.getElementById('createZip');
const fileInput = document.getElementById('fileInput');

const packMeta = `{
    "pack": {
        "pack_format": 1,
        "description": "§eSkyHanni Custom Scoreboard Background"
    }
}`;

button.addEventListener('click', async function () {
    if (fileInput.files.length === 0) {
        alert('Please select a PNG file.');
        return;
    }

    const file = fileInput.files[0];

    const fileReader = new FileReader();

    fileReader.onload = function (event) {
        const zip = new JSZip();

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
                a.download = 'SkyHanni Scoreboard Background.zip';
                a.click();
            });
    };

    fileReader.readAsDataURL(file);
});


fileInput.addEventListener('change', function () {
    if (fileInput.files.length === 0) {
        button.style.display = "none";
    } else {
        button.style.display = "block";
    }
});

document.getElementById('howto').addEventListener('click', function () {
    this.classList.toggle('active');
});
