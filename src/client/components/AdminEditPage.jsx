import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';

class AdminEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page
        }

        this.toggle = this.toggle.bind(this);
        this.editPage = this.editPage.bind(this);
        this.deletePage = this.deletePage.bind(this);
        this.createSectionEditor = this.createSectionEditor.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.getSection = this.getSection.bind(this);
    }
    
    componentDidMount(){
        this.title.value = this.props.page.name;
        this.url.value = this.props.page.url;
    }
    
    deletePage(event){
        this.props.deletePage(this.props.page._id);
        event.preventDefault();
        this.toggle();
    }
    
    editPage(event){
        this.props.editPage(this.title.value, this.url.value, this.props.page._id);
        event.preventDefault();
        this.toggle();
    }

    toggle() {
        this.props.removeModal();
    }

    createSectionEditor(){
        let options = this.state.page.sections.map(section => {
            return(<option value={section._id}>{options.length+1}</option>)
        })
        return (this.state.page.sections.map(section => {
            <ListGroupItem className="justify-content-around">{section.title}
                <select class="form-control" value={section._id} id={section._id} onChange={this.changeOrder}>{options}</select>
            </ListGroupItem>
        }));
    }
    
    getSection(id){
        for(let index = 0; index < this.state.page.sections.length; index++){
            if(this.state.page.sections[index]._id === id) return index;
        }
        return -1;
    }
    
    changeOrder(event){
        let oldIndex = this.getSection(event.target.value);
        let newIndex = this.getSection(event.target.id);
        if(oldIndex===newIndex) return;
        let oldSection = this.state.page.sections[oldIndex];
        let newSection = this.state.page.sections[newIndex];
        let page = this.state.page;
        page.sections[oldIndex] = newSection;
        page.sections[newIndex] = oldSection;
        this.setState({page:page});
    }

    render() {
        let options = this.createSectionEditor();
    return (
        <Modal isOpen={true} toggle={this.toggle} size="lg">
            <ModalHeader>Edit Page</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input innerRef={ref => this.title = ref} type="text" placeholder="Page Title"  />
                    </FormGroup>
                    <FormGroup>
                        <Input innerRef={ref => this.url = ref} type="text" placeholder="Page URL" />
                    </FormGroup>
                </Form>
                <ListGroup>
                    {options}
                </ListGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={this.editPage}>Save</Button>{' '}
                <Button color="danger" onClick={this.deletePage}>Delete</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
  }
}

export default AdminEditPage;