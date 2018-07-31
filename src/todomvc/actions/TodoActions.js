import * as types from '../constants/ActionTypes';

export function setTodoList(todoList) {
  return {
    type: types.SET_TODO_LIST,
    todoList
  };
}

export function addTodo(newItem) {
  return {
    type: types.ADD_TODO,
    newItem
  };
}

export function deleteTodo(id) {
  return {
    type: types.DELETE_TODO,
    id
  };
}

export function editTodo(id, text) {
  return {
    type: types.EDIT_TODO,
    id,
    text
  };
}

export function completeTodo(id) {
  return {
    type: types.MARK_TODO,
    id
  };
}

export function completeAllTodos() {
  return {
    type: types.MARK_ALL
  };
}

export function clearCompleted() {
  return {
    type: types.CLEAR_MARKED
  };
}

export const setVisibilityFilter = filter => (
  { type: types.SET_VISIBILITY_FILTER, filter}
)

