import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import renderHTML from 'react-render-html';

class Home extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <Container fluid>
                <div className="welcome-bg"></div>
                <Row className="welcome">
                    <Col s="12" md="6">
                        <h1 className="font-weight-bold display-4 align-middle">{renderHTML(this.props.sections[0].title)}</h1>
                        <h5 className="align-middle">{renderHTML(this.props.sections[0].content)}</h5>
                    </Col>
                </Row>
                <Row className="pl-3 section">
                    <Col s="12" md="6" >
                        <h2 className="font-weight-bold display-4">{renderHTML(this.props.sections[1].title)}</h2>
                        <p className="lead">{renderHTML(this.props.sections[1].content)}</p>
                    </Col>
                    <Col md="6" className="d-none d-md-block text-center">
                        <img src="https://scontent.fapa1-2.fna.fbcdn.net/v/t1.0-9/15179065_1171773429566764_2539231458253804220_n.jpg?_nc_cat=0&oh=e34c2e78d2fbafecb337ffd7dd946b08&oe=5BD81F4A" className="rounded-circle" />
                    </Col>
                </Row>
                <Row className="pl-3 section">
                    <Col md="6" className="d-none d-md-block text-center">
                        <img src="https://scontent.fapa1-2.fna.fbcdn.net/v/t1.0-9/15179065_1171773429566764_2539231458253804220_n.jpg?_nc_cat=0&oh=e34c2e78d2fbafecb337ffd7dd946b08&oe=5BD81F4A" className="rounded-circle" />
                    </Col>
                    <Col s="12" md="6">
                        <h2 className="font-weight-bold display-4">{renderHTML(this.props.sections[2].title)}</h2>
                        <p className="lead">{renderHTML(this.props.sections[2].content)}</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;