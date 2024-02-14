type Options = {
    [index: string]: string | number | boolean | Array<Object>;
    width: number;
    height: number;
    maxWidth: number;
    maxHeight: number;
    fontFamily: string;
    fontColor: string;
    fontSize: number;
    minFontSize: number;
    lineHeight: number;
    margin: number;
    marginTop: number;
    marginLeft: number;
    marginRight: number;
    marginBottom: number;
    align: string,
    valign: string,
    backgroundColor: string,
    underlineSize: number,
    autoWrapLineHeight: number;
    fontWeight: boolean;
    fontStyle: boolean;
    images: Array<any>;
}

export { Options }