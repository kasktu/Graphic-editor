export class ColorHelper {
    static colorAsString(color) {
        return 'rgba('
            + color.r
            + ','
            + color.g
            + ','
            + color.b
            + ','
            + (color.a / 255)
            + ')';
    }
}
//# sourceMappingURL=color-helper.js.map