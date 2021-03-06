import React from 'react'
import OtherToReadList from './OtherToReadList/OtherToReadList'
import OtherReadingList from './OtherReadingList/OtherReadingList'
import OtherFinishList from './OtherFinishList/OtherFinishList'
import {Preloader} from 'react-materialize'


class OtherBookList extends React.Component {
    state={
        toreadbooklist:[],
        readingbooklist:[],
        finishbooklist:[],
        isPending:true
    }
    componentDidMount(){
        const id = this.props.id
        const bookLists = ['toreadbooklist', 'readingbooklist', 'finishbooklist']
        bookLists.map(bookList => {
        return fetch(`${process.env.REACT_APP_DOMAIN}otherprofile/${bookList}`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('token')
                },
                body: JSON.stringify({id})
            })
            .then(res => res.json())
            .then(data => this.setState({[bookList]:data, isPending:false}))
        })
    }
    componentDidUpdate(prevProps){
        const id = this.props.id
        if(prevProps.id !== id){
            this.setState({isPending:true})
            const bookLists = ['toreadbooklist', 'readingbooklist', 'finishbooklist']
            bookLists.map(bookList => {
            return fetch(`${process.env.REACT_APP_DOMAIN}otherprofile/${bookList}`, {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : localStorage.getItem('token')
                    },
                    body: JSON.stringify({id})
                })
                .then(res => res.json())
                .then(data => this.setState({[bookList]:data, isPending:false}))
            })
        }
    }
    render(){
        return this.state.isPending?
        <Preloader className='preloader' size="big"/>
        :
            <div>
                <h5>BookList :</h5>
                <OtherToReadList toReadList={this.state.toreadbooklist}/>

                <OtherReadingList readingList={this.state.readingbooklist}/>

                <OtherFinishList finishList={this.state.finishbooklist}/>
            </div>
        
    }
}

export default OtherBookList;