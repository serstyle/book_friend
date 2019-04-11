import React from 'react';

import {Col, Collection, CollectionItem} from 'react-materialize'

class BookReading extends React.Component{

    render(){
        return(
            
                <Col l={4} m={12} s={12}>
                    <Collection>
                    <CollectionItem><h4>Currently Read</h4></CollectionItem>
                    <CollectionItem className="avatar">
                        <img src="https://materializecss.com/images/yuna.jpg" alt="" className="circle" />
                        <span className="title">
                            Title
                        </span>
                        <p>
                            First Line 
                            <br/>
                            Second Line
                        </p>
                        </CollectionItem>
                        <CollectionItem className="avatar">
                        <img src="https://materializecss.com/images/yuna.jpg" alt="" className="circle" />
                        <span className="title">
                            Title
                        </span>
                        <p>
                            First Line 
                            <br/>
                            Second Line
                        </p>
                        </CollectionItem>
                    </Collection>
                </Col>
         
        )
    }
}

export default BookReading;