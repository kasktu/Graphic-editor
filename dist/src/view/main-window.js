import { App } from '../controller/app';
var MainWindow = /** @class */ (function () {
    function MainWindow() {
        this.canvas = new Canvas();
    }
    // NEW
    MainWindow.prototype.init = function () {
        this.canvas
            .init();
    };
    MainWindow.prototype.repaint = function () {
        this.canvas
            .repaint();
    };
    return MainWindow;
}());
export { MainWindow };
// module private -----------------------------------------------------------
import { EllipseCreationTool } from './ellipse-creation-tool';
import { RecgtangleCreationTool } from './rect-creation-tool';
import { LineCreationTool } from './line-creation-tool';
import { SelectionTool } from './selection-tool';
var Canvas = /** @class */ (function () {
    function Canvas() {
        // NEW -----------------------------------
        this.tools = [];
        this.htmlElement = document.createElement('canvas');
        document.body
            .appendChild(this.htmlElement);
        this.htmlElement.width = Canvas.PAGE_WIDTH;
        this.htmlElement.height = Canvas.PAGE_HEIGHT;
        this.htmlElement.style.backgroundColor = '#FAFAFA';
        this.ctx = this.htmlElement
            .getContext('2d');
    }
    Canvas.prototype.init = function () {
        // NEW
        this.buildTools();
        this.setActiveTool(Canvas.ELLI_CREATION);
        // TODO: register for mouse events
        // down, up, move, drag, doubleclick
        // enter, exit
        window.addEventListener('mousedown', this.handleMouseDown
            .bind(this));
        window.addEventListener('mouseup', this.handleMouseUp
            .bind(this));
    };
    Canvas.prototype.setActiveTool = function (t) {
        this.activeTool = this.tools[t];
    };
    Canvas.prototype.getContext = function () {
        return this.ctx;
    };
    Object.defineProperty(Canvas.prototype, "width", {
        get: function () {
            return this.htmlElement.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "height", {
        get: function () {
            return this.htmlElement.height;
        },
        enumerable: false,
        configurable: true
    });
    Canvas.prototype.repaint = function () {
        this.drawGrid(this.ctx);
        App.getInstance()
            .paint(this.ctx);
    };
    // private methods ------------------------------------------------------
    Canvas.prototype.clear = function (ctx) {
        ctx.fillStyle = '#FAFAFA';
        ctx.fillRect(0, 0, this.width, this.height);
    };
    Canvas.prototype.drawGrid = function (ctx) {
        if (ctx) {
            this.clear(ctx);
            ctx.lineWidth = 1;
            ctx.strokeStyle = Canvas.GRID_COLOR;
            // TODO: use document size
            var numVerticals = this.width / Canvas.GRID_SIZE;
            var numHorizontals = this.height / Canvas.GRID_SIZE;
            // verticals
            for (var v = 1; v < numVerticals; v++) {
                ctx.beginPath();
                ctx.moveTo(v * Canvas.GRID_SIZE, 0);
                ctx.lineTo(v * Canvas.GRID_SIZE, Canvas.PAGE_HEIGHT);
                ctx.stroke();
            }
            // horizontals
            for (var h = 1; h < numHorizontals; h++) {
                ctx.beginPath();
                ctx.moveTo(0, h * Canvas.GRID_SIZE);
                ctx.lineTo(Canvas.PAGE_WIDTH, h * Canvas.GRID_SIZE);
                ctx.stroke();
            }
        }
    };
    // NEW  // TODO: add remaining tools
    Canvas.prototype.buildTools = function () {
        this.tools[Canvas.LINE_CREATION] = new LineCreationTool();
        this.tools[Canvas.RECT_CREATION] = new RecgtangleCreationTool();
        this.tools[Canvas.ELLI_CREATION] = new EllipseCreationTool();
        // this.tools[ Canvas.TEXT_CREATION ] = new TextCreationTool();
        this.tools[Canvas.SELECTION] = new SelectionTool();
    };
    // State Pattern
    Canvas.prototype.handleMouseDown = function (ev) {
        this.activeTool
            .onMouseDown(ev);
    };
    // State Pattern
    Canvas.prototype.handleMouseUp = function (ev) {
        this.activeTool
            .onMouseUp(ev);
    };
    Canvas.LINE_CREATION = 0;
    Canvas.RECT_CREATION = 1;
    Canvas.ELLI_CREATION = 2;
    Canvas.TEXT_CREATION = 3;
    Canvas.SELECTION = 4;
    // NEW -----------------------------------
    Canvas.PAGE_WIDTH = 2000;
    Canvas.PAGE_HEIGHT = 2000;
    Canvas.GRID_SIZE = 100;
    Canvas.GRID_COLOR = '#DDD0DD';
    return Canvas;
}());
//# sourceMappingURL=main-window.js.map