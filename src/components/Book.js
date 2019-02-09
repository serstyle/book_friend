import React from 'react';
import {Button, Modal} from 'react-materialize'

const Book = ({ title, authors, image, description }) =>{
	return(
		<div>
			<div class="col s12 m6 l6 xl4">
			    <div class="card horizontal">
			      <div class="card-image">
			        <img src={image} alt='cover' />
			      </div>
			      <div class="card-stacked">
			        <div class="card-content">
			          <h5>{title.length > 20 ? title.substring(0, 20) + '...' : title}</h5>
			          <p>author: {authors}</p>
			        </div>
			        <div class="card-action">
			          <a class="btn-floating waves-effect waves-light red"><i class="material-icons">add</i></a>
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