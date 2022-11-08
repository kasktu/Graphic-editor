export abstract class Tool {
    
    protected abstract processMouseUp(): void;

    protected evDown: MouseEvent;
    protected evUp:   MouseEvent;

    onMouseDown(
        ev: MouseEvent ): void {

        this.evDown = ev;
    }

    // Template Method
    onMouseUp(
        ev: MouseEvent ): void {

        // 1. save event
        this.evUp = ev;

        // 2. do something w/ the events
        this.processMouseUp();
    }

    // non-public members ------------------------------------

    protected equal(
        ev1: MouseEvent,
        ev2: MouseEvent ): boolean {

        return ev1.clientX === ev2.clientX 
            && ev1.clientY === ev2.clientY;
    }
}