import React from 'react'
import {Link} from 'react-router-dom'
import{Button} from 'react-materialize'
class OtherReadingList extends React.Component{
    state={
        isOpen: false
    }
    toggleList = () =>{
        this.setState(prevState=>({
            isOpen:!prevState.isOpen
        }))
    }
    render(){
        const bookReading = this.props.readingList.map(book=>{
            let booktitle = book.title.length > 20?
                book.title.substring(0, 20) + '...'
                :
                book.title
            return(
            <tr key={book.bookid}>
                <td><Link to={`/book/${book.bookid}`}>{booktitle}</Link></td>
                <td>{book.authors}</td>
            </tr>)
        })
        return(
            <div style={{margin:'60px 0'}}>
                <div style={{display:'flex'}}>
                    <h6 style={{fontWeight:'bold'}}>Reading List</h6>
                    {this.state.isOpen?
                        <Button
                            onClick={this.toggleList}
                            floating
                            small
                            className="black"
                            icon="expand_less"
                        />
                        :
                        <Button
                            onClick={this.toggleList}
                            floating
                            small
                            className="black"
                            icon="expand_more"
                        />
                    }
                </div>
                {this.state.isOpen?
                this.props.readingList.length?
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookReading}
                    </tbody>
                </table>
                :
                <p className='discret'>No books here</p>
                :
                null    
                }
            </div>
        )
    }
}

export default OtherReadingList