import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
import StudentsList from './studentsList';
import AllJobs from './allJobs';
import Companies from './companies';

class AdminHome extends Component{
    constructor(props) {
    super(props);
        this.state = {
            slideIndex: 0,
            displayName: '',
            email: '',
            signInType: '',
        };
    };
    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };
    logout = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.history.push('/');
            });
    };    
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            let UID = user.uid;
            firebase.database().ref(`campus/students/${UID}`).on('value', snap => {
                // console.log(snap.val().email);
                this.setState({displayName: snap.val()['displayName'], email: snap.val()['email'], signInType: snap.val()['signInType']});
            })
        });
    };
    render(){
        return(
            <div>
                <AppBar showMenuIconButton={false} title={<span>Admin:{ ' '+this.state.displayName} </span>} iconElementRight={<FlatButton onClick={this.logout} label="Logout" />} />
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    >
                    <Tab label="Students" value={0} />
                    <Tab label="Companies" value={1} />
                    <Tab label="Jobs" value={2} />
                    </Tabs>
                    <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    >
                    <div>
                        <StudentsList signInType={this.state.signInType} />
                    </div>
                    <div style={styles.slide}>
                        <Companies signInType={this.state.signInType} />
                    </div>
                    <div style={styles.slide}>
                        <AllJobs adminType={this.state.signInType} />
                    </div>
                    </SwipeableViews>
            </div>
        );
    };
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
export default AdminHome;