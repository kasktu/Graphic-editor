import { 
    BoundBox, 
} from './bound-box';

import { 
    Color,
    ColorHelper, 
} from '../util/color-helper';

import { 
    ClosedFigure,
} from './closed-figure';

export class Rectangle extends ClosedFigure {

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
    protected doPaint(
        ctx: CanvasRenderingContext2D ): void {

        ctx.strokeStyle = ColorHelper.colorAsString(
            this.lineStroke
        );
        ctx.lineWidth = this.lineThickness;
        ctx.beginPath();
        ctx.setLineDash(this.lineDash); 
        ctx.rect(this.bbox.x,this.bbox.y,this.bbox.w,this.bbox.h);
        ctx.stroke();
        if (this._fill){
            ctx.fillStyle= ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        }  

    }
}