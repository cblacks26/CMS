import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, CardTitle, CardText, CardFooter, CardBody, CardHeader, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminCreateSection from './AdminCreateSection.jsx';
import AdminCreatePage from './AdminCreatePage.jsx';
import AdminEditSection from './AdminEditSection.jsx';
import AdminEditPage from './AdminEditPage.jsx';

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            pages: [],
            sections: [],
            modal: ''
        }
        this.getPage = this.getPage.bind(this);
        this.getSection = this.getSection.bind(this);
        this.editSection = this.editSection.bind(this);
        this.editPage = this.editPage.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.createSection = this.createSection.bind(this);
        this.createPage = this.createPage.bind(this);
        this.createModalCreatePage = this.createModalCreatePage.bind(this);
        this.createModalCreateSection = this.createModalCreateSection.bind(this);
        this.createModalEditSection = this.createModalEditSection.bind(this);
        this.createModalEditPage = this.createModalEditPage.bind(this);
        this.removeModal = this.removeModal.bind(this);
        this.renderPages = this.renderPages.bind(this);
    }
    
    componentWillMount(){
        let pageurl = window.location.href+"/page";
        let sectionurl = window.location.href+"/section";
        fetch(pageurl)
        .then(data => data.json())
        .then((data) => this.setState({pages:data}))
        .catch(err => console.log(err));
        fetch(sectionurl)
        .then(sectionData => sectionData.json())
        .then((sectionData) => this.setState({sections:sectionData}))
        .catch(err => console.log(err));
    }
    
    getPage(id){
        for(let page in this.state.pages){
            if(this.state.pages[page]._id===id) return page;
        }
        return null;
    }
    
    getSection(id){
        for(let sect in this.state.sections){
            if(this.state.sections[sect]._id===id) return sect;
        }
        return null;
    }
    
    async createSection(title, content, id){
        let sectionurl = window.location.href+"/section";
        let bod = JSON.stringify({ 
                title: title,
                content: content
            });
        let sectionid = '';
        await fetch(sectionurl, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: bod
        })
        .then(data => data.json())
        .then(data => {
            this.setState(prevState => ({
                sections: [...prevState.sections, data]
            }))
            sectionid = data._id;
        })
        .catch(err => console.log(err));
        let pageurl = window.location.href+"/page/"+id;
        let page = this.getPage(id);
        let sects = this.state.pages[page].sections;
        sects.push(sectionid);
        let pagebody = JSON.stringify({ 
                sections: sects
            });
        await fetch(pageurl, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: pagebody
        })
        .then(data => data.json())
        .then(data => {
            let pages = this.state.pages;
            pages.splice(page,1);
            pages.push(data);
            this.setState({pages:pages})
        })
        .catch(err => console.log(err));
    }
    
    deleteSection(id){
        let url = window.location.href+"/section/"+id;
        fetch(url, {
            method: 'DELETE'
        })
        .then(() => {
            let sects = this.state.sections;
            let sect = this.getSection(id);
            sects.splice(sect,1);
            this.setState({sections:sects})
        })
        .catch(err => console.log(err));
    }
    
    renderPages(){
        let pages = this.state.pages;
        let lis = pages.map(page=>{
            let sects = page.sections.map(section =>{
                return <ListGroupItem tag="button" action id={section._id} onClick={this.createModalEditSection}>{section.title}</ListGroupItem>
            });
            return(
                <Col sm="6" md="4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{page.name}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <CardText>{page.url}</CardText>
                            <ListGroup>
                                {sects}
                            </ListGroup>
                        </CardBody>
                        <CardFooter>
                            <Button outline color="success" id={page._id} onClick={this.createModalCreateSection}>Add</Button>{' '}
                            <Button outline color="primary" id={page._id} onClick={this.createModalEditPage}>Edit</Button>{' '}
                            <Button outline color="danger">Delete</Button>
                        </CardFooter>
                    </Card>
                </Col>
            )
        });
        return(lis);
    }
     
    editSection(title,content,id){
        let url = window.location.href+"/section/"+id;
        let sect = this.getSection(id);
        let bod = JSON.stringify({ 
                title: title,
                content: content
            });
        fetch(url, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: bod
        })
        .then(data => data.json())
        .then(data => {
            let sects = this.state.sections;
            sects.splice(sect,1);
            sects.push(data);
            this.setState({sections:sects})
        })
        .catch(err => console.log(err));
    }
    
    editPage(title,url,id){
        let pageurl = window.location.href+"/page/"+id;
        let page = this.getPage(id);
        let bod = JSON.stringify({ 
                name: title,
                url: url
            });
        fetch(pageurl, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: bod
        })
        .then(data => data.json())
        .then(data => {
            let pages = this.state.pages;
            pages.splice(page,1);
            pages.push(data);
            this.setState({pages:pages})
        })
        .catch(err => console.log(err));
    }
    
    createPage(title,url){
        let bod = JSON.stringify({ 
                name: title,
                url: url
            });
        fetch(window.location.href+"/page/", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: bod
        })
        .then(data => data.json())
        .then(data => {
            let pages = this.state.pages;
            pages.push(data);
            this.setState({pages:pages})
        })
        .catch(err => console.log(err));
    }
    
    createModalCreateSection(event){
        this.setState({modal:<AdminCreateSection createSection={this.createSection} removeModal={this.removeModal} id={event.target.id}/>});
    }
    
    createModalCreatePage(event){
        console.log("create")
        this.setState({modal:<AdminCreatePage createPage={this.createPage} removeModal={this.removeModal}/>});
    }
    
    createModalEditSection(event){
        let section = this.state.sections[this.getSection(event.target.id)];
        this.setState({modal:<AdminEditSection editSection={this.editSection} deleteSection={this.deleteSection} removeModal={this.removeModal} section={section} />})
    }
    
    createModalEditPage(event){
        let page = this.state.pages[this.getPage(event.target.id)];
        this.setState({modal:<AdminEditPage editPage={this.editPage} deletePage={this.deletePage} removeModal={this.removeModal} page={page} />})
    }
    
    removeModal(){
        this.setState({modal:''});
    }
    
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col sm="6" md="2">
                        <h3>Pages:</h3>
                    </Col>
                    <Col sm="6" md="2">
                        <Button outline color="success" onClick={this.createModalCreatePage}>Add</Button>
                    </Col>
                </Row>
                <hr/>
                <Row className="mb-3">
                    {this.renderPages()}
                </Row>
                {this.state.modal}
            </Container>
        );
    }
}
export default Admin;