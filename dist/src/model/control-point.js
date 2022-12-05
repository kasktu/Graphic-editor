import { BoundBox } from './bound-box';
export var Cardinal;
(function (Cardinal) {
    Cardinal[Cardinal["NORTH"] = 0] = "NORTH";
    Cardinal[Cardinal["NORTH_EAST"] = 1] = "NORTH_EAST";
    Cardinal[Cardinal["EAST"] = 2] = "EAST";
    Cardinal[Cardinal["SOUTH_EAST"] = 3] = "SOUTH_EAST";
    Cardinal[Cardinal["SOUTH"] = 4] = "SOUTH";
    Cardinal[Cardinal["SOUTH_WEST"] = 5] = "SOUTH_WEST";
    Cardinal[Cardinal["WEST"] = 6] = "WEST";
    Cardinal[Cardinal["NORTH_WEST"] = 7] = "NORTH_WEST";
})(Cardinal || (Cardinal = {}));
export class ControlPoint {
    constructor(cardinal) {
        this.cardinal = cardinal;
    }
    paint(ctx, owner) {
        const pos = this.getPosition(owner);
        ctx.fillStyle = BoundBox.color;
        ctx.fillRect(pos.x - ControlPoint.HSIZE, pos.y - ControlPoint.HSIZE, 2 * ControlPoint.HSIZE, 2 * ControlPoint.HSIZE);
    }
    // NEW
    contains(ev, owner) {
        const pos = this.getPosition(owner);
        const left = pos.x - ControlPoint.HSIZE;
        const right = pos.x + ControlPoint.HSIZE;
        const top = pos.y - ControlPoint.HSIZE;
        const bottom = pos.y + ControlPoint.HSIZE;
        return left <= ev.offsetX && ev.offsetX <= right
            && top <= ev.offsetY && ev.offsetY <= bottom;
    }
    getCursor() {
        // TODO: complete switch
        switch (this.cardinal) {
            case Cardinal.EAST: return 'e-resize';
            case Cardinal.NORTH: return 'n-resize';
            case Cardinal.NORTH_EAST: return 'ne-resize';
            case Cardinal.NORTH_WEST: return 'nw-resize';
            case Cardinal.SOUTH: return 's-resize';
            case Cardinal.SOUTH_EAST: return 'se-resize';
            case Cardinal.SOUTH_WEST: return 'sw-resize';
            case Cardinal.WEST: return 'w-resize';
        }
    }
    move(dx, dy, owner) {
        // TODO: complete switch
        switch (this.cardinal) {
            case Cardinal.SOUTH:
                owner.resize(0, dy, true, true);
                break;
            case Cardinal.NORTH:
                owner.resize(0, dy, true, false);
                break;
            case Cardinal.EAST:
                owner.resize(dx, 0, true, true);
                break;
            case Cardinal.WEST:
                owner.resize(dx, 0, false, true);
                break;
            case Cardinal.SOUTH_EAST:
                owner.resize(dx, dy, true, true);
                break;
            case Cardinal.SOUTH_WEST:
                owner.resize(dx, dy, false, true);
                break;
            case Cardinal.NORTH_EAST:
                owner.resize(dx, dy, true, false);
                break;
            case Cardinal.NORTH_WEST:
                owner.resize(dx, dy, false, false);
                break;
        }
    }
    // private methods --------------------------------
    getPosition(owner) {
        let x = 0;
        let y = 0;
        // TODO: complete switch
        switch (this.cardinal) {
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
                y = owner.y + owner.h / 2;
                break;
            case Cardinal.WEST:
                x = owner.x;
                y = owner.y + owner.h / 2;
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
                y = owner.y + owner.h;
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
ControlPoint.HSIZE = 4;
//# sourceMappingURL=control-point.js.map