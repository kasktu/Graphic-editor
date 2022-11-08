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

export class Ellipse extends ClosedFigure {

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
        ctx.setLineDash(this.lineDash);
        ctx.beginPath();
        ctx.ellipse(this.bbox.x,this.bbox.y, this.bbox.h, this.bbox.w, 0,  0, 2 * Math.PI);
        ctx.stroke();
        if (this._fill){
            ctx.fillStyle= ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        }  

    }
}