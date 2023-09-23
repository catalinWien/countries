import { Action } from '@ngrx/store';
import { EMPTY, noop, of, OperatorFunction, pipe, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export abstract class Effect {
  protected constructor() {}

  dispatch<T>(next: (result: T) => Action, errorOptions?: ErrorOptions): OperatorFunction<T, Action> {
    return pipe(
      map((result) => next(result)),
      catchError((err) => {
        if (errorOptions) {
          noop;
        } else {
          throw err;
        }

        return EMPTY;
      })
    );
  }
}
