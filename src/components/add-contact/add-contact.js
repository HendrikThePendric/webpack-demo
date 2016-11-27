import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import AddContactForm from './add-contact-form';
import { addContact, updateContact, deleteContact, showAddContactForm, hideAddContactForm, clearCurrentContact } from '../../actions';
import './add-contact.scss';

class AddContact extends Component {

    onFormSubmit(values) {
        const { currContact, clearCurrentContact, hideAddContactForm, addContact, updateContact } = this.props;
        if (currContact) {
            updateContact({currContact, values});
            clearCurrentContact();
        } else {
            addContact({...values, id: Date.now()});
        }
        hideAddContactForm();
    }

    onContactDelete() {
        const { clearCurrentContact, hideAddContactForm, deleteContact, currContact } = this.props;
        deleteContact(currContact.id);
        clearCurrentContact();
        hideAddContactForm();
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
        return (
            <AddContactForm 
                onSubmit={this.onFormSubmit.bind(this)} 
                deleteCurrentContact={this.onContactDelete.bind(this)}
                />
        );
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
        currContact: state.currContact

    };
}
export default connect(
    mapStateToProps,
    {
        addContact,
        updateContact,
        deleteContact,
        showAddContactForm,
        hideAddContactForm,
        clearCurrentContact
    }
)(AddContact);