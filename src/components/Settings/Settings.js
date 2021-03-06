import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import { updateUser } from '../../actions'

import { Button, Preloader } from 'react-materialize';

class Settings extends React.Component {
    state = {
        name:'',
        age:'',
        city:'',
        isError:false,
        isSuccess:false
    }

    onSubmit = (e) => {
        e.preventDefault()
        let {name, city, age} = this.state;
        
        if((name.length && name.length < 20 )|| age.length || city.length){
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
    }

    render(){
        const settings = 
            this.props.isAuthenticate?
            <div key='key' className=''>
                <h3 className='center'>Settings</h3>
                <h5 className='center'>Change your name, age, city</h5>
                <div className="row">
                    <form onSubmit={this.onSubmit} className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input onChange={this.inputChange} value={this.state.name} id="name" type="text" className="validate"/>
                                <label htmlFor="name">Your name is {this.props.user.name}</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.inputChange} value={this.state.age} id="age" type="text" className="validate"/>
                                <label htmlFor="age">Your age is {this.props.user.age?this.props.user.age:'not defined yet'}</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.inputChange} value={this.state.city} id="city" type="text" className="validate"/>
                                <label htmlFor="city">Your city is {this.props.user.city?this.props.user.city:'not defined yet'}</label>
                            </div>
                        </div>
                        <Button>Save</Button>
                    </form>
                </div>
 
            </div>
            :
            <Redirect to='/' />
            return(
                <div className='container'>
                {this.state.isError?
                        this.state.name.length < 20?
                            <p className='alert alert-danger'>Please fill one field before submit !</p>
                            :
                            <p className='alert alert-danger'>Your name needs to contain less than 20 characters !</p>
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
                    <Preloader className="preloader" />
                    :
                    [settings]
                }
                </div>
            )
            }
        
        }

const mapDispatchToProps = dispatch =>{
    return {
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