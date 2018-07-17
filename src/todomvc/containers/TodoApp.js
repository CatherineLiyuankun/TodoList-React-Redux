import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/TodoActions';
import * as ServerActions from '../actions/actionCreators';
import $ from 'jquery';

class TodoApp extends Component {

  loadData = () => {
    // trigger request to load todo list from node server
    const todoList = this.props.serverActions.getTodoList();

    // $.get('/todoitems', (data) => {
    //   this.props.serverActions.setTodoList(data);
    // }, 'json');

/*     $.ajax({
      url: '/todoitems',
      type: 'get',
      dataType: 'json',
      success: data => {
        this.props.serverActions.setTodoList(data);
      },
      error: err => {
        console.log(err);
      }
    }); */
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { todos, todoActions, serverActions } = this.props;

    return (
      <div>
        <Header addTodo={todoActions.addTodo} addTodoItem={serverActions.addTodoItem} />
        <MainSection todos={todos} todoActions={todoActions} serverActions={serverActions} />
      </div>
    );
  }
}

TodoApp.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      marked: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  todoActions: PropTypes.object.isRequired,
  serverActions: PropTypes.object.isRequired
};

function mapState(state) {
  return {
    todos: state.todos
  };
}

function mapDispatch(dispatch) {
  return {
    todoActions: bindActionCreators(TodoActions, dispatch),
    serverActions: bindActionCreators(ServerActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(TodoApp);
