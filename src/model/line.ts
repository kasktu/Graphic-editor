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
    Factory
} from './figure';
import { GeomFigure } from './geom-figure';

export class Line 
    extends GeomFigure {

    static readonly className: string = 'Line';

    constructor(
        bbox:BoundBox,
        lineThickness: number,
        lineStyle: Color,
        lineStroke:Color,
        lineDash:Array<number>  ) {

            super(
                bbox,
                lineThickness,
                lineStyle,
                lineStroke,
                lineDash
            );
    }
        
    get name(): string {
        return Line.className;
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

        ctx.beginPath();
        ctx.moveTo(
            this.bbox.x, 
            this.bbox.y
        );
        ctx.lineTo(
            this.bbox.x + this.bbox.w, 
            this.bbox.y + this.bbox.h
        );
        ctx.stroke();
    }
}

class LineFactory 
    implements Factory {

    create( 
        json: any ): Line {

        return new Line( new BoundBox(
            { 
                x: json.bbox.position.x, 
                y: json.bbox.position.y
            },
            { 
                w: json.bbox.size.w, 
                h: json.bbox.size.h 
            }),
            1,json.LineStyle,json.LineStroke,[]
        );
    }
}

ApiService.getInstance()
    .registerFactory(
        Line.className,
        new LineFactory()
    );
