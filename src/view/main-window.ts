import { 
    App 
} from '../controller/app';

export class MainWindow {
    // private menu: MenuHelper;
    private canvas: Canvas;

    constructor() {
        this.canvas = new Canvas();
    }

    // NEW
    init(): void {
        this.canvas
            .init();
    }

    repaint(): void {
        this.canvas
            .repaint();
    }
}

// module private -----------------------------------------------------------
import { EllipseCreationTool } from './ellipse-creation-tool';
import { RecgtangleCreationTool } from './rect-creation-tool';
import { LineCreationTool } from './line-creation-tool';
import { SelectionTool } from './selection-tool';
import { Tool } from './tool';

class Canvas {

    private htmlElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;

    static readonly LINE_CREATION: number = 0;
    static readonly RECT_CREATION: number = 1;
    static readonly ELLI_CREATION: number = 2;
    static readonly TEXT_CREATION: number = 3;
    static readonly SELECTION:     number = 4;
    // NEW -----------------------------------
    private tools: Tool[] = [
    ];
    private activeTool: Tool;
    // NEW -----------------------------------

    static readonly PAGE_WIDTH: number = 2000;
    static readonly PAGE_HEIGHT: number = 2000;

    static readonly GRID_SIZE: number = 100;
    static readonly GRID_COLOR: string = '#DDD0DD';

    constructor() {
        this.htmlElement = document.createElement(
            'canvas'
        );
        document.body
            .appendChild( 
                this.htmlElement 
            );

        this.htmlElement.width = Canvas.PAGE_WIDTH;
        this.htmlElement.height = Canvas.PAGE_HEIGHT;
        this.htmlElement.style.backgroundColor = '#FAFAFA';

        this.ctx = this.htmlElement
            .getContext(
                '2d'
            );
    }

    init(): void {
        // NEW
        this.buildTools();

        this.setActiveTool(
            Canvas.ELLI_CREATION
        );

        // TODO: register for mouse events
        // down, up, move, drag, doubleclick
        // enter, exit

        window.addEventListener( 
            'mousedown', 
            this.handleMouseDown
                .bind(
                    this
                )
        );

        window.addEventListener( 
            'mouseup', 
            this.handleMouseUp
                .bind(
                    this
                )
        );
    }

    setActiveTool( 
        t: number ) {

        this.activeTool = this.tools[
            t
        ];
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

    repaint(): void {           // NEW
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
        
        ctx.fillStyle = '#FAFAFA';
        ctx.fillRect( 0, 0, this.width, this.height );
    }

    private drawGrid(
        ctx: CanvasRenderingContext2D | null ): void {
            
        if ( ctx ) {
            this.clear(
                ctx
            );

            ctx.lineWidth = 1;
            ctx.strokeStyle = Canvas.GRID_COLOR;

            // TODO: use document size
            const numVerticals: number = this.width / Canvas.GRID_SIZE;
            const numHorizontals: number = this.height / Canvas.GRID_SIZE;

            // verticals
            for ( let v: number = 1; v < numVerticals; v++ ) {
                ctx.beginPath();
                ctx.moveTo( 
                    v * Canvas.GRID_SIZE, 
                    0 
                );
                ctx.lineTo(
                    v * Canvas.GRID_SIZE, 
                    Canvas.PAGE_HEIGHT 
                );
                ctx.stroke();
            }

            // horizontals
            for ( let h: number = 1; h < numHorizontals; h++ ) {
                ctx.beginPath();
                ctx.moveTo( 
                    0, 
                    h * Canvas.GRID_SIZE 
                );
                ctx.lineTo(
                    Canvas.PAGE_WIDTH, 
                    h * Canvas.GRID_SIZE 
                );
                ctx.stroke();
            }
        }
    }

    // NEW  // TODO: add remaining tools
    private buildTools(): void {

        this.tools[ Canvas.LINE_CREATION ] = new LineCreationTool();
        this.tools[ Canvas.RECT_CREATION ] = new RecgtangleCreationTool();
        this.tools[ Canvas.ELLI_CREATION ] = new EllipseCreationTool();
        // this.tools[ Canvas.TEXT_CREATION ] = new TextCreationTool();
        
        this.tools[ Canvas.SELECTION ] = new SelectionTool();
    }

    // State Pattern
    private handleMouseDown(
        ev: MouseEvent ): void {

        this.activeTool
            .onMouseDown(
                ev
            );
    }

    // State Pattern
    private handleMouseUp(
        ev: MouseEvent ): void {

        this.activeTool
            .onMouseUp(
                ev
            );
    }
}
