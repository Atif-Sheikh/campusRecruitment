import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import '../App.css';
import logo from './images/best.jpg';
import { NavLink } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import * as firebase from 'firebase';
import image from './images/abc.jpg';

class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      email: 'kashif@gmail.com',
      password: '',
      error: '',
      loading: false,
    };
  };
  onChangeEmail(evt){
    // console.log(evt.target.value);
    this.setState({
      email: evt.target.value,
      error: '',
    });
  };
  renderHome = () => {
    let userUID = '';
    this.setState({loading: true});
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        // console.log(user);
        userUID = user.uid;
        firebase.database().ref(`campus/students/${userUID}`).on('value', (snap) => {
          // console.log(snap.val().signInType);
          this.setState({loading: false});
          if(snap.val().signInType === 'Student'){
            this.props.history.push('./home');
          }else{
            this.props.history.push('./companyHome');
          };
        });
      }
    });
  };
  onChangePassword(evt){
    // console.log(evt.target.value);
    this.setState({
      password: evt.target.value,
      error: '',      
    });
  };
  onButtonPress(evt){
    evt.preventDefault();
    const { email, password } = this.state;
    this.setState({
      error: '',
      loading: true,
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({
        email: '',
        password: '',
        error: '',
        loading: false,
      });
      this.renderHome();
    })
      .catch((e) => {
        this.setState({
          email: '', 
          password: '', 
          error: e.message, 
          loading: false,
        });
      });
  };
  render(){    
    return(
      <div style={styles.background}>
        <Paper className='wrap' zDepth={4} rounded={false}>
        <img alt='' style={{width: '100%', height: '150px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}} src={logo} />  
        <h1 className='heading'>Campus recuirtment</h1>
        <h3>SignIn</h3>
        <div className='formComponent'>
            <form onSubmit={this.onButtonPress.bind(this)}>
            <TextField
                hintText="Enter Email"
                floatingLabelText="Email address"
                type="text"
                defaultValue={this.state.email}
                onChange={this.onChangeEmail.bind(this)}
            /><br />  
            <TextField
                hintText="Enter Password"
                floatingLabelText="Password"
                type="password"
                onChange={this.onChangePassword.bind(this)}
            />
            <p style={{color: 'red'}}>{ this.state.error }</p>
            {
                this.state.loading ? <LinearProgress
                mode='indeterminate'
                style={{width: '100%', margin: '10 auto'}}
            /> : <RaisedButton label="Submit" type='submit' to='/home' primary={true} style={{margin: '10'}} /> 
            }
            <p><NavLink to='/signup' style={{color: '#123abc', textDecoration: 'none', fontWeight: 'bold'}}>don't have account ?</NavLink></p>
            </form>
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
      height: '1000px',
    },
};

export default SignIn;