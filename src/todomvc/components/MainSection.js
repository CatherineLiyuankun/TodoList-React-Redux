import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_UNMARKED]: todo => !todo.marked,
  [SHOW_MARKED]: todo => todo.marked
};

class MainSection extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearMarked = () => {
    const atLeastOneMarked = this.props.todos.some(todo => todo.marked);
    if (atLeastOneMarked) {
      this.props.todoActions.clearMarked();
    }
  }

  handleShow = (filter) => {
    this.setState({ filter });
  }

  render() {
    const { todos, todoActions, serverActions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const markedCount = todos.reduce((count, todo) =>
      todo.marked ? count + 1 : count,
      0
    );

    return (
      <section className='main'>
        {this.renderToggleAll(markedCount)}
        <ul className='todo-list'>
          {filteredTodos.map(todo =>
            <TodoItem key={todo._id} todo={todo} {...todoActions} {...serverActions} />
          )}
        </ul>
        {this.renderFooter(markedCount)}
      </section>
    );
  }

  renderToggleAll(markedCount) {
    const { todos, todoActions, serverActions } = this.props;
    if (todos.length > 0) {
      return (
        <input className='toggle-all'
               type='checkbox'
               checked={markedCount === todos.length}
               onChange={todoActions.markAll} />
      );
    }
  }

  renderFooter(markedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const unmarkedCount = todos.length - markedCount;

    if (todos.length) {
      return (
        <Footer markedCount={markedCount}
                unmarkedCount={unmarkedCount}
                filter={filter}
                onClearMarked={this.handleClearMarked}
                onShow={this.handleShow} />
      );
    }
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  todoActions: PropTypes.object.isRequired,
  serverActions: PropTypes.object.isRequired
};

export default MainSection;
