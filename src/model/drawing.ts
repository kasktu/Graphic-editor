import {ApiService} from '../api/api-service';
import {ControlPoint } from './control-point';
import {Figure} from './figure';
import { DrawingEvent } from './drawing-listeners';
// import {undoHelper}

export interface DrawingListener {
    onDrawingChange( ev: DrawingEvent ): void;
        
}

export class Drawing {
 
    
    // private undoHelper: UndoHelper = new undoHelper();
 
    // undo(): void {
    //     this.undoHelper
    //         .undo();
    // }
  
    // redo(): void {
    //     this.undoHelper
    //         .redo();
    // }
    
    private listeners: DrawingListener[] = [
    ];
    private figures: Figure[] = [
    ];
    copiedfigure:Figure[]=[];
    private name: string | null = null;
    
    constructor() {
    }
    copy() {
        this.figures.forEach((f:Figure)=> {if(f.selected){
            this.copiedfigure.push(f);
        }})
        this.notifyListeners(DrawingEvent.COPY)

    }
    private notifyListeners(
        de: DrawingEvent ) {
  
        this.listeners
            .forEach( (dl: DrawingListener) =>
                dl.onDrawingChange( 
                    de 
                )
            );
    }
 
    addListener(
        dl: DrawingListener ): void {
  
        if ( dl ) this.listeners
            .push(
                dl
            );
    }
  
    remListener(
        dl: DrawingListener ): void {
        if(dl) this.listeners=this.listeners.filter(e=> e!=dl);
    }
    // polymorphism in action
    paint(
        ctx: CanvasRenderingContext2D ): void {
        console.log(this.figures)
        this.figures.forEach( 
            (f: Figure) => f.paint( ctx ) 
        );
    }
    cut() {
        this.figures.forEach((f:Figure)=>{if(f.selected){
            this.remFigure(f);
        }})
    }
    group(): void {
        let parent: Figure;
  
        this.figures
            .forEach( (f: Figure,index:number) => {           
                if ( f.selected ) {
                    console.log('figura n°'+index)
                    if ( parent ) {
                        console.log('añadiendo figura al child')
                        parent.addChild(
                            f
                        );
  
                        console.log('quitando figura de figures')
                        this.remFigure(	// NEW
                            f
                        );
                    }
                    else {
                        parent = f;
                    }
                }
            });
        parent.getUnionBoundBox();
    this.notifyListeners(DrawingEvent.GROUPED)
    }
    unGroup() {
        // parent.
        // this.figures
        //     .forEach( (f: Figure) => {           
        //             if ( parent ) {
        //                 parent.addChild(
        //                     f
        //                 );
  
        //                 parent.remFigure(	// NEW
        //                     f
        //                 );
        //             }
        //             else {
        //                 parent = f;
        //             }
    
        //     });
    }
 
    move() {
        this.notifyListeners(DrawingEvent.MOVE);
    }
    run() {
        this.notifyListeners(DrawingEvent.RUN);
    }
    numSelected() : number {
        let Selected=0;
        this.figures.forEach(f=>{if(f.select){
            Selected=Selected+1;
    }});
        return Selected;
    }

    selectAll(): void {
        this.figures.forEach( 
            (f: Figure) => f.selected = true 
        );
        this.notifyListeners(
            DrawingEvent.SELECTION
            );
        
    }

    // NEW
    deselectAll() {
        this.figures.forEach( 
            (f: Figure) => f.selected = false 
        );
        this.notifyListeners(
            DrawingEvent.UN_SELECTION
        );
    }

    select( 
        evDown: MouseEvent,
        evUp?: MouseEvent ): void {
        this.deselectAll()
        for ( let i = this.figures.length - 1; i >= 0; i-- ) {
            const f: Figure = this.figures[
                i
            ];

            f.select( 
                evDown, 
                evUp 
            );
            if ( f.selected) {
                if(evUp==undefined){
                    break;
                }
            }
        }
    
        // TODO: something selected?
        this.notifyListeners(
            DrawingEvent.SELECTION
            );
    }
            
    addFigure(
        f: Figure ): void {
    
        this.figures
            .push(
                f
            );
        this.notifyListeners(DrawingEvent.ADD_FIGURE)

    }
    remFigure(
        f: Figure ): void {
    
        let newFigures=this.figures
            .filter((item) => item != f);
        console.log(newFigures)
        this.figures=newFigures;
        this.notifyListeners(DrawingEvent.REM_FIGURE)

    }

    getControlPoint(
        ev: MouseEvent ): ControlPoint {
        
        let cp: ControlPoint;

        for ( let i = this.figures.length - 1; i >= 0; i-- ) {
            const f: Figure = this.figures[
                i
            ];

            if ( f.selected ) {
                cp = f.getControlPoint(
                    ev
                );

                if ( cp ) {
                    break;
                }
            }
        }

        return cp;
    }
    
    getSelectedFigure(
        ev: MouseEvent ): Figure {
        
        for ( let i = this.figures.length - 1; i >= 0; i-- ) {
            const f: Figure = this.figures[
                i
            ];

            if ( f.selected && f.contains( ev ) ) {
                return f;
            }
        }

    }
    getCopiedFigures(): Figure[] {
        let Figs:Figure[]=[];
        for ( let i = this.copiedfigure.length - 1; i >= 0; i-- ) {
            const f: Figure = this.copiedfigure[
                i
            ];
            Figs.push(f)
        }   

        return Figs;
    }

    clear(): void {
        this.figures = [
        ];

        
    }

    // NEW ------------------------------------------------------------------
    
    async save(
        account: string,
        fname: string,date:String ): Promise<boolean> {

        const api: ApiService = ApiService.getInstance();

        const result: {value: string, error: string} = await api.store(
            account,
            fname,
            date,
            this.figures
        );

        if ( result.error ) {
            console.error(
                `Drawing::save(): ERROR => ${result.error}`
            );

            return false;
        }

        if ( result.value ) {
            console.log(
                `Drawing::save(): BYTES WRITTEN => ${result.value}`
            );
            this.notifyListeners(
                DrawingEvent.SAVE
            );
            return true;

        }

        return false;
    }

    async list(
        account: string ): Promise<string[]> {

        const api: ApiService = ApiService.getInstance();

        const result: {value: string, error: string} = await api.list(
            account
        )

        if ( result.error ) {
            console.error( 
                `Drawing::list(): ERROR => ${result.error}`
            );
        }
        console.log("Result:"+result.value)
        if ( result.value ) {
            const fnames: string[] = [
            ];
    
            const names: string[] = JSON.parse(
                result.value
            );

            names.forEach( (fname: string) => {
                fnames.push( 
                    fname
                );
            });
            
            return fnames;
        }
    }

    async open(
        account: string,
        fname: string ): Promise<boolean> {

        const api: ApiService = ApiService.getInstance();   
        return await api.load(
            account,
            fname
        )
        .then( (figures: Figure[]) => {
            this.figures = figures;
            this.notifyListeners(
                DrawingEvent.LOAD
            ); 
            return (this.figures.length > 0);
        })
        .catch( (error) => {
            alert(
                `Drawing::open(): ERROR => ${error.message}`
            );
            return false;
        });
        
    }
}

