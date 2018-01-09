import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import * as firebase from 'firebase';

class StudentInfo extends Component {
    constructor(){
        super();
        this.state = {
            displayName: '',
            isEdit: false,
            currentUID: '',
            skills: [],
            colification: '',
        }
    };
    componentDidMount(){
        let currentUID = '';
        let displayName = '';
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                currentUID = user.uid
            }
            firebase.database().ref(`campus/students/${currentUID}`).on('value', snap => {
                // console.log(snap.val());
                let value = Object.values(snap.val());
                displayName = value[0];
            this.setState({
                currentUID,
                displayName,
                });
            });
        });
    };
    render(){
        return(
            <div>
                <Paper style={style} zDepth={5}>
                    {
                        this.state.isEdit ? <div><TextField hintText="Hint Text" floatingLabelText="Name" />
                        <br />
                        <TextField hintText="Hint Text" floatingLabelText="Qualification" />                    
                            <br />
                        <TextField hintText="Hint Text" floatingLabelText="Skills" />                    
                            <br />
                        <RaisedButton label="Update Info" primary={true} /></div> : <div>
                        <List>
                            <ListItem primaryText={this.state.displayName} >Name:</ListItem>
                            <ListItem primaryText="Eric Hoffman" />
                            <ListItem primaryText="James Anderson" />
                            <ListItem primaryText="Kerem Suer" />
                        </List>
                        </div>
                    }
                </Paper>
            </div>
        );
    };
};

const style = {
    height: 500,
    width: 500,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

export default StudentInfo;