import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import { F_NAME, L_NAME, PHONE } from '../../constants';

const validate = values => {
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
    
    render() {
        const { handleSubmit, pristine, valid, submitting } = this.props
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
                <RaisedButton
                    label="Add contact"
                    secondary={true}
                    type="submit"
                    disabled={pristine || !valid || submitting}
                    onClick={handleSubmit}
                    />
            </form>
        );
    }
}

export default reduxForm({
  form: 'addContactForm',
  validate
})(AddContactForm);