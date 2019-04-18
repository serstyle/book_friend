import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {onSubmitBookById, delBook, addBookReading} from '../../../../actions'
import {CollectionItem, Modal, Button, Preloader} from 'react-materialize'

class BookToRead extends React.Component{
    render(){
        const {title, authors, description, bookid} = this.props
        const bookDescription = (
            this.props.isPending || this.props.err?
                <Preloader className='preloader' size="big" />
            :
                this.props.book.volumeInfo.description?
                    this.props.book.volumeInfo.description
                :
                    <span>There is no description</span>)
        return(
            <CollectionItem className="avatar">
                <img src="https://image.flaticon.com/icons/svg/33/33932.svg" alt="" className="circle" />
                <Link to={`/book/${bookid}`}>
                    <span className="title">
                        {title.length>40? title.substring(0, 40) + '...' : title}
                    </span>
                </Link>
                <p className='authors'>{authors}</p>
                <p>{description}</p>
                <div className='bottom-book'>
                    <Modal
                        options={{
                            preventScrolling:false,
                            onOpenStart:()=>this.props.requestBook(bookid)
                            }}
                        header={title}
                        trigger={<Button>See more</Button>}>
                        {bookDescription}
                        <br />
                        <Link to={`/book/${bookid}`}><Button>See reviews</Button></Link>
                    </Modal>
                    <Button
                        onClick={()=>this.props.addBookReading(this.props)}
                        floating
                        className="green"
                        icon="add"
                    />
                    <Button
                        onClick={()=>this.props.delBook(bookid)}
                        floating
                        className="red"
                        icon="delete"
                    />
                </div>
            </CollectionItem>
        )
    }
} 

const mapDispatchToProps = dispatch =>{
    return{
        requestBook: (bookid)=>dispatch(onSubmitBookById(bookid)),
        delBook: (bookid)=> dispatch(delBook(bookid)),
        addBookReading: (book) =>dispatch(addBookReading(book))
    }
}

const mapStateToProps = state =>{
    return{
        book:state.requestBookById.book,
        isPending:state.requestBookById.isPending,
        err: state.requestBookById.err
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookToRead)