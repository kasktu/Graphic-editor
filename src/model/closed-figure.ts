import { BoundBox } from './bound-box';

import { Color } from '../util/color-helper';

import { GeomFigure } from './geom-figure';
import { Dimension, Position } from './graphics-object';

export abstract class ClosedFigure extends GeomFigure{
    
    constructor(
        protected bbox:BoundBox,
        protected lineThickness: number,
        protected lineStyle: Color,
        protected lineStroke:Color,
        protected fillColor: Color,
        protected lineDash:Array<number> ){
            super(bbox,
                lineThickness,
                lineStyle,
                lineStroke,
                lineDash
            );
        }
    get fill(): boolean {
        return this._fill;
    }
    set fill( s: boolean ) {
        this._fill = s;
    }
    protected _fill: boolean = false;
}