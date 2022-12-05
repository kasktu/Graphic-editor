import { GraphicsObject, Position } from './graphics-object';
import {  BoundBox } from './bound-box';
import { Figure } from './figure';

export enum Cardinal {
    NORTH,
    NORTH_EAST,
    EAST,
    SOUTH_EAST,
    SOUTH,
    SOUTH_WEST,
    WEST,
    NORTH_WEST
}

export class ControlPoint 
    implements GraphicsObject {
    
    static readonly HSIZE: number = 4;

    constructor(
        private cardinal: Cardinal ) {
    }

    paint( 
        ctx: CanvasRenderingContext2D,
        owner: BoundBox ): void {

        const pos: Position = this.getPosition(
            owner
        );

        ctx.fillStyle = BoundBox.color;

        ctx.fillRect( 
            pos.x - ControlPoint.HSIZE, pos.y - ControlPoint.HSIZE, 
            2 * ControlPoint.HSIZE, 2 * ControlPoint.HSIZE 
        );
    }

    // NEW
    contains(
        ev: MouseEvent,
        owner: BoundBox ): boolean {

        const pos: Position = this.getPosition(
            owner
        );

        const left:   number = pos.x - ControlPoint.HSIZE;
        const right:  number = pos.x + ControlPoint.HSIZE;
        const top:    number = pos.y - ControlPoint.HSIZE;
        const bottom: number = pos.y + ControlPoint.HSIZE;
                
        return left <= ev.offsetX && ev.offsetX <= right
            && top <= ev.offsetY && ev.offsetY <= bottom;
    }

    getCursor(): string {
    
        // TODO: complete switch

        switch ( this.cardinal ) {
            case Cardinal.EAST:       return 'e-resize';
            case Cardinal.NORTH:      return 'n-resize';
            case Cardinal.NORTH_EAST: return 'ne-resize';
            case Cardinal.NORTH_WEST: return 'nw-resize';
            case Cardinal.SOUTH:      return 's-resize';
            case Cardinal.SOUTH_EAST: return 'se-resize';
            case Cardinal.SOUTH_WEST: return 'sw-resize';
            case Cardinal.WEST:       return 'w-resize';
        }
    }

    move(
        dx: number, 
        dy: number,
        owner: Figure ): void {
        
        // TODO: complete switch

        switch ( this.cardinal ) {
            case Cardinal.SOUTH:
                owner.resize( 
                    0, dy,true,true 
                );
                break;
            case Cardinal.NORTH:
                owner.resize( 
                    0, dy,true,false 
                );
                break;
            case Cardinal.EAST:
                owner.resize( 
                    dx, 0,true,true
                );
                break;
            case Cardinal.WEST:
                owner.resize( 
                    dx, 0,false,true
                );
                break;
            case Cardinal.SOUTH_EAST:
                owner.resize( 
                    dx, dy,true,true
                );
            break;
            case Cardinal.SOUTH_WEST:
                owner.resize( 
                    dx, dy,false,true
                );
            break;case Cardinal.NORTH_EAST:
                owner.resize( 
                    dx, dy,true,false
                );
            break;
            case Cardinal.NORTH_WEST:
                owner.resize( 
                    dx, dy,false,false
                );
            break;
        }
    }

    // private methods --------------------------------

    getPosition(
        owner: BoundBox ): Position {

        let x: number = 0;
        let y: number = 0;

        // TODO: complete switch

        switch ( this.cardinal ) {
            case Cardinal.SOUTH:
                x = owner.x + owner.w / 2;
                y = owner.y + owner.h;
                break;
            case Cardinal.NORTH:
                x = owner.x + owner.w / 2;
                y = owner.y;
                break;
            case Cardinal.EAST:
                x = owner.x + owner.w;
                y = owner.y + owner.h/2;
                break;
            case Cardinal.WEST:
                x = owner.x ;
                y = owner.y + owner.h/2;
                break;
            case Cardinal.NORTH_EAST:
                x = owner.x + owner.w;
                y = owner.y;
                break;
            case Cardinal.NORTH_WEST:
                x = owner.x;
                y = owner.y;
                break;
            case Cardinal.SOUTH_WEST:
                x = owner.x;
                y = owner.y+owner.h;
                break;
            case Cardinal.SOUTH_EAST:
                x = owner.x + owner.w;
                y = owner.y + owner.h;
                break;
        }

        return {
            x, y
        };
    }
}
