import { UltimateTextToImage} from "ultimate-text-to-image";

class TextToImage {

    options = {
        width: 1000,
        height: 1000,
        maxWidth: 1000,
        maxHeight: 1000,
        fontFamily: "Arial",
        fontColor: "#FFFFFF",
        fontSize: 72,
        minFontSize: 10,
        lineHeight: 50,
        margin: 20,
        marginBottom: 40,
        align: "center",
        valign: "middle",
        backgroundColor: "#000000",
        underlineSize: 2,
        autoWrapLineHeight: 80
    };

    getOptions() {
        return this.options;
    }

    render(text: string) {
        return new UltimateTextToImage(text, this.getOptions()).render().toDataUrl()
    }
}

export default new TextToImage();