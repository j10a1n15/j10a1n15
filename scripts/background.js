const button = document.getElementById('createZip');
const fileInput = document.getElementById('fileInput');
const resetPreviewButton = document.getElementById('resetPreview');
const preview = document.getElementById('preview');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');

const packMeta = JSON.stringify({
    pack: {
        pack_format: 1,
        description: "§eSkyHanni Custom Scoreboard Background"
    }
}, null, 2);

const packLogo = "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"

button.addEventListener('click', () => {
    if (fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (event) => {

        if (file.type !== "image/png") {
            const img = new Image()
            img.src = event.target.result;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                generateZip(canvas.toDataURL('image/png'));
            }
        } else generateZip(event.target.result);
    };

    fileReader.readAsDataURL(file);
});

const generateZip = function (scoreboardImage) {
    const zip = new JSZip();
    zip.file("pack.mcmeta", packMeta);
    zip.file("pack.png", packLogo, {base64: true});

    // Create assets directory structure and add the selected PNG
    const assetsFolder = zip.folder("assets");
    const skyhanniFolder = assetsFolder.folder("skyhanni");
    skyhanniFolder.file("scoreboard.png", scoreboardImage.split(',')[1], {base64: true});

    // Generate the zip and trigger download
    zip.generateAsync({type: "blob"})
        .then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'SkyHanni Scoreboard Background.zip';
            a.click();
        });
}

fileInput.addEventListener('change', () => {
    const fileList = fileInput.files;
    if (!fileList[0].type.startsWith("image/")) {
        alert("Please select an image file.");
        return
    }
    if (fileList.length === 0) {
        button.style.display = "none";
        preview.style.display = "none";
    } else {
        button.style.display = "block";
        preview.style.display = "block";
        previewImage.src = URL.createObjectURL(fileList[0]);
    }
});

document.getElementById('instructions').addEventListener('click', function () {
    this.classList.toggle('active');
});

resetPreviewButton.addEventListener('click', () => {
    previewContainer.style.width = "275px";
    previewContainer.style.height = "500px";
});

previewContainer.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = previewContainer.offsetWidth;
    const startHeight = previewContainer.offsetHeight;

    const doDrag = (e) => {
        const newWidth = startWidth - (e.clientX - startX);
        const newHeight = startHeight - (e.clientY - startY);

        previewContainer.style.width = `${newWidth}px`;
        previewContainer.style.height = `${newHeight}px`;
        previewImage.style.width = "100%";
        previewImage.style.height = "100%";
    };

    const stopDrag = () => {
        document.removeEventListener("mousemove", doDrag, false);
        document.removeEventListener("mouseup", stopDrag, false);
    };

    document.addEventListener("mousemove", doDrag, false);
    document.addEventListener("mouseup", stopDrag, false);

    e.preventDefault();
});