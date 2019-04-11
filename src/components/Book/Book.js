import React from 'react';
import {connect} from 'react-redux'
import {addBook} from '../../actions'
import {Button, Modal} from 'react-materialize'


class Book extends React.Component{
	handleAddBook = () => {
		const book = this.props
		this.props.addBook(book)
	}

	render(){
		const addBook = 
		<div>
			{
				this.props.userBookList.filter(e => e.bookid === this.props.bookid).length > 0?
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
					<div className="card horizontal">
						<div className="card-image">
							<img src={this.props.image} alt='cover' />
						</div>
						<div className="card-stacked">
							<div className="card-content">
								<h5>{this.props.title.length > 40 ? this.props.title.substring(0, 40) + '...' : this.props.title}</h5>
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
									modalOptions={{preventScrolling:false}}
									header={this.props.title}
									trigger={<Button>ABOUT</Button>}>
									<p>{this.props.description}</p>
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
		isPending: state.userBookList.isPending
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)