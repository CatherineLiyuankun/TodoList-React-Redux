import { combineReducers } from 'redux';
import undoable, { ActionTypes as UndoActionTypes } from 'redux-undo';

import todos from './todos';
import * as types from '../constants/ActionTypes';

const undoableTodos = undoable(todos, {
  limit: false, // set to a number to turn on a limit for the history

  filter: (action, currentState, previousHistory) => {
    return action.type !== types.GET_TODO_LIST_FAILURE && action.type !== types.GET_TODO_LIST_REQUEST && 
    action.type !== types.GET_TODO_LIST_SUCCESS;
  }, // see `Filtering Actions`
  groupBy: () => null, // see `Grouping Actions`

  undoType: UndoActionTypes.UNDO, // define a custom action type for this undo action
  redoType: UndoActionTypes.REDO, // define a custom action type for this redo action

  jumpType: UndoActionTypes.JUMP, // define custom action type for this jump action

  jumpToPastType: UndoActionTypes.JUMP_TO_PAST, // define custom action type for this jumpToPast action
  jumpToFutureType: UndoActionTypes.JUMP_TO_FUTURE, // define custom action type for this jumpToFuture action

  clearHistoryType: UndoActionTypes.CLEAR_HISTORY, // [beta only] define custom action type for this clearHistory action
  // you can also pass an array of strings to define several action types that would clear the history
  // beware: those actions will not be passed down to the wrapped reducers

  initTypes: ['@@redux-undo/INIT'], // history will be (re)set upon init action type
  // beware: those actions will not be passed down to the wrapped reducers

  debug: false, // set to `true` to turn on debugging
  ignoreInitialState: false, // prevent user from undoing to the beginning, ex: client-side hydration

  neverSkipReducer: false, // prevent undoable from skipping the reducer on undo/redo and clearHistoryType actions
  syncFilter: false // set to `true` to synchronize the `_latestUnfiltered` state with `present` when an excluded action is dispatched
});

const rootReducer = combineReducers({
  todos: undoableTodos
});

export default rootReducer;
