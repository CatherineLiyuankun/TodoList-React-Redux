import * as types from '../constants/ActionTypes';
import * as TodoActions from './TodoActions';
import * as TodoListServices from '../services/TodoListServices';
import _ from 'lodash';

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

export function addTodoItem(text) {
    return (dispatch) => {
        const newItem = {
            id: _.uniqueId(),
            marked: false,
            text
        };
        return TodoListServices.addTodoItem(newItem)
            .then((res) => {
                if (res === "OK") {
                    dispatch(TodoActions.addTodo(newItem));
                    // dispatch({
                    //     type: types.GET_TODO_LIST_SUCCESS,
                    //     response
                    // });
                }
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