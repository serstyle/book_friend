import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import { onRouteChange, loadUser } from '../../actions'

class Settings extends React.Component {
    state = {
        isNameOpen:false
    }
    componentDidMount(){
        this.props.onRouteChange(this.props.location.pathname)
        this.props.loadUser()
    }
    render(){
        const settings = 
            this.props.isAuthenticate?
            <div className=''>
                <h3 className='center'>Settings</h3>
                <h5 className='center'>Change your name, age, city</h5>
                {
                    this.props.isLoading?
                    <p>wait</p>
                    :
                    <form className="container">
                        <div class="row">
                            <h6 className='col m1 s12 input-title'>Name: </h6>
                            <div class="input-field col m11 s12">
                                {this.state.isNameOpen?
                                <input id="name" type="text" class="validate" placeholder='Type your name' required/>
                                :
                                this.props.user.name}
                                
                            </div>
                            <h6 className='col m1 s12 input-title'>Age: </h6>
                            <div class="input-field col m11 s12">
                                <input id="age" type="text" class="validate" placeholder='Type your age'/>
                            </div>
                            <h6 className='col m1 s12 input-title'>City: </h6>
                            <div class="input-field col m11 s12">
                                <input id="City" type="text" class="validate" placeholder='Type your City'/>
                            </div>
                        </div>
                    </form>
                }
            </div>
            :
            <Redirect to='/' />
            return(
                [settings]
            )
            }
        
        }

const mapDispatchToProps = dispatch =>{
    return {
        onRouteChange:(route) => dispatch(onRouteChange(route)),
        loadUser: ()=>dispatch(loadUser())
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.Authentication.isLoading,
        user: state.Authentication.user,
        isAuthenticate: state.Authentication.isAuthenticate
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);