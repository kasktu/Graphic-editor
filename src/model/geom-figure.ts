import { 
    BoundBox, 
} from './bound-box';

import { 
    Color, 
} from '../util/color-helper';

import { 
    Figure,
} from './figure';

export abstract class GeomFigure extends Figure{
    constructor(
        protected bbox: BoundBox,
        protected lineThickness: number,
        protected lineStyle: Color,
        protected lineStroke:Color,
        protected lineDash: Array<number>) {

        super(
            bbox,
            lineStyle,
            lineStroke
        );
    }
    
}