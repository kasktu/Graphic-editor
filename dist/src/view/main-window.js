import { App } from '../controller/app';
import { MenuHelper } from './menu-helper';
export class MainWindow {
    constructor() {
        this.menu = new MenuHelper();
        this.canvas = new DrawingCanvas();
        this.feedback = new FeedbackCanvas();
    }
    paste() {
        let figures = app.getCopiedFigures();
        figures.forEach((f) => { this.feedback.createFigure(f); });
    }
    onDrawingChange(ev) {
        this.canvas.repaint();
    }
    getActiveTool() {
        return this.feedback.getActiveTool();
    }
    init() {
        const app = App.getInstance();
        this.menu
            .init();
        this.canvas
            .init();
        this.feedback
            .init();
        this.setActiveTool(LINE_CREATION);
        app.addListener(this);
    }
    getContext() {
        return this.canvas
            .getContext();
    }
    getFeedback() {
        return this.feedback
            .getContext();
    }
    clearFeedback() {
        this.feedback
            .clear();
    }
    setCursor(cursor) {
        this.feedback
            .setCursor(cursor);
    }
    // NEW
    setActiveTool(t) {
        this.feedback
            .setActiveTool(t);
    }
}
// module private -----------------------------------------------------------
class Canvas {
    constructor() {
        this.htmlElement = document.createElement('canvas');
        this.htmlElement.width = Canvas.PAGE_WIDTH;
        this.htmlElement.height = Canvas.PAGE_HEIGHT;
        this.htmlElement.style.position = 'absolute';
        this.htmlElement.style.left = '0';
        this.htmlElement.style.top = '28px';
        this.htmlElement.style.width = `${Canvas.PAGE_WIDTH}px`;
        this.htmlElement.style.height = `${Canvas.PAGE_HEIGHT}px`;
        const content = document.getElementById('content');
        content.style.position = 'fixed';
        content.style.left = '0';
        content.style.top = '0';
        content.style.width = `${Canvas.PAGE_WIDTH}px`;
        content.style.height = `${Canvas.PAGE_HEIGHT}px`;
        content.appendChild(this.htmlElement);
        this.ctx = this.htmlElement
            .getContext('2d');
    }
    getContext() {
        return this.ctx;
    }
    get width() {
        return this.htmlElement.width;
    }
    get height() {
        return this.htmlElement.height;
    }
}
Canvas.PAGE_WIDTH = 2000;
Canvas.PAGE_HEIGHT = 2000;
class DrawingCanvas extends Canvas {
    constructor() {
        super();
    }
    onDrawingChange(ev) {
        if (ev != DrawingEvent.SAVE) {
            this.repaint();
        }
    }
    init() {
        const app = App.getInstance();
        this.htmlElement.style.backgroundColor = '#FAFAFA';
        app.addListener(this);
    }
    repaint() {
        this.drawGrid(this.ctx);
        App.getInstance()
            .paint(this.ctx);
    }
    // private methods ------------------------------------------------------
    clear(ctx) {
        ctx.fillStyle = this.htmlElement.style.backgroundColor;
        ctx.fillRect(0, 0, this.width, this.height);
    }
    drawGrid(ctx) {
        if (ctx) {
            this.clear(ctx);
            ctx.lineWidth = 1;
            ctx.strokeStyle = DrawingCanvas.GRID_COLOR;
            // TODO: use document size
            const numVerticals = this.width / DrawingCanvas.GRID_SIZE;
            const numHorizontals = this.height / DrawingCanvas.GRID_SIZE;
            // verticals
            for (let v = 1; v < numVerticals; v++) {
                ctx.beginPath();
                ctx.moveTo(v * DrawingCanvas.GRID_SIZE, 0);
                ctx.lineTo(v * DrawingCanvas.GRID_SIZE, Canvas.PAGE_HEIGHT);
                ctx.stroke();
            }
            // horizontals
            for (let h = 1; h < numHorizontals; h++) {
                ctx.beginPath();
                ctx.moveTo(0, h * DrawingCanvas.GRID_SIZE);
                ctx.lineTo(Canvas.PAGE_WIDTH, h * DrawingCanvas.GRID_SIZE);
                ctx.stroke();
            }
        }
    }
}
DrawingCanvas.GRID_SIZE = 100;
DrawingCanvas.GRID_COLOR = '#DDD0DD';
import { LineCreationTool } from './line-creation-tool';
import { RectCreationTool } from './rectangle-creation-tool';
import { ElliCreationTool } from './ellipse-creation-tool';
import { TextCreationTool } from './text-creation-tool';
import { SelectionTool } from './selection-tool';
import { DrawingEvent } from '../model/drawing-listeners';
import app from '../index';
// NEW
export const LINE_CREATION = 0;
export const RECT_CREATION = 1;
export const ELLI_CREATION = 2;
export const TEXT_CREATION = 3;
export const SELECTION = 4;
class FeedbackCanvas extends Canvas {
    constructor() {
        super();
        this.create = false;
        this.tools = [];
    }
    createFigure(f) {
        this.figure = f;
        this.create = true;
    }
    getActiveTool() {
        return this.activeTool.getName.toString();
    }
    init() {
        this.buildTools();
        // NEW
        // TODO: register for mouse events
        // down, up, move, drag, doubleclick
        // enter, exit
        this.htmlElement.addEventListener('mousedown', this.handleMouseDown
            .bind(this));
        this.htmlElement.addEventListener('mouseup', this.handleMouseUp
            .bind(this));
        this.htmlElement.addEventListener('mouseup', this.pasteMouse
            .bind(this));
        // NEW
        this.htmlElement.addEventListener('mousemove', this.handleMouseMove
            .bind(this));
        // NEW
        window.addEventListener('keydown', this.handleKeyPressed
            .bind(this));
    }
    setActiveTool(t) {
        console.log(`TOOL => ${t}`);
        this.activeTool = this.tools[t];
        App.getInstance()
            .setDocumentTitle('', this.activeTool
            .getName());
    }
    clear() {
        const ctx = this.getContext();
        this.ctx
            .clearRect(0, 0, this.width, this.height);
    }
    // NEW
    setCursor(cursor) {
        this.htmlElement
            .style
            .cursor = cursor;
    }
    // private methods ------------------------------------------------------
    // TODO: add remaining tools
    buildTools() {
        this.tools[LINE_CREATION] = new LineCreationTool();
        this.tools[RECT_CREATION] = new RectCreationTool();
        this.tools[ELLI_CREATION] = new ElliCreationTool();
        this.tools[TEXT_CREATION] = new TextCreationTool();
        this.tools[SELECTION] = new SelectionTool();
    }
    // State Pattern
    handleMouseDown(ev) {
        if (ev.y > 28) {
            this.activeTool
                .onMouseDown(ev);
        }
    }
    pasteMouse(ev) {
        if (ev.y > 28) {
            this.activeTool
                .onMouseMove(ev, this.figure);
        }
    }
    // State Pattern
    handleMouseUp(ev) {
        this.activeTool
            .onMouseUp(ev);
    }
    handleMouseMove(ev) {
        this.activeTool
            .onMouseMove(ev);
    }
    handleKeyPressed(ke) {
        console.log(ke.code);
        if (ke.ctrlKey) {
            ke.preventDefault();
            if (ke.code == 'KeyS') {
                app.save();
            }
            else if (ke.code == 'KeyH') {
                app.group();
            }
        }
        else if (ke.code === 'KeyL') {
            this.setActiveTool(LINE_CREATION);
        }
        else if (ke.code === 'KeyR') {
            this.setActiveTool(RECT_CREATION);
        }
        else if (ke.code === 'KeyE') {
            this.setActiveTool(ELLI_CREATION);
        }
        else if (ke.code === 'KeyT') {
            this.setActiveTool(TEXT_CREATION);
        }
        else if (ke.code === 'KeyS') {
            this.setActiveTool(SELECTION);
        }
    }
}
//# sourceMappingURL=main-window.js.map