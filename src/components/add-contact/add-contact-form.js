import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { hideAddContactForm, clearCurrentContact } from '../../actions';
import { TextField, Checkbox } from 'redux-form-material-ui';
import { F_NAME, L_NAME, PHONE, IS_FAVORITE } from '../../constants';

const validate = (values) => {
    // exit early
    if (!values) {return {};}
    const errors         = {};
    const phonePattern   = /^[- +()]*[0-9][- +()0-9]*$/;
    const requiredFields = [
        {
            fieldName: F_NAME,
            errorMsg: 'Please fill in a first name'
        },
        {
            fieldName: L_NAME,
            errorMsg: 'Please fill in a last name'
        },
        {
            fieldName: PHONE,
            errorMsg: 'Please enter a valid phone number'
        }
    ];
    requiredFields.forEach(f => {
        if (!values[f.fieldName]) {
            errors[f.fieldName] = f.errorMsg;
        }
        if (f.fieldName === PHONE && !phonePattern.test(values[PHONE])) {
            errors[f.fieldName] = f.errorMsg;
        }
    })
    return errors
}

class AddContactForm extends Component {

    onHideClick() {
        const { currContactIsSet, clearCurrentContact, hideAddContactForm } = this.props;
        if (currContactIsSet) {
            clearCurrentContact();
        }
        hideAddContactForm();
    }

    renderDeleteBtn(show) {
        const { deleteCurrentContact } = this.props;
        if (!show) {
            return null;
        }
        return (
            <FloatingActionButton
                mini={true}
                backgroundColor={'#F44336'}
                style={{float: 'right', marginRight: '20px'}}
                onClick={deleteCurrentContact}
                >
                <ActionDelete color={'#fff'} />
            </FloatingActionButton>
        );
    }
    
    render() {
        const { handleSubmit, pristine, valid, submitting, currContactIsSet } = this.props;
        return (
            <form
                className="add-contact-form"
                onSubmit={handleSubmit}
                autoComplete="off"
                >
                <Field
                    name={F_NAME}
                    component={TextField}
                    floatingLabelText="First name"
                    type="text"
                    style={{ display: 'block' }}
                    />
                <Field
                    name={L_NAME}
                    component={TextField}
                    floatingLabelText="Last name"
                    type="text"
                    style={{ display: 'block' }}
                    />
                <Field
                    name={PHONE}
                    component={TextField}
                    floatingLabelText="Phone number"
                    type="text"
                    style={{ display: 'block', marginBottom: '20px' }}
                    />
                <Field
                    name={IS_FAVORITE}
                    component={Checkbox}
                    label="Mark as favorite"
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    style={{ display: 'block', marginBottom: '20px'}}
                    />
                <RaisedButton
                    label={currContactIsSet ? 'Update' :  'Add contact'}
                    primary={!currContactIsSet}
                    secondary={currContactIsSet}
                    type="submit"
                    disabled={pristine || !valid || submitting}
                    onClick={handleSubmit}
                    />
                <FloatingActionButton
                    mini={true}
                    backgroundColor={'#78909C'}
                    style={{float: 'right'}}
                    onClick={this.onHideClick.bind(this)}
                    >
                    <NavigationExpandLess color={'#fff'} />
                </FloatingActionButton>
                {this.renderDeleteBtn(currContactIsSet)}
            </form>
        );
    }
}

    const getInitialValues = (currContact) => {
        if (currContact) {
            const { firstName, lastName, phone, isFavorite } = currContact;
            return { firstName, lastName, phone, isFavorite };
        }
        return { firstName: '', lastName: '', phone: '', isFavorite: false};
    }

    const reduxConnectedForm = reduxForm({
        form: 'addContactForm',
        validate,
        enableReinitialize: true
    })(AddContactForm);

    const mapStateToProps = (state) => {
        return {
            initialValues: getInitialValues(state.currContact),
            currContactIsSet: state.currContact ? true : false
        };
    };

    const connectedForm = connect(
        mapStateToProps,
        {
            hideAddContactForm,
            clearCurrentContact
        }
    )(reduxConnectedForm);
    export default connectedForm;