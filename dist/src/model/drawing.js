import app from '../index';
var Drawing = /** @class */ (function () {
    function Drawing() {
        this.figures = [];
        this.modified = false;
        this.name = null;
    }
    // polymorphism in action
    Drawing.prototype.paint = function (ctx) {
        this.figures.forEach(function (f) { return f.paint(ctx); });
    };
    // TODO: delete this
    Drawing.prototype.addTestFigures = function () {
    };
    Drawing.prototype.selectAll = function () {
        this.figures.forEach(function (f) { return f.selected = true; });
    };
    // NEW
    Drawing.prototype.select = function (evDown, evUp) {
        this.figures.forEach(function (f) { return f.select(evDown, evUp); });
        // TODO: something selected?
        app.repaint();
    };
    Drawing.prototype.addFigure = function (f) {
        f.selected = true;
        this.figures
            .push(f);
        app.repaint();
    };
    return Drawing;
}());
export { Drawing };
//# sourceMappingURL=drawing.js.map