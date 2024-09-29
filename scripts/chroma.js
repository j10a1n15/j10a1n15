document.addEventListener("DOMContentLoaded", function () {
    let colors = [];
    let maxSaturation = false;
    let interpolation = 0;
    let hues = [];
    let saturations = [];
    let brightnesses = [];

    const packMeta = JSON.stringify({
        pack: {
            pack_format: 1,
            description: "§ZSkyhanni Chroma in bisexual, by nea89/lrg89 and j10a1n15"
        }
    }, null, 2);

    const texturedShaderText = textured_chroma;
    const standardShaderText = standard_chroma;

    function updateShaderContent(shaderText, hues, saturations, brightnesses, maxSaturation, interpolation) {
        let newLines = [];
        let isSkipping = false;
        let lines = shaderText.split("\n");

        for (let line of lines) {
            if (line === "// FLAG_BEGIN") {
                isSkipping = true;
            } else if (line === "// FLAG_END") {
                newLines.push(`#define HUE_INIT (${hues.join(",")})`);
                newLines.push(`#define SATURATION_INIT (${saturations.join(",")})`);
                newLines.push(`#define BRIGHTNESS_INIT (${brightnesses.join(",")})`);
                newLines.push(`#define FLAG_SIZE ${hues.length}`);
                newLines.push(`#define MAX_SATURATION ${maxSaturation ? "true" : "false"}`);
                newLines.push(`#define INTERPOLATION_LEVEL ${interpolation}`);
                isSkipping = false;
            } else if (!isSkipping) {
                newLines.push(line);
            }
        }
        return newLines.join("\n");
    }

    document.getElementById("addColor").addEventListener("click", function () {
        let colorInput = document.getElementById("colorInput").value.trim();

        if (!colorInput.startsWith("#")) {
            alert("Invalid color. Use a hex code like #abcdef");
            return;
        }

        let rgb = hexToRgb(colorInput);
        colors.push(rgb);
        updateColorInfo(rgb);
    });

    function updateColorInfo(color) {
        let [r, g, b] = color;
        let [h, s, v] = rgbToHsv(r, g, b);
        hues.push(h);
        saturations.push(s);
        brightnesses.push(v);

        let colorInfo = document.getElementById("colorInfo");
        let newColorInfo = document.createElement("p");
        newColorInfo.textContent = `Color added: RGB(${r * 255}, ${g * 255}, ${b * 255})`;
        colorInfo.appendChild(newColorInfo);
    }

    document.getElementById("setMaxSaturation").addEventListener("click", function () {
        maxSaturation = !maxSaturation;
        let saturationInfo = document.getElementById("saturationInfo");
        saturationInfo.textContent = `Max Saturation: ${maxSaturation ? "Enabled" : "Disabled"}`;
    });

    document.getElementById("setInterpolation").addEventListener("click", function () {
        interpolation = parseInt(document.getElementById("interpolationLevel").value);
    });

    document.getElementById("generateShaders").addEventListener("click", async function () {
        let updatedTexturedShader = updateShaderContent(texturedShaderText, hues, saturations, brightnesses, maxSaturation, interpolation);
        let updatedStandardShader = updateShaderContent(standardShaderText, hues, saturations, brightnesses, maxSaturation, interpolation);

        const zip = new JSZip();

        zip.file("pack.mcmeta", packMeta);

        const assetsFolder = zip.folder("assets");
        const skyhanniFolder = assetsFolder.folder("skyhanni");
        const shaderFolder = skyhanniFolder.folder("shaders");
        shaderFolder.file("standard_chroma.fsh", updatedStandardShader);
        shaderFolder.file("textured_chroma.fsh", updatedTexturedShader);

        zip.generateAsync({type: "blob"})
            .then((content) => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = 'SkyHanni Custom Chroma.zip';
                a.click();
            });
    });

    document.getElementById('instructions').addEventListener('click', function () {
        this.classList.toggle('active');
    });
});
