import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PostJob extends Component {
    render(){
        return(
            <div>
                <Paper style={style} zDepth={3}>
                    <TextField floatingLabelText="Job title" />
                        <br />
                    <TextField floatingLabelText="Job Type" />
                        <br />
                    <TextField floatingLabelText="Required Qualification" />
                        <br />
                    <TextField floatingLabelText="Required Experience" />
                        <br />
                    <TextField defaultValue='20000' type='number' hintText="Hint Text" floatingLabelText="Salary" />
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