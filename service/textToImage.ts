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

    getInitialOptions(backgroundColor = "#141414") {
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
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 40,
            align: "center",
            valign: "middle",
            backgroundColor: backgroundColor,
            autoWrapLineHeight: 80,
            fontWeight: false,
            fontStyle: false
        } as Options
    }

    getStyleOptions(options: Options) {
        const backgroundColor = options.backgroundColor ?? "#141414"
        const fontColor = options.fontColor ?? "#FFFFFF"
        const fontFamily = options.fontFamily ?? "Arial"
        const fontSize = options.fontSize ?? 72
        const align = options.align ?? "center"
        const valign = options.valign ?? "middle"
        const bold = options.bold ?? false
        const italic = options.italic ?? false
        const marginTop = options.marginTop
        const marginLeft = options.marginLeft
        const marginRight = options.marginRight
        const marginBottom = options.marginBottom
        const images = options.images ?? []
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
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginBottom: marginBottom,
            align:align,
            valign: valign,
            backgroundColor: backgroundColor,
            underlineSize: 0,
            autoWrapLineHeight: 80,
            fontWeight: bold,
            fontStyle: italic,
            images: images } as Options
    }

    render(text: string, options: Options) {
        return new UltimateTextToImage(text, options).render().toDataUrl()
    }

    new(text: string, options: Options) {
        return new UltimateTextToImage(text, options)
    }
}

export default new TextToImage();