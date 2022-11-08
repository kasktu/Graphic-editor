import { Drawing } from '../model/drawing';
import { MainWindow } from '../view/main-window';
import { Figure } from '../model/figure';

// Singleton => Immutable
export class App {
    private static instance: App;

    private drawing: Drawing;
    private mainWindow: MainWindow;
    
    private constructor() {
        this.drawing = new Drawing();
        this.mainWindow = new MainWindow();

        document.title = 'Graphics Editor v0.6';
    }

    // lazy initialization (preferred)
    static getInstance(): App {
        if ( App.instance ) {
            // NOOP
        }
        else {
            App.instance = new App();
        }

        return App.instance;
    }

    run(): void {
        this.drawing            // TODO: remove
            .addTestFigures();

        this.mainWindow
            .init();

        this.repaint();
    }

    // from model to view 
    repaint(): void {
        this.mainWindow
            .repaint();
    }

    // from view to model
    paint(
        ctx: CanvasRenderingContext2D ): void {

        this.drawing
            .paint(
                ctx
            );
    }

    
    select( 
        evDown: MouseEvent,
        evUp?: MouseEvent ): void {
        
        this.drawing
            .select(
                evDown,
                evUp
            );
    }
    // NEW
    addFigure(
        f: Figure ): void {
    
        this.drawing
            .addFigure(
                f                
            );
    }
}
