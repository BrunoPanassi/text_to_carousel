import { UltimateTextToImage} from "ultimate-text-to-image";
import { Options } from "@/types/style-options"

class TextToImage {

    getDefaultOptions(
        backgroundColor: string, 
        fontFamily: string,
        fontSize: number,
        fontColor: string,
        align: string) {
        return {
            width: 1000,
            height: 1000,
            maxWidth: 1000,
            maxHeight: 1000,
            fontFamily: fontFamily,
            fontColor: fontColor,
            fontSize: fontSize,
            minFontSize: 10,
            lineHeight: 50,
            margin: 20,
            marginBottom: 40,
            align: align,
            valign: "middle",
            backgroundColor: backgroundColor,
            autoWrapLineHeight: 80
        }
    }

    render(text: string, options: Options) {
        return new UltimateTextToImage(text, options).render().toDataUrl()
    }
}

export default new TextToImage();