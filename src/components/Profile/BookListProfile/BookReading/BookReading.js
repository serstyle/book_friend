import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {onSubmitBookById, delBookReading, addBookFinish} from '../../../../actions'
import {CollectionItem, Modal, Button, Preloader} from 'react-materialize'

class BookReading extends React.Component{
    render(){
        const {title, authors, description, bookid} = this.props
        const bookDescription = (
            this.props.isPending || this.props.err?
                <Preloader className='preloader' size="big" />
            :
                this.props.book.description?
                    this.props.book.description
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
                            onOpenStart:() => this.props.requestBook(bookid)
                            }}
                        header={title}
                        trigger={<Button>See more</Button>}>
                        {bookDescription}
                        <br />
                        <Link to={`/book/${bookid}`}><Button>See reviews</Button></Link>
                    </Modal>
                    <Button
                        onClick={()=>this.props.addBookFinish(this.props)}
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
        delBook: (bookid)=> dispatch(delBookReading(bookid)),
        addBookFinish: (book) =>dispatch(addBookFinish(book))
    }
}

const mapStateToProps = state =>{
    return{
        book:state.requestBookById.book,
        isPending:state.requestBookById.isPending,
        err: state.requestBookById.err
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookReading)