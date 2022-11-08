import { Drawing } from '../model/drawing';
import { MainWindow } from '../view/main-window';
// Singleton => Immutable
var App = /** @class */ (function () {
    function App() {
        this.drawing = new Drawing();
        this.mainWindow = new MainWindow();
        document.title = 'Graphics Editor v0.6';
    }
    // lazy initialization (preferred)
    App.getInstance = function () {
        if (App.instance) {
            // NOOP
        }
        else {
            App.instance = new App();
        }
        return App.instance;
    };
    App.prototype.run = function () {
        this.drawing // TODO: remove
            .addTestFigures();
        this.mainWindow
            .init();
        this.repaint();
    };
    // from model to view 
    App.prototype.repaint = function () {
        this.mainWindow
            .repaint();
    };
    // from view to model
    App.prototype.paint = function (ctx) {
        this.drawing
            .paint(ctx);
    };
    App.prototype.select = function (evDown, evUp) {
        this.drawing
            .select(evDown, evUp);
    };
    // NEW
    App.prototype.addFigure = function (f) {
        this.drawing
            .addFigure(f);
    };
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map