import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UndoRedo extends Component {

  onUndo = () => {
    this.props.undoActions.undo();
  }

  onRedo = () => {
    this.props.undoActions.redo();
  }

  onReset = () => {
    this.props.undoActions.jumpToPast(1);
  }

  onClear = () => {
    this.props.undoActions.clearHistory();
  }

  render() {
    const { todos } = this.props;
    const canUndo = todos.past.length > 0 && todos.past[todos.past.length-1].length > 0;
    const canRedo = todos.future.length > 0;
    const canReset = todos.past.length > 0;
    const canClear = todos.future.length > 0 || todos.past.length > 0;
    return (
      <p className="history">
        <button className="undo" onClick={canUndo ? this.onUndo : null} disabled={!canUndo}>
          Undo
        </button>
        <button className="redo" onClick={canRedo ? this.onRedo : null} disabled={!canRedo}>
          Redo
        </button>
        <button className="reset" onClick={canReset ? this.onReset : null} disabled={!canReset}>
          Reset
        </button>
        <button className="clear" onClick={canClear ? this.onClear : null} disabled={!canClear}>
          Clear History
        </button>
    </p>
    );
  }
}

UndoRedo.propTypes = {
  todos: PropTypes.object,
  undoActions: PropTypes.object.isRequired
};

export default UndoRedo
