import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
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
                this.setState({signInUserUID: user.uid});
            };
        firebase.database().ref(`campus/students/${this.state.signInUserUID}`).on('value', snap => {
        //   console.log(snap.val().displayName);
            let val = snap.val();
            signInType = val.signInType;
            displayName = val.displayName;
            this.setState({ signInType, displayName });
        })
        });
    };
    render(){
        return(
            <div>
                <AppBar title='My App' onLeftIconButtonClick={() => this.toggleDrawer()}/>
                <Drawer open={this.state.open} onToggleDrawer={this.toggleDrawer.bind(this)}>
                    <span className='closeTag' style={{fontSize: '40px', color: 'red', cursor: 'pointer', float: 'right', marginRight: '20px'}} onClick={() => this.toggleDrawer()}>&times;</span>
                    <RaisedButton onClick={this.logout} style={{marginTop: '10px', marginLeft: '5px'}} label="Logout" primary={true} />
                    <Link to="/home"><MenuItem>SignIn type: { this.state.signInType }</MenuItem></Link>
                    <Link to="/"><MenuItem>User: { this.state.displayName }</MenuItem></Link>
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
                        <StudentInfo />
                    </div>
                    <div style={styles.slide}>
                        slide n°2
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
    slide: {
      padding: 10,
    },
};
export default Home;
