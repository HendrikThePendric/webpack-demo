import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { updateFilterValue } from '../../actions';

class FilterContacts extends Component {

    render() {
        const {filterValue, updateFilterValue } = this.props;
        return (
            <TextField
                floatingLabelText="Filter:"
                value={filterValue}
                onChange={(event, value) => updateFilterValue(value)}
                style={{width: 'calc(100% - 16px)'}}
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