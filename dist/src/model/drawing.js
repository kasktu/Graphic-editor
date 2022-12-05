var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiService } from '../api/api-service';
import { DrawingEvent } from './drawing-listeners';
export class Drawing {
    constructor() {
        // private undoHelper: UndoHelper = new undoHelper();
        // undo(): void {
        //     this.undoHelper
        //         .undo();
        // }
        // redo(): void {
        //     this.undoHelper
        //         .redo();
        // }
        this.listeners = [];
        this.figures = [];
        this.copiedfigure = [];
        this.name = null;
    }
    copy() {
        this.figures.forEach((f) => {
            if (f.selected) {
                this.copiedfigure.push(f);
            }
        });
        this.notifyListeners(DrawingEvent.COPY);
    }
    notifyListeners(de) {
        this.listeners
            .forEach((dl) => dl.onDrawingChange(de));
    }
    addListener(dl) {
        if (dl)
            this.listeners
                .push(dl);
    }
    remListener(dl) {
        if (dl)
            this.listeners = this.listeners.filter(e => e != dl);
    }
    // polymorphism in action
    paint(ctx) {
        console.log(this.figures);
        this.figures.forEach((f) => f.paint(ctx));
    }
    cut() {
        this.figures.forEach((f) => {
            if (f.selected) {
                this.remFigure(f);
            }
        });
    }
    group() {
        let parent;
        this.figures
            .forEach((f, index) => {
            if (f.selected) {
                console.log('figura n°' + index);
                if (parent) {
                    console.log('añadiendo figura al child');
                    parent.addChild(f);
                    console.log('quitando figura de figures');
                    this.remFigure(// NEW
                    f);
                }
                else {
                    parent = f;
                }
            }
        });
        parent.getUnionBoundBox();
        this.notifyListeners(DrawingEvent.GROUPED);
    }
    unGroup() {
        // parent.
        // this.figures
        //     .forEach( (f: Figure) => {           
        //             if ( parent ) {
        //                 parent.addChild(
        //                     f
        //                 );
        //                 parent.remFigure(	// NEW
        //                     f
        //                 );
        //             }
        //             else {
        //                 parent = f;
        //             }
        //     });
    }
    move() {
        this.notifyListeners(DrawingEvent.MOVE);
    }
    run() {
        this.notifyListeners(DrawingEvent.RUN);
    }
    numSelected() {
        let Selected = 0;
        this.figures.forEach(f => {
            if (f.select) {
                Selected = Selected + 1;
            }
        });
        return Selected;
    }
    selectAll() {
        this.figures.forEach((f) => f.selected = true);
        this.notifyListeners(DrawingEvent.SELECTION);
    }
    // NEW
    deselectAll() {
        this.figures.forEach((f) => f.selected = false);
        this.notifyListeners(DrawingEvent.UN_SELECTION);
    }
    select(evDown, evUp) {
        this.deselectAll();
        for (let i = this.figures.length - 1; i >= 0; i--) {
            const f = this.figures[i];
            f.select(evDown, evUp);
            if (f.selected) {
                if (evUp == undefined) {
                    break;
                }
            }
        }
        // TODO: something selected?
        this.notifyListeners(DrawingEvent.SELECTION);
    }
    addFigure(f) {
        this.figures
            .push(f);
        this.notifyListeners(DrawingEvent.ADD_FIGURE);
    }
    remFigure(f) {
        let newFigures = this.figures
            .filter((item) => item != f);
        console.log(newFigures);
        this.figures = newFigures;
        this.notifyListeners(DrawingEvent.REM_FIGURE);
    }
    getControlPoint(ev) {
        let cp;
        for (let i = this.figures.length - 1; i >= 0; i--) {
            const f = this.figures[i];
            if (f.selected) {
                cp = f.getControlPoint(ev);
                if (cp) {
                    break;
                }
            }
        }
        return cp;
    }
    getSelectedFigure(ev) {
        for (let i = this.figures.length - 1; i >= 0; i--) {
            const f = this.figures[i];
            if (f.selected && f.contains(ev)) {
                return f;
            }
        }
    }
    getCopiedFigures() {
        let Figs = [];
        for (let i = this.copiedfigure.length - 1; i >= 0; i--) {
            const f = this.copiedfigure[i];
            Figs.push(f);
        }
        return Figs;
    }
    clear() {
        this.figures = [];
    }
    // NEW ------------------------------------------------------------------
    save(account, fname, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = ApiService.getInstance();
            const result = yield api.store(account, fname, date, this.figures);
            if (result.error) {
                console.error(`Drawing::save(): ERROR => ${result.error}`);
                return false;
            }
            if (result.value) {
                console.log(`Drawing::save(): BYTES WRITTEN => ${result.value}`);
                this.notifyListeners(DrawingEvent.SAVE);
                return true;
            }
            return false;
        });
    }
    list(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = ApiService.getInstance();
            const result = yield api.list(account);
            if (result.error) {
                console.error(`Drawing::list(): ERROR => ${result.error}`);
            }
            console.log("Result:" + result.value);
            if (result.value) {
                const fnames = [];
                const names = JSON.parse(result.value);
                names.forEach((fname) => {
                    fnames.push(fname);
                });
                return fnames;
            }
        });
    }
    open(account, fname) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = ApiService.getInstance();
            return yield api.load(account, fname)
                .then((figures) => {
                this.figures = figures;
                this.notifyListeners(DrawingEvent.LOAD);
                return (this.figures.length > 0);
            })
                .catch((error) => {
                alert(`Drawing::open(): ERROR => ${error.message}`);
                return false;
            });
        });
    }
}
//# sourceMappingURL=drawing.js.map