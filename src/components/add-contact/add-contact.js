import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddContactForm from './add-contact-form';
import { addContact, toggleFormState } from '../../actions';
import { getNextSequenceId } from '../../store';
import './add-contact.scss';

class AddContact extends Component {

    onContactAdd(values) {
        const {addContact, toggleFormState, nextSequenceId } = this.props;
        const { firstName, lastName, phone } = values;
        const id = Date.now();
        addContact({
            firstName,
            lastName,
            phone,
            id, 
            sequenceId: nextSequenceId
        });
        toggleFormState();
    }

    renderForm() {
        const { showForm } = this.props;
        if (!showForm) {
            return null;
        }
        return <AddContactForm onSubmit={this.onContactAdd.bind(this)} />
    }

    render() {
        const { toggleFormState, showForm } = this.props
        return (
            <div className="add-contact">
                <FloatingActionButton
                    style={{ marginBottom: '20px' }}
                    onClick={toggleFormState}
                    disabled={showForm}
                    >
                    <ContentAdd />
                </FloatingActionButton>
                {this.renderForm()}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        showForm: state.showForm,
        nextSequenceId: getNextSequenceId(state)
    };
}
export default connect(mapStateToProps, {addContact, toggleFormState})(AddContact);