import * as types from '../constants/ActionTypes';
import * as TodoActions from './TodoActions';
import * as TodoListServices from '../services/TodoListServices';

export function getTodoList() {
    return (dispatch) => {
        return TodoListServices.getTodoList()
            .then((todoList) => {
                // dispatch({
                //     type: types.GET_TODO_LIST_SUCCESS,
                //     response
                // });
                dispatch(TodoActions.setTodoList(todoList));
            })
            .catch((error) => {
                // dispatch({
                //     type: types.GET_TODO_LIST_FAILURE,
                //     error
                // });
                // re-throw to be further handled if necessary
                throw error;
            });
    };
}