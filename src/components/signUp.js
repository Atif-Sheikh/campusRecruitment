import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import '../App.css';
import logo from './images/best.jpg';
import * as firebase from 'firebase';
import { NavLink } from 'react-router-dom';
import image from './images/abc.jpg';

class SignupForm extends Component{
  constructor(){
    super();
    // this.db = firebase.database().ref().child('campus');
    this.state = {
      displayName: '',
      email: '',
      password: '',
      passwordError: '',
      loader: false,
      signInType: 'Student',
    }
  };
  handleChange = (event, index, value) => {
    this.setState({signInType: value});
  };
  onChangeEmail(e){
    // console.log(e.target.value);
    this.setState({
      email: e.target.value,
      error: '',
    });
  };
  onchangeName(e){
    this.setState({
      displayName: e.target.value,
      error: '',
    });
  };
  onChangePassword(e){
    // console.log(e.target.value);    
    this.setState({
      password: e.target.value,
      error: '',      
    });
  };
  homerender = () => {
     return this.state.signInType === 'Student' ? this.props.history.push('/home') : this.props.history.push('/companyHome');    
  };
  onButtonPress(e){
    e.preventDefault();
    const { displayName, email, password, signInType } = this.state;
    this.setState({
      error: '',
      loading: true,
    });
    if(displayName !== '' || email !== '' || password !=='' ){
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((e) => {
          // console.log('then', e.uid);
          firebase.database().ref(`campus/students/${e.uid}`).set({
            displayName ,email , signInType, 
          })
          this.homerender();
          this.setState({
            loading: false,
          });
  
        })
        .catch((e) => {
          console.log('catch', e);
          this.setState({
            error: e.message,
            loading: false,
          });
        });
      } else{
        alert('please enter Field Correctly.');
        this.setState({
          loading: false,
        });
      };
  };
  render(){
    return(
      <div style={styles.background}>
        <Paper className='wrap' zDepth={4} rounded={false}>  
        <img alt='' style={{width: '100%', height: '150px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}} src={logo} />  
        <div className='signupForm'>
            <Paper zDepth={3} rounded={true}></Paper>
            <h1>Signup</h1>
            <div style={{display: 'inline'}}>
            <span style={{position: 'relative', right: '15px', fontWeight: 'bold', fontSize: '20px' }}>Account type:</span>
            <DropDownMenu style={{position:"relative", top: '20px'}}value={this.state.signInType} onChange={this.handleChange}>
              <MenuItem value='Student' label="Student" primaryText="Student" />
              <MenuItem value='Company' label="Company" primaryText="Company" />
            </DropDownMenu>
            </div>
            <form onSubmit={this.onButtonPress.bind(this)}>
                <TextField
                hintText="Enter name"
                floatingLabelText="Name"
                type="text"
                onChange={this.onchangeName.bind(this)}                  
            /><br />
            <TextField
                hintText="Enter Email"
                floatingLabelText="Email"
                type="text"
                onChange={this.onChangeEmail.bind(this)}      
            /><br />  
            <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                onChange={this.onChangePassword.bind(this)}      
            /><p style={{color: 'red', margin: '2px'}}>{ this.state.error }</p>
                {
                    this.state.loading ? <LinearProgress
                    mode='indeterminate'
                    style={{width: '100%', margin: '10 auto'}}
                /> : <RaisedButton label="Create Account!" type='submit' primary={true} style={{margin: '10', fontWeight: 'bold'}} /> 
                }
            </form>
            <p><NavLink to='/' style={{color: '#123abc', textDecoration: 'none', fontWeight: 'bold'}}>
                Already Have an account ?
            </NavLink></p>        
        </div>
      </Paper>
      </div>
    );
  }
};
const styles = {
    background: {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    height: '690px',
  },
};

export default SignupForm;