import React from 'react'
import {Link} from 'react-router-dom'
import{Button} from 'react-materialize'
class OtherFinishList extends React.Component{
    state={
        isOpen: false
    }
    toggleList = () =>{
        this.setState(prevState=>({
            isOpen:!prevState.isOpen
        }))
    }
    render(){
        const bookFinish = this.props.finishList.map(book=>{
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
                    <h6 style={{fontWeight:'bold'}}>Finish Book List</h6>
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
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookFinish}
                    </tbody>
                </table>
                :
                null    
                }
            </div>
        )
    }
}

export default OtherFinishList