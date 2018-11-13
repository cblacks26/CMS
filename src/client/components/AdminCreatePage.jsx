import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AdminCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.createPage = this.createPage.bind(this);
    }
    
    createPage(event){
        this.props.createPage(this.title.value, this.url.value);
        event.preventDefault();
        this.toggle();
    }

    toggle() {
        this.props.removeModal();
    }

    render() {
    return (
        <Modal isOpen={true} toggle={this.toggle} size="lg">
            <ModalHeader>Create Page</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input innerRef={ref => this.title = ref} type="text" placeholder="Page Title"  />
                    </FormGroup>
                    <FormGroup>
                        <Input innerRef={ref => this.url = ref} type="text" placeholder="Page URL" />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={this.createPage}>Create Page</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
  }
}

export default AdminCreatePage;