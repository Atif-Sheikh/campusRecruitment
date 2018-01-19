import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
// import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import * as firebase from 'firebase';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import StudentsList from './studentsList';
import PostJob from './postJob';
import Jobs from './jobs';
import '../App.css';

class CompanyHome extends Component {
    constructor(){
    super();
        this.state = {
            open: false,
            email: '',
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
        let email = '';
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                email = user.email;
                this.setState({signInUserUID: user.uid, email});
                firebase.database().ref(`campus/students/${this.state.signInUserUID}`).on('value', snap => {
                    // console.log(snap.val().displayName);
                    let val = snap.val();
                    signInType = val.signInType;
                    displayName = val.displayName;
                    // console.log(signInType, ':display name');            
                    this.setState({ signInType, displayName });
                });
            };
        });
    };
    render(){
        return(
            <div>
                <AppBar title='My App' onLeftIconButtonClick={() => this.toggleDrawer()}/>
                <Drawer style={{background: 'red'}} open={this.state.open} onToggleDrawer={this.toggleDrawer.bind(this)}>
                    <span className='closeTag' style={{fontSize: '40px', color: 'red', cursor: 'pointer', float: 'right'}} onClick={() => this.toggleDrawer()}>&times;</span>
                    <RaisedButton onClick={this.logout} style={{width: '80%', marginTop: '10px'}} label="Logout" primary={true} />
                    <MenuItem>SignIn type: { this.state.signInType }</MenuItem>
                    <MenuItem>User: { this.state.displayName }</MenuItem>
                </Drawer>
                <div>
                    <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    >
                    <Tab label="Post Job" value={0} />
                    <Tab label="Jobs" value={1} />
                    <Tab label="Students" value={2} />
                    </Tabs>
                    <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    >
                    <div>
                        <PostJob email={this.state.email} signInType={this.state.signInType} displayName={this.state.displayName} signInUserUID={this.state.signInUserUID} />
                    </div>
                    <div style={styles.slide}>
                        <Jobs signInType={this.state.signInType} UID={this.state.signInUserUID} />
                    </div>
                    <div style={styles.slide}>
                        <StudentsList />
                    </div>
                    </SwipeableViews>
                </div>
            </div>
        );
    }
};

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
    slide: {
      padding: 10,
    },
};

export default CompanyHome;
