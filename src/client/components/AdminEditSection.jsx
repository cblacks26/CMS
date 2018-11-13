import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class AdminEditSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.section.content,
            modules: {
                toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, 
                     {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
                clipboard: {
                    // toggle to add extra line breaks when pasting HTML:
                    matchVisual: false,
                }
            },
            formats: [
                  'header', 'font', 'size',
                  'bold', 'italic', 'underline', 'strike', 'blockquote',
                  'list', 'bullet', 'indent',
                  'link', 'image', 'video'
                ]
        }

        this.toggle = this.toggle.bind(this);
        this.editSection = this.editSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
    }
    
    componentDidMount(){
        this.title.value = this.props.section.title;
    }
    
    deleteSection(event){
        this.props.deleteSection(this.props.section._id);
        event.preventDefault();
        this.toggle();
    }
    
    editSection(event){
        this.props.editSection(this.title.value, this.state.content, this.props.section._id);
        event.preventDefault();
        this.toggle();
    }

    toggle() {
        this.props.removeModal();
    }

    render() {
    return (
        <Modal isOpen={true} toggle={this.toggle} size="lg">
            <ModalHeader>Edit Section</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input innerRef={ref => this.title = ref} type="text" placeholder="Section Title"  />
                    </FormGroup>
                    <ReactQuill theme="snow" value={this.state.content} 
                        onChange={(value)=>this.setState({content:value})}
                        modules={this.state.modules} formats={this.state.formats} />
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={this.editSection}>Save</Button>{' '}
                <Button color="danger" onClick={this.deleteSection}>Delete</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
  }
}

export default AdminEditSection;