/* © Paul Murray 2026 https://github.com/PaulMurrayCbr/Torchbearer */

import {BehaviorSubject, fromEvent, of, Subject, switchAll} from "https://esm.sh/rxjs";

export class Toaster {
    destroy$ = new Subject();

    /**
     * @param {App} app
     * @param {HTMLElement} element
     */
    constructor(app, element) {
        this.app = app;
        this.element = element;
    }
}
