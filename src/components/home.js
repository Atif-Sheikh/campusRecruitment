import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
// import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import '../App.css';
import Companies from './companies';
import StudentInfo from './studentInfo';
import AllJobs from './allJobs';
import logo from './images/abc.jpg';

class Home extends Component {
    constructor(){
    super();
        this.state = {
            open: false,
            signInUserUID: '',
            signInType: '',
            displayName: '',
            slideIndex: 0,
        };
    };
    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
    };
    toggleDrawer = () =>{
        this.setState({
            open: !this.state.open
        });
    };
    logout = () => {
        firebase.auth().signOut()
            .then(() => {
                // console.log('logout');
                this.props.history.push('/');
            })
    };
    componentDidMount(){
        let signInType = '';
        let displayName = '';
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                // console.log(user.uid);
                let UID = user.uid;
                firebase.database().ref(`campus/students/${UID}`).on('value', snap => {
                    //   console.log(snap.val().displayName);
                    let val = snap.val();
                    signInType = val['signInType'];
                    displayName = val['displayName'];
                    this.setState({ signInType, displayName });
                })
                this.setState({signInUserUID: user.uid});
            };
        });
    };
    render(){
        return(
            <div style={styles.background}>
                <AppBar title='My App' onLeftIconButtonClick={() => this.toggleDrawer()}/>
                <Drawer containerStyle={{backgroundColor: '#F0F4C3'}} open={this.state.open} onToggleDrawer={this.toggleDrawer.bind(this)}>
                    <span className='closeTag' style={{fontSize: '40px', color: 'red', cursor: 'pointer', float: 'right', marginRight: '20px'}} onClick={() => this.toggleDrawer()}>&times;</span>
                    <RaisedButton onClick={this.logout} style={{width: '70%', marginTop: '10px'}} label="Logout" primary={true} />
                    <MenuItem>SignIn type: { this.state.signInType }</MenuItem>
                    <MenuItem>User: { this.state.displayName }</MenuItem>
                </Drawer>
                <div>
                    <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    >
                    <Tab label="Update Info" value={0} />
                    <Tab label="See Jobs" value={1} />
                    <Tab label="Companies" value={2} />
                    </Tabs>
                    <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    >
                    <div>
                        <h2 style={styles.headline}>Student Info</h2>
                        <StudentInfo signInUserUID={this.state.signInUserUID} signInType={this.state.signInType} />
                    </div>
                    <div style={styles.slide}>
                        <AllJobs signInType={this.state.signInType} />
                    </div>
                    <div style={styles.slide}>
                        <Companies />
                    </div>
                    </SwipeableViews>
                </div>
            </div>
        );
    }
};
const styles = {
    headline: {
      fontSize: 30,
      paddingTop: 16,
      fontWeight: 400,
    },
    background: {
        backgroundImage: `url(${logo})`,
        backgroundSize: 'cover',
        height: '740px',
    },
    slide: {
      padding: 10,
    },
};
export default Home;
