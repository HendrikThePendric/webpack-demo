import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { updateFilterValue } from '../../actions';

class FilterContacts extends Component {

    onChange(event, value) {
        const { updateFilterValue } = this.props;
        updateFilterValue(value);
    }

    render() {
        const {filterValue } = this.props;
        return (
            <TextField
                floatingLabelText="Filter:"
                value={filterValue}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}

function mapStateToProps (state) {
    return {
        filterValue: state.filterVal
    };
}
export default connect(mapStateToProps, { updateFilterValue })(FilterContacts);