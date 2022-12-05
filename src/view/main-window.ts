import { App } from '../controller/app';

import { MenuHelper } from './menu-helper';

export class MainWindow implements DrawingListener{
    paste() {
        let figures=app.getCopiedFigures()
        figures.forEach((f:Figure)=>{this.feedback.createFigure(f);});
     }

    
    // NEW -------------------------------------------
    private menu: MenuHelper;
    // NEW -------------------------------------------

    private canvas: DrawingCanvas;
    private feedback: FeedbackCanvas;

    constructor() {
        this.menu = new MenuHelper();
        this.canvas = new DrawingCanvas();
        this.feedback = new FeedbackCanvas();
    }
    onDrawingChange(ev: DrawingEvent): void {
            this.canvas.repaint();
    }

    getActiveTool():string{
        return this.feedback.getActiveTool();
    }
    init(): void {
        const app: App = App.getInstance();
        this.menu
            .init();

        this.canvas
            .init();
        this.feedback
            .init();
        this.setActiveTool(LINE_CREATION)   
        app.addListener(
                this
            );
     
    }

    getContext(): CanvasRenderingContext2D {
        return this.canvas
            .getContext();
    }

    getFeedback(): CanvasRenderingContext2D {
        return this.feedback
            .getContext();
    }

    clearFeedback(): void {
        this.feedback
            .clear();
    }

    setCursor(
        cursor: string ): void {
            
        this.feedback
            .setCursor(
                cursor
            );
    }
            
    // NEW
    setActiveTool( 
        t: number ) {

        this.feedback
            .setActiveTool(
                t
            );
    }
}

// module private -----------------------------------------------------------

abstract class Canvas {

    abstract init(): void;
    
    protected htmlElement: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D | null;

    static readonly PAGE_WIDTH: number = 2000;
    static readonly PAGE_HEIGHT: number = 2000;

    constructor() {
        this.htmlElement = document.createElement(
            'canvas'
        );
        this.htmlElement.width = Canvas.PAGE_WIDTH;
        this.htmlElement.height = Canvas.PAGE_HEIGHT;

        this.htmlElement.style.position = 'absolute';
        this.htmlElement.style.left   = '0';
        this.htmlElement.style.top    = '28px';
        this.htmlElement.style.width  = `${Canvas.PAGE_WIDTH}px`;
        this.htmlElement.style.height = `${Canvas.PAGE_HEIGHT}px`;

        const content: HTMLElement = document.getElementById(
            'content'
        );
        content.style.position = 'fixed'; 
        content.style.left = '0'; 
        content.style.top = '0'; 
        content.style.width = `${Canvas.PAGE_WIDTH}px`;
        content.style.height = `${Canvas.PAGE_HEIGHT}px`;

        content.appendChild( 
            this.htmlElement 
        );

        this.ctx = this.htmlElement
            .getContext(
                '2d'
            );
    }



    getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }
    
    get width(): number {
        return this.htmlElement.width;
    }
    
    get height(): number {
        return this.htmlElement.height;
    }
}

class DrawingCanvas 
    extends Canvas implements DrawingListener{

    static readonly GRID_SIZE: number = 100;
    static readonly GRID_COLOR: string = '#DDD0DD';

    constructor() {
        super();
    }
    onDrawingChange(ev: DrawingEvent): void {
        if(ev!=DrawingEvent.SAVE){
            this.repaint();
        }

    }
    init(): void {
        const app: App = App.getInstance();
        this.htmlElement.style.backgroundColor = '#FAFAFA';
        app.addListener(
            this
        );
 
    }

    repaint(): void {
        this.drawGrid(
            this.ctx
        );

        App.getInstance()
            .paint(
                this.ctx
            );
    }
    // private methods ------------------------------------------------------

    private clear(
        ctx: CanvasRenderingContext2D ): void {
        
        ctx.fillStyle = this.htmlElement.style.backgroundColor;
        ctx.fillRect( 0, 0, this.width, this.height );
    }

    private drawGrid(
        ctx: CanvasRenderingContext2D | null ): void {
            
        if ( ctx ) {
            this.clear(
                ctx
            );

            ctx.lineWidth = 1;
            ctx.strokeStyle = DrawingCanvas.GRID_COLOR;

            // TODO: use document size
            const numVerticals: number = this.width / DrawingCanvas.GRID_SIZE;
            const numHorizontals: number = this.height / DrawingCanvas.GRID_SIZE;

            // verticals
            for ( let v: number = 1; v < numVerticals; v++ ) {
                ctx.beginPath();
                ctx.moveTo( 
                    v * DrawingCanvas.GRID_SIZE, 
                    0 
                );
                ctx.lineTo(
                    v * DrawingCanvas.GRID_SIZE, 
                    Canvas.PAGE_HEIGHT 
                );
                ctx.stroke();
            }

            // horizontals
            for ( let h: number = 1; h < numHorizontals; h++ ) {
                ctx.beginPath();
                ctx.moveTo( 
                    0, 
                    h * DrawingCanvas.GRID_SIZE 
                );
                ctx.lineTo(
                    Canvas.PAGE_WIDTH, 
                    h * DrawingCanvas.GRID_SIZE 
                );
                ctx.stroke();
            }
        }
    }
}
import { LineCreationTool } from './line-creation-tool';
import { RectCreationTool } from './rectangle-creation-tool';
import { ElliCreationTool } from './ellipse-creation-tool';
import { TextCreationTool } from './text-creation-tool';
import { SelectionTool } from './selection-tool';
import { Tool } from './tool';
import { DrawingListener } from '../model/drawing';
import { DrawingEvent } from '../model/drawing-listeners';
import app from '../index';
import { Figure } from '../model/figure';

