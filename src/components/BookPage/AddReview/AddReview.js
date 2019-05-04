import React from 'react'
import {connect} from 'react-redux'
import {addReview, addReviewToggleContainer} from '../../../actions'
import {Button, RadioGroup} from 'react-materialize'

class AddReview extends React.Component{
    state = {
        note:0,
        review:''
    }
    onSubmitAddReview = (e) => {
        e.preventDefault()
        const {bookid, userid, booktitle} = this.props
        const data = {...this.state, bookid, userid, booktitle}
        this.props.addReview(data)
        this.props.addReviewToggleContainer()
    }
    render(){
        return(
            <div className="row container grey lighten-4" style={{position:'relative'}}>
                <Button onClick={()=>this.props.addReviewToggleContainer()} className='red' style={{
                    position: 'absolute',
                    top: '0',
                    right: '0'
                }}>
                    X
                </Button>
                <h3>Add a review</h3>
                <form onSubmit={this.onSubmitAddReview} className="col s12">
                <div className="row">
                    <div className="col s12">
                    <p>Evaluation:</p>
                    <RadioGroup
                        onChange={e => this.setState({note:e.target.value})}
                        name="note"
                        label="Evaluation"
                        value="0"
                        options={[{label: '0',value: '0'},
                        {label: '1',value: '1'},
                        {label: '2',value: '2'},
                        {label: '3',value: '3'},
                        {label: '4',value: '4'},
                        {label: '5',value: '5'}
                        ]}
                        />
                    </div>
                    <div className="input-field col s12">
                        <textarea onChange={e => this.setState({review:e.target.value})} id="textarea1" className="materialize-textarea" required></textarea>
                        <label htmlFor="textarea1">Review</label>
                    </div>
                    <Button>Add</Button>
                </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userid: state.Authentication.user.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addReview: (data) => dispatch(addReview(data)),
        addReviewToggleContainer: () => dispatch(addReviewToggleContainer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview)