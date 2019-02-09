import React from 'react'
import {Row, Input} from 'react-materialize'

class Signin extends React.Component {
	render(){
		return(
			<Row>
    			<Input type="text" label="name" s={12} />
				<Input type="password" label="password" s={12} />
			</Row>
			)
	}
}

export default Signin