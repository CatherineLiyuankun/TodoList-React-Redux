import { SET_TODO_LIST, ADD_TODO, DELETE_TODO, EDIT_TODO, MARK_TODO, MARK_ALL, CLEAR_MARKED } from '../constants/ActionTypes';

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case SET_TODO_LIST:
      return action.todoList;

  case ADD_TODO:
    return [action.newItem, ...state];

  case DELETE_TODO:
    return state.filter(todo =>
      todo._id !== action.id
    );

  case EDIT_TODO:
    return state.map(todo =>
      todo._id === action.id ?
      { ...todo, text: action.text } :
      todo
    );

  case MARK_TODO:
    return state.map(todo =>
      todo._id === action.id ?
        { ...todo, marked: !todo.marked } :
        todo
    );

  case MARK_ALL:
    const areAllMarked = state.every(todo => todo.marked);
    return state.map(todo => ({
      ...todo,
      marked: !areAllMarked
    }));

  case CLEAR_MARKED:
    return state.filter(todo => todo.marked === false);

  default:
    return state;
  }
}
