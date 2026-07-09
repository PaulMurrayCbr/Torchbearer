/* © Paul Murray 2026 https://github.com/PaulMurrayCbr/Torchbearer */

import {BehaviorSubject, fromEvent} from "https://esm.sh/rxjs";

export class AppState {

    static PAUSED = new AppState("PAUSED");
    static RUNNING = new AppState("RUNNING");

    /**
     * @param name string
     */
    constructor(name) {
        this.name = name;
    }

    isPaused() {
        return this === AppState.PAUSED;
    }

    isRunning() {
        return this === AppState.RUNNING;
    }

    toggle() {
        return this === AppState.PAUSED ? AppState.RUNNING : AppState.PAUSED;
    }

    toString() {
        return this.name;
    }

}

export class App {

    /**
     * @param {HTMLElement} element
     */

    constructor(element) {
        this.element = element;

        this.appState$ = new BehaviorSubject(AppState.RUNNING);

        this.selectedTorch$ = new BehaviorSubject(null);

        this.appState$.subscribe(state => {
            if (state.isPaused()) {
                this.element.querySelector("#pause").classList.add("on");
                this.selectedTorch$.next(null);
            } else {
                this.element.querySelector("#pause").classList.remove("on");
            }
        })
    }

    start() {
        fromEvent(this.element.querySelector("#pause"), "click")
            .subscribe(() => {
                this.appState$.next(this.appState$.getValue().toggle());
            });
        fromEvent(this.element.querySelector("#addTorch"), "click")
            .subscribe(() => {
                this.addTorch();
            });

    }

    addTorch() {
        console.log("Adding torch");
    }

}