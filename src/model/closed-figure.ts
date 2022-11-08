import { 
    BoundBox, 
} from '../../../Version_6/src/model/bound-box';

import { 
    Color,
    ColorHelper,
} from '../../../Version_6/src/util/color-helper';

import { 
    Figure,
} from '../../../Version_6/src/model/figure';
import { GeomFigure } from './geom-figure';

export abstract class ClosedFigure extends GeomFigure{
    constructor(
        protected bbox: BoundBox,
        protected lineThickness: number,
        protected lineStyle: Color,
        protected lineStroke:Color,
        protected fillColor: Color,
        protected lineDash:Array<number> ){
            super(
                bbox,
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