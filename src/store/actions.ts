import { call, take, fork, cancelled } from "redux-saga/effects";
export interface BaseAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}
interface WatcherMap {
  [key: string]: (action?: BaseAction) => Generator;
}

export function* onActions(map: WatcherMap): Generator {
  return yield call(executeWatchers, map);
}

function* executeWatchers(map: WatcherMap): Generator {
  while (true) {
    const events = Object.keys(map);
    const action = yield take(events);
    const fn = map[action.type];
    yield forkWithErrorHandler(action.type, fn, action);
  }
}

function* forkWithErrorHandler(type: string, fn: (action?: BaseAction) => Generator, action?: BaseAction) {
  yield fork(callwithErrorWrapper, type, fn, action);
}

function* callwithErrorWrapper(type: string, fn: (action?: BaseAction) => Generator, action?: BaseAction): Generator {
  try {
    if (action) {
      yield call(fn, action);
    } else {
      yield call(fn);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  } finally {
    const iscancel: boolean = yield cancelled();
    if (iscancel) {
      console.log(`${type} cancelled`);
    }
  }
}
