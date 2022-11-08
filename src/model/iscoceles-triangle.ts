import { 
    BoundBox, 
} from './bound-box';

import { 
    Color,
    ColorHelper, 
} from '../util/color-helper';

import { ClosedFigure } from './closed-figure';

export class IsococelesTriangle
    extends ClosedFigure{

    constructor(
        bbox: BoundBox,
        lineThickness: number,
        lineStyle: Color,
        lineStroke:Color,
        fillColor: Color,
        lineDash:Array<number>  ) {

            super(
                bbox,
                lineThickness,
                lineStyle,
                lineStroke,
                fillColor,
                lineDash
            );
    }
     
    get _lineWidth(): number {
        return this.lineThickness;
    }

    set _lineWidth( newTickness: number ) {
        this.lineThickness = newTickness;
    }

    get _lineStyle(): string {
        return this._lineStyle;
    }

    set _lineStyle( newStyle: string ) {
        this._lineStyle = newStyle;
    }
    protected doPaint(
        ctx: CanvasRenderingContext2D ): void {

        ctx.strokeStyle = ColorHelper.colorAsString(
            this.lineStroke
        );
        ctx.lineWidth = this.lineThickness;
        ctx.beginPath();
        ctx.moveTo(
           this.bbox.x+(this.bbox.w/2), 
            this.bbox.y
        );
        ctx.lineTo(
            this.bbox.x, 
            this.bbox.h+this.bbox.y
        );
        ctx.lineTo(
            this.bbox.x+this.bbox.w,
            this.bbox.y+this.bbox.h
        );
        ctx.lineTo(
            this.bbox.x+(this.bbox.w/2), 
            this.bbox.y
        );
        if (this._fill){
            ctx.fillStyle= ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        } 
        ctx.stroke();
    }
}