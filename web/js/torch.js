/* © Paul Murray 2026 https://github.com/PaulMurrayCbr/Torchbearer */

import {BehaviorSubject, Subject, takeUntil} from "https://esm.sh/rxjs";

import {App} from "./app.js";

export class TorchState {
    constructor(ignited, remainingPercent) {
        this.ignited = ignited;
        this.remainingPercent = remainingPercent;
    }
}

export class Torch {

    destroy$ = new Subject();

    state$ = new BehaviorSubject(new TorchState(true, 30));

    /**
     * @param {App} app
     * @param {HTMLElement} element
     */
    constructor(app, element) {
        this.app = app;
        this.element = element;

        this.torch0 = element.querySelector(".torch0");
        this.torch1 = element.querySelector(".torch1");
        this.torch2 = element.querySelector(".torch2");
        this.torch3 = element.querySelector(".torch3");
    }

    start() {
        console.log("Starting torch", this.element);

        this.element.addEventListener("pointerup", e => {
            const prev = this.state$.getValue();
            const current = new TorchState(!prev.ignited, prev.remainingPercent);

            this.state$.next(current);
        });
        this.element.addEventListener("pointermove", e => {
            this.app.selectTorch(this);
        });

        this.state$.subscribe(state => {
            this.recheckOpacity(state);
        })

        this.app.selectedTorch$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(selected => {
                if (selected === this) {
                    this.element.classList.add("selected");
                } else {
                    this.element.classList.remove("selected");
                }
            });

    }

    stop() {
        this.state$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }

    recharge() {
        const prev = this.state$.getValue();
        const current = new TorchState(prev.ignited, 100);
        this.state$.next(current);
    }

    /**
     * @param {TorchState} state
     */
    recheckOpacity(state) {
        console.log("Rechecking opacity", state);


        if (state.ignited && state.remainingPercent > 0) {
            this.torch0.style.opacity = 0;
            this.torch1.style.opacity = 0;
            this.torch2.style.opacity = 0;
            this.torch3.style.opacity = 0;

            if (state.remainingPercent > 50) {
                this.torch2.style.opacity = 1;
                this.torch3.style.opacity = (state.remainingPercent - 50) / 50;
            } else if (state.remainingPercent > 25) {
                this.torch1.style.opacity = 1;
                this.torch2.style.opacity = (state.remainingPercent - 25) / 25;
            } else {
                this.torch0.style.opacity = 1;
                this.torch1.style.opacity = state.remainingPercent / 25;
            }
        } else {
            this.torch0.style.opacity = 1;
            this.torch1.style.opacity = 0;
            this.torch2.style.opacity = 0;
            this.torch3.style.opacity = 0;
        }

    }

}