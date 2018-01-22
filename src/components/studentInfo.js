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
            email: '',
            isEdit: false,
            currentUID: '',
            skills: '',
            qualification: '',
        };
    };
    changeName = (e) => {
        this.setState({
            displayName: e.target.value,
        });
    };
    changeSkills = (e) => {
        // console.log(e.target.value);
        this.setState({
            skills: e.target.value,
        });
    };
    changeQualification = (e) => {
        // console.log(e.target.value);
        this.setState({
            qualification: e.target.value,
        });
    };
    submitForm = (e) => {
        e.preventDefault();
        // console.log(this.props.signInUserUID, ':UID');
        let UID = this.props.signInUserUID;
        let signInType = this.props.signInType;        
        const { displayName, skills, qualification, email } = this.state;
        if(displayName && skills && qualification){
            firebase.database().ref(`campus/students/${UID}`).set({displayName, email, skills, qualification, signInType});
            this.setState({
                isEdit: !this.state.isEdit,
            });
            alert('successfully updated!');
        }else{
            alert('please Enter all fields!');
        }
    };
    onToggle = () => {
        this.setState({
            isEdit: !this.state.isEdit,
        });
    };
    componentDidMount(){
        let currentUID = '';
        let displayName = '';
        let email = '';
        let qualification = '';
        let skills = '';
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                currentUID = user.uid;
                email = user.email;
                // console.log('email:', user.email);
            }
            firebase.database().ref(`campus/students/${currentUID}`).on('value', snap => {
                // console.log(snap.val());
                let value = Object.values(snap.val());
                displayName = value[0];
                qualification = value[2];
                skills = value[4];
            this.setState({
                currentUID,
                displayName,
                email,
                skills,
                qualification,
                });
            });
        });
    };
    render(){
        return(
            <div>
                <Paper style={style} zDepth={5}>
                    {
                        this.state.isEdit ? <div><form onSubmit={this.submitForm}><TextField onChange={this.changeName} defaultValue={this.state.displayName} floatingLabelText="Name" />
                        <br />
                        <TextField onChange={this.changeQualification} defaultValue={this.state.qualification} floatingLabelText="Qualification" />                    
                            <br />
                        <TextField onChange={this.changeSkills} defaultValue={this.state.skills} floatingLabelText="Skills" />                    
                            <br />
                        <RaisedButton type='submit' label="Update Details" style={{margin: '5px'}} primary={true} />
                        <RaisedButton onClick={this.onToggle} label="Cancel" style={{margin: '5px'}} primary={true}/>
                        </form></div> : <div>
                        <List>
                            <ListItem style={{fontSize: '20px', textAlign: 'left', marginLeft: '50px', marginTop: '20px'}} primaryText={`Name: ${this.state.displayName}`} />
                            <ListItem style={{fontSize: '20px', textAlign: 'left', marginLeft: '50px'}} primaryText={`Contact: ${this.state.email}`} />                            
                            <ListItem style={{fontSize: '20px', textAlign: 'left', marginLeft: '50px'}} primaryText={`Skills: ${this.state.skills}`} />
                            <ListItem style={{fontSize: '20px', textAlign: 'left', marginLeft: '50px'}} primaryText={`Qualification: ${this.state.qualification}`} />                            
                        </List>
                        <RaisedButton onClick={this.onToggle} label="Update Info" primary={true} />
                        </div>
                    }
                </Paper>
            </div>
        );
    };
};

const style = {
    height: 400,
    width: 400,
    padding: 10,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

export default StudentInfo;