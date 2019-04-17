import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addBook} from '../../actions'
import {Button, Modal} from 'react-materialize'


class Book extends React.Component{
	handleAddBook = () => {
		const book = this.props
		this.props.addBook(book)
	}

	render(){
		const isBookReadingList = this.props.userBookListReading.filter(e => e.bookid === this.props.bookid).length > 0
		const addBook = 
		<div>
			{	
				this.props.userBookList.filter(e => e.bookid === this.props.bookid).length > 0 || isBookReadingList?
				<Button
						floating
						className="green"
						icon="check"
					/>
					:
					<Button
						onClick={this.handleAddBook}
						floating
						className="red"
						icon="add"
					/>
			}

		</div>
		return(
			<div>
				<div>
					<div className="card horizontal hoverable">
						<div className="card-image">
							<img src={this.props.image} alt='cover' />
						</div>
						<div className="card-stacked">
							<div className="card-content">
								<h6 style={{'fontWeight': 'bold'}}>{this.props.title.length > 40 ? this.props.title.substring(0, 40) + '...' : this.props.title}</h6>
								<p>author: {this.props.authors}</p>
								{this.props.isError && this.props.bookid ?
									<p className='error-booklist'>error</p>
									:
									null
									}
							</div>
							<div className="card-action">
								{addBook}
								<Modal
									options={{preventScrolling:false}}
									header={this.props.title}
									trigger={<Button>ABOUT</Button>}>
									<p>{this.props.description}</p>
									<br />
                        			<Link to={`/book/${this.props.bookid}`}>See more</Link>
								</Modal>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
	}
}

const mapDispatchToProps = dispatch => {
	return{
		addBook: (book)=> dispatch(addBook(book))
	}
}

const mapStateToProps = state => {
	return{
		userBookList: state.userBookList.bookList,
		userBookListReading: state.userBookList.bookListReading,
		isPending: state.userBookList.isPending
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)