import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import AddContactForm from './add-contact-form';
import { addContact, showAddContactForm, hideAddContactForm, clearCurrentContact } from '../../actions';
import { getNextSequenceId } from '../../store';
import './add-contact.scss';

class AddContact extends Component {

    onFormSubmit(values) {
        const {hideAddContactForm, currContact, clearCurrentContact } = this.props;
        if (currContact) {
            this.updateContact(values);
            hideAddContactForm();
        } else {
            this.addContact(values);
            clearCurrentContact();
        }
    }

    addContact(values) {
        const {addContact, nextSequenceId } = this.props;
        const { firstName, lastName, phone } = values;
        const id = Date.now();
        addContact({
            firstName,
            lastName,
            phone,
            id, 
            sequenceId: nextSequenceId
        });
    }

    updateContact(values) {
        const {} = this.props;
    }

    onTogglerClick() {
        const { showForm, currContact , showAddContactForm , clearCurrentContact } = this.props;
        if (!showForm) {
            showAddContactForm();
        }
        if (currContact) {
            clearCurrentContact();
        }
    }

    renderForm() {
        const { showForm } = this.props;
        if (!showForm) {
            return null;
        }
        return <AddContactForm onSubmit={this.onFormSubmit.bind(this)} />
    }

    renderIcon(showForm) {
        if (showForm) {
            return <NavigationExpandLess />;
        } else {
            return <ContentAdd />;
        }
    }

    render() {
        const { showForm, currContact } = this.props;
        return (
            <div className="add-contact">
                <FloatingActionButton
                    style={{ marginBottom: '20px' }}
                    onClick={this.onTogglerClick.bind(this)}
                    secondary={showForm}
                    disabled={showForm && !currContact }
                    >
                    {this.renderIcon()}
                </FloatingActionButton>
                {this.renderForm(showForm)}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        showForm: state.showForm,
        nextSequenceId: getNextSequenceId(state),
        currContact: state.currContact

    };
}
export default connect(
    mapStateToProps,
    {
        addContact,
        showAddContactForm,
        hideAddContactForm,
        clearCurrentContact
    }
)(AddContact);