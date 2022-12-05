import {
    ApiService,
} from '../api/api-service';
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
import { Factory } from './figure';

export class Ellipse extends ClosedFigure {

    static readonly className: string = 'Ellipse';

    constructor(
        bbox:BoundBox,
        lineThickness: number,
        lineStyle: Color,
        lineStroke:Color,
        fillColor: Color,
        lineDash:Array<number>  ) {

            super(bbox,
                lineThickness,
                lineStyle,
                lineStroke,
                fillColor,
                lineDash
            );
    }
    get name(): string {
        return Ellipse.className;
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
        ctx.setLineDash(this.lineDash);
        ctx.beginPath();
        ctx.ellipse(this.bbox.x+(this.bbox.w/2),this.bbox.y+(this.bbox.h/2), Math.abs(this.bbox.w/2), Math.abs(this.bbox.h/2), 0,  0, 2 * Math.PI);
        ctx.stroke();
        if (this._fill){
            ctx.fillStyle= ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        }  

    }
}

class EllipseFactory 
    implements Factory {

    create( 
        json: any ): Ellipse {

        return new Ellipse(
            new BoundBox(
            { 
                x: json.bbox.x, 
                y: json.bbox.y
            },
            { 
                w: json.bbox.w, 
                h: json.bbox.h 
            }),
            1,json.LineStyle,json.LineStroke,json.color,[]
        );
    }
}

ApiService.getInstance()
    .registerFactory(
        Ellipse.className,
        new EllipseFactory()
    );