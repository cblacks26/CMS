import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import renderHTML from 'react-render-html';

class Page extends Component {
    constructor(props){
        super(props);
        this.state= {
            sections: this.props.sections
        }
    }
  
    render() {
        let sects = this.state.sections.map((section) =>{
            return (
                <Row>
                    <h2>{renderHTML(section.title)}</h2>
                    <hr/>
                    <p>{renderHTML(section.content)}</p>
                </Row>
            )
        })
        return (
            <Container>
                {sects}
            </Container>
        );
    }
}

export default Page;