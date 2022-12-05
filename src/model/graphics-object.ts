export interface GraphicsObject {
    paint( 
        ctx: CanvasRenderingContext2D,
        extrinsic?: any ): void;
}
export interface Position {
    x: number;
    y: number;
}

export interface Dimension {
    w: number;
    h: number;
}

