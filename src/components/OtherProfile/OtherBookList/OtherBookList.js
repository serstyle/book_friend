import React from 'react'
import OtherToReadList from './OtherToReadList/OtherToReadList'
import OtherReadingList from './OtherReadingList/OtherReadingList'
import OtherFinishList from './OtherFinishList/OtherFinishList'


class OtherBookList extends React.Component {
    state={
        toreadbooklist:[],
        readingbooklist:[],
        finishbooklist:[]
    }
    componentDidMount(){
        const id = this.props.id
        const bookLists = ['toreadbooklist', 'readingbooklist', 'finishbooklist']
        bookLists.map(bookList => {
        return fetch(`${process.env.REACT_APP_DOMAIN}otherprofile/${bookList}`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            })
            .then(res => res.json())
            .then(data => this.setState({[bookList]:data}))
        })
    }
    render(){
        return(
            <div className='otherProfileDiv'>
                <h5>BookList :</h5>
                <OtherToReadList toReadList={this.state.toreadbooklist}/>

                <OtherReadingList readingList={this.state.readingbooklist}/>

                <OtherFinishList finishList={this.state.finishbooklist}/>
            </div>
        )
    }
}

export default OtherBookList;