import { ApiService } from '../api/api-service';
import { ControlPoint } from '../model/control-point';
import { Drawing, DrawingListener } from '../model/drawing';
import { DrawingEvent } from '../model/drawing-listeners';
import { Figure } from '../model/figure';
import { MainWindow } from '../view/main-window';
import { AppEvent } from './app-listener';

export interface AppListener {
    onAppChange( ev: AppEvent ): void;
        
}
// Singleton => Immutable
export class App implements DrawingListener{
    getCopiedFigures():Figure[] {
        return this.drawing.getCopiedFigures();
    }
    private listeners: AppListener[] = [
    ];
    private notifyListeners(
        ae: AppEvent ) {
  
        this.listeners
            .forEach( (al: AppListener) =>
                al.onAppChange( 
                    ae 
                )
            );
    }
     
    addListenerApp(
        al: AppListener ): void {
  
        if ( al ) this.listeners
            .push(
                al
            );
    }
  
    remListener(
        al: AppListener ): void {
        if(al) this.listeners=this.listeners.filter(e=> e!=al);
    }
    getDocumentName():string {
        return this.title;
    }
    openDocument(document:string): any {
        this.drawing
            .open(
                App._MY_ID_,
                document        // TODO #55: let the user specify this name  
            );
        this.title=document;
    }
    ungroup(): any {
        this.drawing.unGroup();
    }
    cut(): any {
        this.drawing.cut();
    }
    paste(): any {
        this.mainWindow.paste();
    }
    copy(): any {
       this.drawing.copy();
    }
    
    numSelected(): number {
        const Selected = this.drawing.numSelected();
        return Selected;
    }
    private static instance: App;

    private drawing: Drawing;
    private mainWindow: MainWindow;
    private title: string;
    
    private constructor() {
        this.drawing = new Drawing();
        this.mainWindow = new MainWindow();

        this.title = document.title = 'Graphics Editor v0.14';
        // this.drawing.addTestFigures();
    }
    onDrawingChange(ev: DrawingEvent): void {
        if(ev==DrawingEvent.LOAD){
            this.setDocumentTitle('','');
        }else if(ev!=DrawingEvent.SAVE){
            this.setDocumentTitle('*','');
        }
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
        this.mainWindow.init();
        this.drawing.run();
    }
    addListener(dl: DrawingListener):void{
        this.drawing.addListener(dl);
    }
    // from model to view 


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
    move(){
        this.drawing.move();

    }
            
    addFigure(
        f: Figure ): void {
    
        this.drawing
            .addFigure(
                f                
            );
        
    }
    group(): any {
        this.drawing.group();
    }

    setActiveTool( 
        t: number ) {

        this.mainWindow
            .setActiveTool(
                t
            );
        this.notifyListeners(AppEvent.SET_TOOL)
    }
    getActiveTool():string{
        return this.mainWindow.getActiveTool();
    }
    setDocumentTitle(Before:string,after:string){
        document.title = Before+this.title+'-'+after;
    }
    getGraphicsContext(): CanvasRenderingContext2D {
        return this.mainWindow
            .getContext();
    }
    
    getFeedbackContext(): CanvasRenderingContext2D {
        return this.mainWindow
            .getFeedback();
    }

    clearFeedbackContext(): void {
        this.mainWindow
            .clearFeedback();
    }

    // NEW
    setCursor(
        cursor: string ): void {

        this.mainWindow
            .setCursor(
                cursor
            );
    }

    getControlPoint(
        ev: MouseEvent ): ControlPoint {
        
        return this.drawing
            .getControlPoint(
                ev
            );
    }

    getSelectedFigure(
        ev: MouseEvent ): Figure {
        
        return this.drawing
            .getSelectedFigure(
                ev
            );
    }

    clear(): void {
        this.drawing
            .clear();
    }

    // NEW ------------------------------------------------------------------
    static readonly _MY_ID_: string = '1007651264';

    testBackEnd(): void {
        this.testServlet();
    }
    async saveas():Promise<void>{
        this.title=prompt('Nombre del documento');
        var fnames=this.drawing.list(App._MY_ID_);
        var existe:Boolean=false;
        var date=this.actualDate.toString();
        do{
            console.log(existe);
            (await fnames).forEach(element => {
                if (element==this.title){
                    existe=true;
                }
            });
            if(this.title==null){
                existe=false
            }else if(existe){
                this.title=prompt('Archivo Existente\nIngrese otro nombre');
            }

        }while(existe)
        if (this.title!=null){
            this.drawing
            .save(
                App._MY_ID_,
                this.title,
                date         // TODO #55: let the user specify this name  
            )
            .then( (r: boolean) => {
                if ( r ) {
                    // OK
                }
                else {
                    console.error(
                        'App::save() => FAILED'
                    );
                }
            });
        }
    
    }
    async save(): Promise<void> {
        if (this.title=='Graphics Editor v0.14'){
            this.saveas();
        }else{
            var date=this.actualDate.toString();
            if (this.title!=null){
                this.drawing
                .save(
                    App._MY_ID_,
                    this.title,
                    date           // TODO #55: let the user specify this name  
                )
                .then( (r: boolean) => {
                    if ( r ) {
                        // OK
                    }
                    else {
                        console.error(
                            'App::save() => FAILED'
                        );
                    }
                });
            }
        }
    }
    actualDate():Date{
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido );
        return hoy;
    }

    async list(): Promise<string[]>{
        var Documentos=this.drawing
            .list(
                App._MY_ID_
            )
            .then( (fnames: string[]) => {
                let i=0
                if ( fnames ) {
                    return fnames
                }
                else {
                    console.error(
                        'Drawing::list() => FAILED'
                    );
                }
            });
        return Documentos;
    }

    async open(): Promise<void> {
        // 1. list file names
        var fnames=this.list();
        var vacio:Boolean=true;
        var actualName=this.title;
        var nameIndex:string;
        // 2. let the user choose one
        do{     
            var names:string='Lista de Documentos:';
            (await fnames).forEach((element,index) => {
                names+='\n'+index+' '+element
            })
            nameIndex=prompt(names);
            var  nindex:number=Number(nameIndex)
            if (nindex!=(await fnames).length){
                vacio=false;
            }else if (this.title==null){
                vacio=false;
            }
        }while(vacio)
        // 3. use name chosen
        do{
            (await fnames).forEach((element,index) => {
                if(index==nindex){
                    this.title=element;
                }
            })

        }while(vacio)
        this.drawing
            .open(
                App._MY_ID_,
                this.title         // TODO #55: let the user specify this name  
            )
            ;
        document.title=this.title;
    }

    // NEW
    deselectAll() {
        this.drawing
            .deselectAll();

    }

    // private members ------------------------------------------------------
    
    protected testServlet(): void {
        const api: ApiService = ApiService.getInstance();

        api.get(
        )
        .then( (read: string) => {
            alert(
                `App::test(): GET => ${read}`
            );
        })
        .catch( (error) => {
            alert(
                `App::test(): ERROR => ${error.message}`
            );
        });
    }
}
