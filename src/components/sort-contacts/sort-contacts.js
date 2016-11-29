import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { updateSortProp } from '../../actions';
import {F_NAME_ASC, F_NAME_DESC, L_NAME_ASC, L_NAME_DESC, PHONE_ASC, PHONE_DESC, CUSTOM} from '../../constants';

const renderSortOptions = () => {
    const sortOptions = [F_NAME_ASC, F_NAME_DESC, L_NAME_ASC, L_NAME_DESC, PHONE_ASC, PHONE_DESC, CUSTOM];
    return sortOptions.map((option, index) => {
        return <MenuItem key={index} value={option} primaryText={option} />;
    });
};

class SortContacts extends Component {

    onChange(event, index, value) {
        const { updateSortProp } = this.props;
        updateSortProp(value);
    }

    render() {
        const { sortProp } = this.props;
        return(
            <SelectField
                value={sortProp}
                onChange={this.onChange.bind(this)}
                floatingLabelText="Sort by:"
                style={{width: 'calc(100% - 16px)'}}
            >
            {renderSortOptions()}
            </SelectField>
        );
    }
}
function mapStateToProps (state) {
    return {
        sortProp: state.sortProp
    };
}
export default connect(mapStateToProps, { updateSortProp })(SortContacts);