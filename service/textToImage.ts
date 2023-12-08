import { UltimateTextToImage} from "ultimate-text-to-image";
import { Options } from "@/types/style-options"

class TextToImage {

    getDefaultOptions() {
        return {
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
            autoWrapLineHeight: 80
        }
    }

    render(text: string, options: Options) {
        return new UltimateTextToImage(text, options).render().toDataUrl()
    }
}

export default new TextToImage();