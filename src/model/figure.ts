import { BoundBox } from './bound-box';
import { Color } from '../util/color-helper';
import { Cardinal, ControlPoint } from './control-point';
import { GraphicsObject } from './graphics-object';

export interface Factory {
    create( obj: any ): Figure;
}

export abstract class Figure 
    implements GraphicsObject {


    constructor(
            protected bbox: BoundBox,
            protected LineStyle: Color,
            protected LineStroke: Color ) {
            if ( Figure.ctrlPoints.length === 0 ) {
                this.addControlPoints();
            }
        }

    // NEW
    abstract get name(): string;
    protected abstract doPaint( 
        ctx: CanvasRenderingContext2D ): void;
    private gbbox: BoundBox;
    private children: Figure[] = [];
    getUnionBoundBox(){
        let fX,fY,fH,fW;
        if (this.bbox.w<0){
            fX=this.bbox.x+this.bbox.w;
            fW=Math.abs(this.bbox.w);
        }else{
            fX=this.bbox.x;
            fW=this.bbox.w;
        }
        if(this.bbox.h<0){
            fY=this.bbox.y+this.bbox.h;
            fH=Math.abs(this.bbox.h)
        }else{
            fY=this.bbox.y;
            fH=this.bbox.h;
        }
        let minX=fX;
        let minY=fY;
        
        let maxX=fX+fW,maxY=fY+fH;
        this.children.forEach((f:Figure)=>{
            let X,Y,H,W;
            if (f.bbox.w<0){
                X=f.bbox.x+f.bbox.w;
                W=Math.abs(f.bbox.w);
            }else{
                X=f.bbox.x;
                W=f.bbox.w;
            }
            if(f.bbox.h<0){
                Y=f.bbox.y+f.bbox.h;
                H=Math.abs(f.bbox.h)
            }else{
                Y=f.bbox.y;
                H=f.bbox.h;
            }

            if(X<minX) {minX=X}
            if(Y<minY) {minY=Y;}
            let right:number=X+W;
            let bottom:number=Y+H;
            if(right>maxX) {maxX=right;}
            if(bottom>maxY) {maxY=bottom;}
            f.selected=false;
        })
        this.gbbox=new BoundBox({x:minX,y:minY},{w:(maxX-minX),h:(maxY-minY)});
        Figure.ctrlPoints.forEach((cp:ControlPoint)=> Figure.ctrlPoints.shift())
        this.addControlPoints();
    }
    addChild(f: Figure) {
        this.children.push(f);
    }
    flushChildren(a:Figure[]):void{
        this.children.forEach((f:Figure)=> a.push(f));
        this.children=[];
    }


     
    // public interface -------------------------------

    get selected(): boolean {
        return this._selected;
    }

    set selected( s: boolean ) {
        this._selected = s;
    }

    // Template Method
    paint( 
        ctx: CanvasRenderingContext2D ): void {

        // 1. paint figure
        this.doPaint(
            ctx
        );
        // 2. paint children (NEW)
        this.children
           .forEach(
               (f: Figure) => f.paint( ctx )	// recursive
           );

        // 3. paint bounding box
        if ( this.selected ) {
            if(this.gbbox){
                this.gbbox
                .paint(
                    ctx
                );
                Figure.ctrlPoints
                .forEach( 
                    (cp: ControlPoint) => cp.paint( ctx, this.gbbox ) 
                );
            }else{
                this.bbox
                .paint(
                    ctx
                );
                Figure.ctrlPoints
                .forEach( 
                    (cp: ControlPoint) => cp.paint( ctx, this.bbox ) 
                );
            }
            // 4 . draw control points
            
        }
    }
    

    select( 
        evDown: MouseEvent,
        evUp?: MouseEvent ): void {
        
        this.selected = this.bbox
            .select( 
                evDown, 
                evUp 
            );
    }

    contains(
        ev: MouseEvent ): boolean {
        if (this.gbbox){
            return this.gbbox.contains(ev)
        }else {return this.bbox
            .contains(
                ev
            );
        }
    }

    getControlPoint(
        ev: MouseEvent ): ControlPoint | undefined {
    
        for ( let i: number = 0; i < Figure.ctrlPoints.length; i++ ) {
            const cp: ControlPoint = Figure.ctrlPoints[
                i
            ];
            if ( cp.contains( ev, this.bbox ) ) {
                return cp;
            }
        }
    }




    move(
        dx: number, 
        dy: number) {
        if(this.gbbox){
            this.gbbox
            .move(
                dx, 
                dy
            );
            this.bbox.move(dx,dy);
            this.children.forEach((f:Figure)=>{f.bbox.move(dx,dy)})
        }else{
            this.bbox
            .move(
                dx, 
                dy
            );
        }
        

    }

    resize(
        dx: number, 
        dy: number,x:boolean,y:boolean ): void {
            if(this.gbbox){
                this.gbbox
                .resize(
                    dx,
                dy,x,y
                );
                this.bbox.resize(
                    dx,
                dy,x,y
                );;
                this.children.forEach((f:Figure)=>{
                    f.bbox.resize
                    (dx,dy,x,y);})
            }else{
                this.bbox.
                resize(
                    dx,dy,x,y
                );
            }
    }

    get x(): number {
        return this.bbox.x;
    }
    get y(): number {
        return this.bbox.y;
    }
    get w(): number {
        return this.bbox.w;
    }
    get h(): number {
        return this.bbox.h;
    }

    // NEW
    toJSON(): any {
        return {
            bbox: this.bbox,
            LineStyle: this.LineStyle,
            LineStroke: this.LineStroke
        };
    }

    // non-public members -----------------------------

    protected _selected: boolean = false;
    
    static readonly ctrlPoints: ControlPoint[] = [
    ];

    private addControlPoints(): void {

        //  target = ES2017+
        
        // Object.values(
        //     Cardinal
        // )
        // .map( (cardinal: Cardinal) =>
        //     this.ctrlPoints
        //         .push(
        //             new ControlPoint(
        //                 this,
        //                 cardinal
        //             )
        //         )
        // );

        // target = ES5
        
        Object.keys(
            Cardinal
        )
        .map( (key: string) => {
            const cardinal: number = Number( 
                key 
            );

            if ( !isNaN( cardinal ) ) {
                Figure.ctrlPoints
                    .push(
                        new ControlPoint(
                            cardinal
                        )
                    );
                }
        });
    }
}
