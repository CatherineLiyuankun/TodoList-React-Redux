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

class TodoApp extends Component {

  loadData = () => {
    // trigger request to load todo list from node server
    this.props.serverActions.getTodoList();
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { todos, todoActions, serverActions, undoActions } = this.props;

    return (
      <div>
        <Header addTodo={todoActions.addTodo} addTodoItem={serverActions.addTodoItem} />
        <UndoRedo undoActions={undoActions} todos={todos}/>
        <MainSection todos={todos.present} todoActions={todoActions} serverActions={serverActions} />
      </div>
    );
  }
}

TodoApp.propTypes = {
  todos: PropTypes.shape({
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
  todoActions: PropTypes.object.isRequired,
  serverActions: PropTypes.object.isRequired,
  undoActions: PropTypes.object.isRequired
};

function mapState(state) {
  return {
    todos: state.todos
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
