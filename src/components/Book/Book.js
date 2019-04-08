import React from 'react';
import {Button, Modal} from 'react-materialize'

const Book = ({ title, authors, image, description }) =>{
	return(
		<div>
			<div>
			    <div className="card horizontal">
			      <div className="card-image">
			        <img src={image} alt='cover' />
			      </div>
			      <div className="card-stacked">
			        <div className="card-content">
			          <h5>{title.length > 40 ? title.substring(0, 40) + '...' : title}</h5>
			          <p>author: {authors}</p>
			        </div>
			        <div className="card-action">
			          <button className="btn-floating waves-effect waves-light red"><i className="material-icons">add</i></button>
			          <Modal
						  header={title}
						  trigger={<Button>ABOUT</Button>}>
						  <p>{description}</p>
						</Modal>
			        </div>
			      </div>
			    </div>
		  	</div>
		</div>
		)
}

export default Book