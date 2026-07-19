/* © Paul Murray 2026 https://github.com/PaulMurrayCbr/Torchbearer */

import {
    buffer,
    debounceTime,
    delay,
    filter,
    fromEvent,
    map,
    merge,
    of,
    share,
    Subject,
    switchAll
} from "https://esm.sh/rxjs";

export const SHORT = 'SHORT', LONG = 'LONG';
const START = 'START', CANCEL = 'CANCEL';

export function clickListener$(element) {
    const click$ = new Subject();

    let isDown = false;
    const down$ = fromEvent(element, "pointerdown");
    const up$ = fromEvent(element, "pointerup");

    fromEvent(element, "click").subscribe(event => event.cancelable && event.preventDefault());

    const cancel$ = merge(
        fromEvent(element, "pointerleave"),
        fromEvent(element, "pointerout"),
        fromEvent(element, "pointercancel"),
        fromEvent(window, "blur"),
        fromEvent(document, "visibilitychange")
            .pipe(
                filter(() => document.hidden)
            ),
    ).pipe(share());

    const startLongClick$ = new Subject();
    const endLongClick$ = startLongClick$.pipe(
        map(eventType =>
            (eventType === START) ?
                of(eventType).pipe(delay(600))
                :
                of(eventType)
        ), // long click interval
        switchAll(),
        filter(eventType => eventType === START)
    );

    down$.subscribe(event => {
        event.cancelable && event.preventDefault();
        isDown = true;
        startLongClick$.next(START);
    });

    cancel$.subscribe(() => {
        startLongClick$.next(CANCEL);
        isDown = false;
    });

    up$.subscribe(event => {
        event.cancelable && event.preventDefault();
        if (isDown) {
            click$.next(SHORT);
        }
        startLongClick$.next(CANCEL);
        isDown = false;
    });

    endLongClick$.subscribe(() => {
        if (isDown) {
            click$.next(LONG);
        }
        startLongClick$.next(CANCEL);
        isDown = false;
    });

    return click$.pipe(
        buffer(
            click$.pipe(
                debounceTime(250)
            )
        )
    );

}