// NEW
export const LINE_CREATION: number = 0;
export const RECT_CREATION: number = 1;
export const ELLI_CREATION: number = 2;
export const TEXT_CREATION: number = 3;
export const SELECTION:     number = 4;

class FeedbackCanvas 
    extends Canvas {
        protected create=false
        protected figure:Figure;
    createFigure(f: Figure) {
        this.figure=f;
        this.create=true;
    }

    private tools: Tool[] = [
    ];
    private activeTool: Tool;

    constructor() {
        super();
    }
    getActiveTool():string{
        return this.activeTool.getName.toString();
    }
    init(): void {

        this.buildTools();
        
        // NEW

        // TODO: register for mouse events
        // down, up, move, drag, doubleclick
        // enter, exit

        this.htmlElement.addEventListener( 
            'mousedown', 
            this.handleMouseDown
                .bind(
                    this
                )
        );

        this.htmlElement.addEventListener( 
            'mouseup', 
            this.handleMouseUp
                .bind(
                    this
                )
        );
        this.htmlElement.addEventListener( 
            'mouseup', 
            this.pasteMouse
                .bind(
                    this
                )
        );

        // NEW
        this.htmlElement.addEventListener( 
            'mousemove', 
            this.handleMouseMove
                .bind(
                    this
                )
        );
        

        // NEW
        window.addEventListener( 
            'keydown', 
            this.handleKeyPressed
                .bind(
                    this
                )
        );
    }

    setActiveTool( 
        t: number ) {

        console.log(
            `TOOL => ${t}`
        );
        this.activeTool = this.tools[
            t
        ];
        
        App.getInstance()
            .setDocumentTitle('',
                this.activeTool
                    .getName()
            );
    }

    clear(): void {
        const ctx: CanvasRenderingContext2D = this.getContext();

        this.ctx
            .clearRect( 
                0, 0, this.width, this.height
            );
    }

    // NEW
    setCursor(
        cursor: string ): void {

        this.htmlElement
            .style
            .cursor = cursor;
    }

    // private methods ------------------------------------------------------

    // TODO: add remaining tools
    private buildTools(): void {

        this.tools[ LINE_CREATION ] = new LineCreationTool();
        this.tools[ RECT_CREATION ] = new RectCreationTool();
        this.tools[ ELLI_CREATION ] = new ElliCreationTool();
        this.tools[ TEXT_CREATION ] = new TextCreationTool();
        
        this.tools[ SELECTION ] = new SelectionTool();
    }

    // State Pattern
    private handleMouseDown(
        ev: MouseEvent ): void {
            if (ev.y>28)
       { this.activeTool
            .onMouseDown(
                ev
            );}
    }
    private pasteMouse(
        ev: MouseEvent ): void {
            if (ev.y>28)
       { this.activeTool
            .onMouseMove(
                ev, this.figure
            );}
    }
    // State Pattern
    private handleMouseUp(
        ev: MouseEvent ): void {
            this.activeTool
            .onMouseUp(
                ev
            );
    }

    private handleMouseMove(
        ev: MouseEvent ): void {

            this.activeTool
            .onMouseMove(
                ev
            );
    }

    private handleKeyPressed(
        ke: KeyboardEvent ): void {
        console.log(ke.code);
        if (ke.ctrlKey){
            ke.preventDefault();  
            if(ke.code=='KeyS'){
                app.save();
            }else if(ke.code=='KeyH'){
                app.group();
            }
        }else if ( ke.code === 'KeyL' ) {
            this.setActiveTool(LINE_CREATION);
        }else if ( ke.code === 'KeyR' ) {
            this.setActiveTool(RECT_CREATION); 
        }else if ( ke.code === 'KeyE' ) {
            this.setActiveTool(ELLI_CREATION); 
        }else if ( ke.code === 'KeyT' ) {
            this.setActiveTool(TEXT_CREATION); 
        }
        else if ( ke.code === 'KeyS' ) {
            this.setActiveTool(SELECTION); 
        }
    }
}
