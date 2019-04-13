import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import { onRouteChange, loadUser, updateUser } from '../../actions'

import { Button } from 'react-materialize';

class Settings extends React.Component {
    state = {
        name:'',
        age:'',
        city:'',
        isError:false,
        isSuccess:false
    }
    componentDidMount(){
        this.props.onRouteChange(this.props.location.pathname)
        const {loadUser} = this.props
        loadUser()
    }

    onSubmit = (e) => {
        e.preventDefault()
        let {name, city, age} = this.state;
        
        if(name.length || age.length || city.length){
            this.props.updateUser({
                email:this.props.user.email,
                name:name,
                age:age,
                city:city,
            })
            this.setState({
                name:'',
                age:'',
                city:'',
                isSuccess:true,
                isError:false
            })
            setTimeout(()=>{
                this.setState({isSuccess:false})
            }, 3000)
        }
        else{
            this.setState({
                isError:true,
                isSuccess:false
            })
            setTimeout(()=>{
                this.setState({isError:false})
            }, 3000)
        }
    }
    inputChange = (e) =>{
        this.setState({[e.target.id]:e.target.value})
        console.log(this.state)
    }

    render(){
        const settings = 
            this.props.isAuthenticate?
            <div key='key' className=''>
                <h3 className='center'>Settings</h3>
                <h5 className='center'>Change your name, age, city</h5>
                <div class="row">
                    <form onSubmit={this.onSubmit} class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                                <input onChange={this.inputChange} value={this.state.name} id="name" type="text" class="validate"/>
                                <label for="name">Your name is '{this.props.user.name}'</label>
                            </div>
                            <div class="input-field col s12">
                                <input onChange={this.inputChange} value={this.state.age} id="age" type="text" class="validate"/>
                                <label for="age">Your age is '{this.props.user.age}'</label>
                            </div>
                            <div class="input-field col s12">
                                <input onChange={this.inputChange} value={this.state.city} id="city" type="text" class="validate"/>
                                <label for="city">Your city is '{this.props.user.city}'</label>
                            </div>
                        </div>
                        <Button>Save</Button>
                    </form>
                </div>
 
            </div>
            :
            <Redirect to='/' />
            return(
                <div>
                {this.state.isError?
                        <p className='alert alert-danger'>Please fill one field before submit !</p>
                        :
                        null
                }
                {this.state.isSuccess?
                        <p className='alert alert-success'>Update with SUCCESS !</p>
                        :
                        null
                }
                {
                    this.props.isLoading?
                    <p>wait</p>
                    :
                    [settings]
                }
                </div>
            )
            }
        
        }

const mapDispatchToProps = dispatch =>{
    return {
        onRouteChange:(route) => dispatch(onRouteChange(route)),
        loadUser: ()=>dispatch(loadUser()),
        updateUser: (user)=>dispatch(updateUser(user))
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