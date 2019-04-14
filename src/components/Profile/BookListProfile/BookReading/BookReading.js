import React from 'react'
import {connect} from 'react-redux'
import {onSubmitBookById, delBookReading} from '../../../../actions'
import {CollectionItem, Modal, Button, Preloader} from 'react-materialize'

class BookReading extends React.Component{
    render(){
        const {title, authors, description, bookid} = this.props
        const bookDescription = (
            this.props.isPending?
                <Preloader className='preloader' size="big" />
            :
                this.props.book.volumeInfo.description?
                    this.props.book.volumeInfo.description
                :
                    <span>There is no description</span>)
        return(
            <CollectionItem className="avatar">
                <img src="https://image.flaticon.com/icons/svg/33/33932.svg" alt="" className="circle" />
                <span className="title">
                    {title.length>40? title.substring(0, 40) + '...' : title}
                </span>
                <p className='authors'>{authors}</p>
                <p>{description}</p>
                <div className='bottom-book'>
                    <Modal
                        modalOptions={{
                            preventScrolling:false,
                            onOpenStart:() => this.props.requestBook(bookid)
                            }}
                        header={title}
                        trigger={<Button>See more</Button>}>
                        {bookDescription}
                    </Modal>
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
        delBook: (bookid)=> dispatch(delBookReading(bookid))
    }
}

const mapStateToProps = state =>{
    return{
        book:state.requestBookById.book,
        isPending:state.requestBookById.isPending
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookReading)