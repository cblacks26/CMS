import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class AdminCreateSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
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
        this.createSection = this.createSection.bind(this);
    }
    
    createSection(event){
        this.props.createSection(this.title.value, this.state.content, this.props.id);
        event.preventDefault();
        this.toggle();
    }

    toggle() {
        this.props.removeModal();
    }

    render() {
    return (
        <Modal isOpen={true} toggle={this.toggle} size="lg">
            <ModalHeader>Create Section</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input innerRef={ref => this.title = ref} type="text" placeholder="Section Title"  />
                    </FormGroup>
                    <ReactQuill theme="snow" defaultvalue="Section Content Here" 
                        onChange={(value)=>this.setState({content:value})}
                        modules={this.state.modules} formats={this.state.formats} />
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={this.createSection}>Create</Button>{' '}
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
  }
}

export default AdminCreateSection;