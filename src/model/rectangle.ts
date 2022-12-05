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
import { ApiService } from '../api/api-service';

export class Rectangle extends ClosedFigure {

    static readonly className: string = 'Rectangle';

    constructor(
        bbox:BoundBox,
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
    get name(): string {
        return Rectangle.className;
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
        ctx.setLineDash(this.lineDash); 
        ctx.rect(this.bbox.x,this.bbox.y,this.bbox.w,this.bbox.h);
        ctx.stroke();
        if (this._fill){
            ctx.fillStyle= ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        }  

    }
}
class RectangleFactory 
    implements Factory {

    create( 
        json: any ): Rectangle {
        return new Rectangle(new BoundBox(
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
        Rectangle.className,
        new RectangleFactory()
    );
