import { BoundBox } from './bound-box';
import { Color,ColorHelper } from '../util/color-helper';
import { Factory, Figure } from './figure';
import { ApiService } from '../api/api-service';

export class Text extends Figure{
    static readonly className: string = 'Text';


    constructor(text:string,
        protected bbox:BoundBox,       // NEW
        protected LineStyle: Color,
        protected LineStroke: Color ) {
        super(
            bbox,
            LineStyle,
            LineStroke
        );
            this._text=text;
    }
    get name(): string {
        return Text.className;
    }
    get font(): string {
        return this._font;
    }
    set font(newFont:string){
        this._font=newFont;
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected( s: boolean ) {
        this._selected = s;
    }
    get text():string{
        return this._text;
    }
    set text (newText:string){
        this._text=newText;
    }
    doPaint(ctx: CanvasRenderingContext2D ): void {
    
        ctx.font = this._font;
        ctx.fillStyle = ColorHelper.colorAsString(this.LineStyle);
        ctx.fillText(this._text, this.bbox.x,this.bbox.y);
        if ( this.selected ) {
            this.bbox.paint(      
                        ctx
                    );
        }
        ctx.stroke();
    }
    private _font: string="";
    private _text: string=this.text;
    protected _selected: boolean = false;
}

class TextFactory 
    implements Factory {

    create( 
        json: any ): Text {

        return new Text(
            json._text, new BoundBox(
            { 
                x: json.bbox.x, 
                y: json.bbox.y
            },
            { 
                w: json.bbox.w, 
                h: json.bbox.h 
            }),
            json.LineStyle,json.LineStroke
        );
    }
}

ApiService.getInstance()
    .registerFactory(
        Text.className,
        new TextFactory()
    );

