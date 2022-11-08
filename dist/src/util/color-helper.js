var ColorHelper = /** @class */ (function () {
    function ColorHelper() {
    }
    ColorHelper.colorAsString = function (color) {
        return 'rgba('
            + color.r
            + ','
            + color.g
            + ','
            + color.b
            + ','
            + (color.a / 255)
            + ')';
    };
    return ColorHelper;
}());
export { ColorHelper };
//# sourceMappingURL=color-helper.js.map