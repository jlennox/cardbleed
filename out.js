"use strict";
class UserFileInput {
    constructor(target, loaded) {
        target.addEventListener("dragover", (event) => {
            event.stopPropagation();
            event.preventDefault();
        });
        target.addEventListener("dragleave", (event) => {
            event.stopPropagation();
            event.preventDefault();
        });
        target.addEventListener("drop", (event) => {
            event.preventDefault();
            for (const file of event.dataTransfer.files) {
                const reader = new FileReader();
                reader.addEventListener("loadend", (_loadEvent) => {
                    loaded(reader.result);
                });
                reader.readAsDataURL(file);
            }
        });
    }
}
class Configuration {
    percentage;
    constructor(percentage) {
        this.percentage = percentage;
    }
}
class View {
    percentageInput;
    constructor(parent) {
        this.percentageInput = parent.querySelector(".percentageInput");
    }
    getConfiguration() {
        return new Configuration(14.4); //parseFloat(this.percentageInput.value));
    }
}
const view = new View(document.body);
const input = new UserFileInput(document.body, (userFile) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = userFile;
    image.addEventListener("load", () => {
        const config = view.getConfiguration();
        const growthX = image.width * (config.percentage / 100);
        const growthY = image.height * (config.percentage / 100);
        canvas.width = image.width + growthX;
        canvas.height = image.height + growthY;
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, growthX / 2, growthY / 2);
    });
    document.body.appendChild(canvas);
});
