const button = document.getElementById('createZip');
const fileInput = document.getElementById('fileInput');

const preview = document.getElementById('preview');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');

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
        preview.style.display = "none";
    } else {
        button.style.display = "block";
        preview.style.display = "block";
        previewContainer.style.width = "275px";
        previewContainer.style.height = "500px";
        previewImage.src = URL.createObjectURL(fileInput.files[0]);
    }
});

document.getElementById('howto').addEventListener('click', function () {
    this.classList.toggle('active');
});

previewContainer.addEventListener("mousedown", function (e) {
    const startX = e.clientX;
    const startY = e.clientY;

    const startWidth = previewContainer.offsetWidth;
    const startHeight = previewContainer.offsetHeight;

    function doDrag(e) {
        const newWidth = startWidth - (e.clientX - startX);
        const newHeight = startHeight - (e.clientY - startY);

        previewContainer.style.width = newWidth + "px";
        previewContainer.style.height = newHeight + "px";
        previewImage.style.width = "100%";
        previewImage.style.height = "100%";
    }

    function stopDrag() {
        document.removeEventListener("mousemove", doDrag, false);
        document.removeEventListener("mouseup", stopDrag, false);
    }

    document.addEventListener("mousemove", doDrag, false);
    document.addEventListener("mouseup", stopDrag, false);

    e.preventDefault();
}, false);