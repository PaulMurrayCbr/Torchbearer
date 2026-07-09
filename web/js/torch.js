/* © Paul Murray 2026 https://github.com/PaulMurrayCbr/Torchbearer */

import {BehaviorSubject, Subject, takeUntil} from "https://esm.sh/rxjs";

import {App} from "./app.js";

export class TorchState {
    constructor(ignited, maxMinutes, minutesUsed) {
        this.maxMinutes = maxMinutes;
        this.minutesUsed = minutesUsed;
        this.ignited = ignited;
        this.remainingPercent =  (this.maxMinutes - this.minutesUsed) / this.maxMinutes * 100;
    }

    getTimeDisplay() {
        const remaining = this.maxMinutes - this.minutesUsed;

        const blocks = Math.floor( (remaining+7.25)/15  );

        if(blocks <= 0) {
            return "Almost done";
        }

        return `About ${blocks*15} minutes remaining`;
    }
}

export class Torch {

    destroy$ = new Subject();

    state$ = new BehaviorSubject(new TorchState(true, 60, 8));

    /** @type {Date} */
    ignitedAt = new Date();
    /**
     * The number of ms used when the torch was last ignited or extinguished
     * @type {number}
     */
    msUsed = 0;


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
            const current = new TorchState(!prev.ignited, prev.maxMinutes, prev.minutesUsed);

            if(current.ignited) {
                this.ignitedAt = new Date();
            }
            else {
                this.ignitedAt = null;
            }

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
        const current = new TorchState(prev.ignited, prev.maxMinutes, 0);
        this.state$.next(current);
    }

    tick() {
        const state = this.state$.getValue();
        if(!state.ignited || this.app.appState$.value().isRunning()) {
            return
        }

        // TODO this bit was ai generated, need to recheck tomorrow.

        const now = new Date();
        const elapsed = now - this.ignitedAt;
        const minutes = Math.floor(elapsed / 60000);
        const remaining = state.maxMinutes - minutes;
        const remainingPercent = remaining / state.maxMinutes * 100;
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