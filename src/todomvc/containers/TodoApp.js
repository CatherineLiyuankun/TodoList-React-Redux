import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import UndoRedo from '../components/UndoRedo';

import * as TodoActions from '../actions/TodoActions';
import * as ServerActions from '../actions/actionCreators';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { getUndoTodos, getTodos, getCompletedTodoCount } from '../selectors'

class TodoApp extends Component {

  loadData() {
    // trigger request to load todo list from node server
    this.props.serverActions.getTodoList();
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { untodos, todosCount,  todoActions, completedCount, serverActions, undoActions } = this.props;

    return (
      <div>
        <Header addTodo={todoActions.addTodo} addTodoItem={serverActions.addTodoItem} />
        <UndoRedo undoActions={undoActions} todos={untodos}/>
        <MainSection todoActions={todoActions} serverActions={serverActions} todosCount={todosCount} completedCount={completedCount}/>
      </div>
    );
  }
}

TodoApp.propTypes = {
  untodos: PropTypes.shape({
    past: PropTypes.array,
    present: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        marked: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
      }).isRequired
    ),
    future: PropTypes.array
  }).isRequired,
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  todoActions: PropTypes.object.isRequired,
  serverActions: PropTypes.object.isRequired,
  undoActions: PropTypes.object.isRequired
};

function mapState(state) {
  return {
    untodos: getUndoTodos(state),
    todosCount: getTodos(state).length,
    completedCount: getCompletedTodoCount(state)
  };
}

function mapDispatch(dispatch) {
  return {
    todoActions: bindActionCreators(TodoActions, dispatch),
    serverActions: bindActionCreators(ServerActions, dispatch),
    undoActions: bindActionCreators(UndoActionCreators, dispatch)
  };
}

export default connect(mapState, mapDispatch)(TodoApp);
