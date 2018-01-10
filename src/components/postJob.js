import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PostJob extends Component {
    render(){
        return(
            <div>
                <Paper style={style} zDepth={3}>
                    <TextField hintText='...' floatingLabelText="Job title" />
                        <br />
                    <TextField hintText="Hint Text" floatingLabelText="Job Type" />
                        <br />
                    <TextField hintText="Hint Text" floatingLabelText="Required Qualification" />
                        <br />
                    <TextField hintText="Hint Text" floatingLabelText="Required Experience" />
                        <br />
                    <TextField hintText="Hint Text" floatingLabelText="Salary" />
                        <br />            
                    <RaisedButton style={{margin: '20px'}} label="Post Job" primary={true} />        
                </Paper>
            </div>
        );
    };
};

const style = {
    height: 450,
    width: 350,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

export default PostJob;