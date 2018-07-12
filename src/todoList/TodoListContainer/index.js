// React, Redux related libraries
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { connect } from 'react-redux';

// component stylesheet
import './styles.scss';

class TodoListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {

        };
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.myBookmarks, nextProps.myBookmarks)) {
            this.setState({
                waiting: false,
                value: ''
            });
        }
        if (nextProps.newAddedError) {
            this.setState({
                addNew: true,
                waiting: false
            });
        }
    }

    componentDidUpdate() {
        if (this.addNewInput) {
            this.addNewInput.focus();
        }
    }

    render() {
        return (
            <div role="listbox"
                className="TodoListContainer"
                onClick={this.handleBkDropDownMenuClick}
                onKeyDown={this.handleBkDropDownMenuKeyDown}>
                {
                    this.props.isMobileView ? this.renderContent() : this.renderDropdownContent()
                }
            </div>
        );
    }
}

TodoListContainer.propTypes = {
    isOpen: PropTypes.bool,
    getBookmarkList: PropTypes.func
};

function mapStateToProps(state) {
    return {
        isOpen: selectBookmarkDropdownIsOpen(state),
        myBookmarks: selectMyBookmarks(state),
    };
}

export default connect(mapStateToProps, {
    getBookmarkList,
})(TodoListContainer);