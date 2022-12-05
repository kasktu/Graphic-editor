import { 
    Color, 
} from '../util/color-helper';
import { BoundBox } from './bound-box';

import { 
    Figure,
} from './figure';
import { Dimension, Position } from './graphics-object';

export abstract class GeomFigure extends Figure{
    constructor(protected bbox:BoundBox,
        protected lineThickness: number,
        protected lineStyle: Color,
        protected lineStroke:Color,
        protected lineDash: Array<number>) {

        super(bbox,
            lineStyle,
            lineStroke
        );
    }
    
}