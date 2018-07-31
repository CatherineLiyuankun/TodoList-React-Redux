import { createSelector } from 'reselect'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const getVisibilityFilter = state => state.visibilityFilter;
const getHistoryTodos = state => state.todos;

export const getUndoTodos = createSelector(
  [getHistoryTodos],
  (untodos) => untodos
);

export const getTodos = createSelector(
  [getUndoTodos],
  (untodos) => untodos.present
);

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos
      case SHOW_COMPLETED:
        return todos.filter(t => t.marked)
      case SHOW_ACTIVE:
        return todos.filter(t => !t.marked)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
);

export const getCompletedTodoCount = createSelector(
  [getTodos],
  todos => (
    todos.reduce((count, todo) =>
      todo.marked ? count + 1 : count,
      0
    )
  )
);