import { BoundBox } from './bound-box';
import { Color,ColorHelper } from '../util/color-helper';
import { Figure } from './figure';

export class Text extends Figure{

    constructor(text:string,
        bbox: BoundBox,       // NEW
        LineStyle: Color,
        LineStroke: Color ) {
            super(
                bbox,
                LineStyle,
                LineStroke
            );
            this._text=text;
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
