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
import { Drawing } from '../model/drawing';
import { DrawingEvent } from '../model/drawing-listeners';
import { MainWindow } from '../view/main-window';
import { AppEvent } from './app-listener';
// Singleton => Immutable
export class App {
    constructor() {
        this.listeners = [];
        this.drawing = new Drawing();
        this.mainWindow = new MainWindow();
        this.title = document.title = 'Graphics Editor v0.14';
        // this.drawing.addTestFigures();
    }
    getCopiedFigures() {
        return this.drawing.getCopiedFigures();
    }
    notifyListeners(ae) {
        this.listeners
            .forEach((al) => al.onAppChange(ae));
    }
    addListenerApp(al) {
        if (al)
            this.listeners
                .push(al);
    }
    remListener(al) {
        if (al)
            this.listeners = this.listeners.filter(e => e != al);
    }
    getDocumentName() {
        return this.title;
    }
    openDocument(document) {
        this.drawing
            .open(App._MY_ID_, document // TODO #55: let the user specify this name  
        );
        this.title = document;
    }
    ungroup() {
        this.drawing.unGroup();
    }
    cut() {
        this.drawing.cut();
    }
    paste() {
        this.mainWindow.paste();
    }
    copy() {
        this.drawing.copy();
    }
    numSelected() {
        const Selected = this.drawing.numSelected();
        return Selected;
    }
    onDrawingChange(ev) {
        if (ev == DrawingEvent.LOAD) {
            this.setDocumentTitle('', '');
        }
        else if (ev != DrawingEvent.SAVE) {
            this.setDocumentTitle('*', '');
        }
    }
    // lazy initialization (preferred)
    static getInstance() {
        if (App.instance) {
            // NOOP
        }
        else {
            App.instance = new App();
        }
        return App.instance;
    }
    run() {
        this.mainWindow.init();
        this.drawing.run();
    }
    addListener(dl) {
        this.drawing.addListener(dl);
    }
    // from model to view 
    // from view to model
    paint(ctx) {
        this.drawing
            .paint(ctx);
    }
    select(evDown, evUp) {
        this.drawing
            .select(evDown, evUp);
    }
    move() {
        this.drawing.move();
    }
    addFigure(f) {
        this.drawing
            .addFigure(f);
    }
    group() {
        this.drawing.group();
    }
    setActiveTool(t) {
        this.mainWindow
            .setActiveTool(t);
        this.notifyListeners(AppEvent.SET_TOOL);
    }
    getActiveTool() {
        return this.mainWindow.getActiveTool();
    }
    setDocumentTitle(Before, after) {
        document.title = Before + this.title + '-' + after;
    }
    getGraphicsContext() {
        return this.mainWindow
            .getContext();
    }
    getFeedbackContext() {
        return this.mainWindow
            .getFeedback();
    }
    clearFeedbackContext() {
        this.mainWindow
            .clearFeedback();
    }
    // NEW
    setCursor(cursor) {
        this.mainWindow
            .setCursor(cursor);
    }
    getControlPoint(ev) {
        return this.drawing
            .getControlPoint(ev);
    }
    getSelectedFigure(ev) {
        return this.drawing
            .getSelectedFigure(ev);
    }
    clear() {
        this.drawing
            .clear();
    }
    testBackEnd() {
        this.testServlet();
    }
    saveas() {
        return __awaiter(this, void 0, void 0, function* () {
            this.title = prompt('Nombre del documento');
            var fnames = this.drawing.list(App._MY_ID_);
            var existe = false;
            var date = this.actualDate.toString();
            do {
                console.log(existe);
                (yield fnames).forEach(element => {
                    if (element == this.title) {
                        existe = true;
                    }
                });
                if (this.title == null) {
                    existe = false;
                }
                else if (existe) {
                    this.title = prompt('Archivo Existente\nIngrese otro nombre');
                }
            } while (existe);
            if (this.title != null) {
                this.drawing
                    .save(App._MY_ID_, this.title, date // TODO #55: let the user specify this name  
                )
                    .then((r) => {
                    if (r) {
                        // OK
                    }
                    else {
                        console.error('App::save() => FAILED');
                    }
                });
            }
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.title == 'Graphics Editor v0.14') {
                this.saveas();
            }
            else {
                var date = this.actualDate.toString();
                if (this.title != null) {
                    this.drawing
                        .save(App._MY_ID_, this.title, date // TODO #55: let the user specify this name  
                    )
                        .then((r) => {
                        if (r) {
                            // OK
                        }
                        else {
                            console.error('App::save() => FAILED');
                        }
                    });
                }
            }
        });
    }
    actualDate() {
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        return hoy;
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            var Documentos = this.drawing
                .list(App._MY_ID_)
                .then((fnames) => {
                let i = 0;
                if (fnames) {
                    return fnames;
                }
                else {
                    console.error('Drawing::list() => FAILED');
                }
            });
            return Documentos;
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. list file names
            var fnames = this.list();
            var vacio = true;
            var actualName = this.title;
            var nameIndex;
            // 2. let the user choose one
            do {
                var names = 'Lista de Documentos:';
                (yield fnames).forEach((element, index) => {
                    names += '\n' + index + ' ' + element;
                });
                nameIndex = prompt(names);
                var nindex = Number(nameIndex);
                if (nindex != (yield fnames).length) {
                    vacio = false;
                }
                else if (this.title == null) {
                    vacio = false;
                }
            } while (vacio);
            // 3. use name chosen
            do {
                (yield fnames).forEach((element, index) => {
                    if (index == nindex) {
                        this.title = element;
                    }
                });
            } while (vacio);
            this.drawing
                .open(App._MY_ID_, this.title // TODO #55: let the user specify this name  
            );
            document.title = this.title;
        });
    }
    // NEW
    deselectAll() {
        this.drawing
            .deselectAll();
    }
    // private members ------------------------------------------------------
    testServlet() {
        const api = ApiService.getInstance();
        api.get()
            .then((read) => {
            alert(`App::test(): GET => ${read}`);
        })
            .catch((error) => {
            alert(`App::test(): ERROR => ${error.message}`);
        });
    }
}
// NEW ------------------------------------------------------------------
App._MY_ID_ = '1007651264';
//# sourceMappingURL=app.js.map