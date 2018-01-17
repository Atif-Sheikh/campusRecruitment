import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import logo from './images/check.png'
import * as firebase from 'firebase';

class PostJob extends Component {
    constructor(props){
        super(props);
        this.state = {
            form: true,
            UID: '',
            jobTitle: '',
            jobType: '',
            requiredQualification: '',
            requiredExperience: '',
            salary: 20000,
            email: '',
            displayName: '',
            signInType: '',
            error: '',
        };
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { jobTitle, jobType, requiredQualification, requiredExperience, salary, UID, email, displayName, signInType } = this.state;
        if(jobTitle !== '' && jobType !== '' && requiredExperience !== '' && requiredQualification !== ''){
            firebase.database().ref(`campus/jobs/`).push({jobTitle, jobType, requiredQualification, requiredExperience, salary, UID, email, displayName, signInType});        
            this.setState({form: false});
        }else{
            this.setState({error: 'Please submit all Fields...', jobTitle: '', jobType:'', requiredQualification:'', requiredExperience:'' });
        };
    };
    componentWillReceiveProps(props){
        let UID = props.signInUserUID;
        let email = props.email;
        let displayName = props.displayName;
        let signInType = props.signInType;
        this.setState({UID, email, displayName, signInType});
    };
    componentDidMount(){
        // let UID = this.props.signInUserUID;
        // let email = this.props.email;
        // console.log(email, '::' , UID);
        // let studentUIDs = [];
        // firebase.database().ref(`campus/students`).on('value', snap => {
            // let keys = Object.keys(snap.val());
            // let val = Object.values(snap.val());
            // let filt = val.filter(a => a.signInType === 'Student');
            // console.log('filt', filt);
            // for(let k in snap.val()){
            //     if(snap.val()[k].signInType === 'Student'){
            //         studentUIDs.push(k);
            //     };
            // };
            // this.setState({ studentUIDs, UID });
            // console.log(this.state.studentUIDs, 'keys');  
        // });
    };
    render(){
        return(
            <div>
                {
                    this.state.form ? <Paper style={style} zDepth={3}>
                    <h2 style={style.headline}>Post New Job</h2>
                    <form onSubmit={this.onSubmit}>
                        <TextField floatingLabelText="Job title" onChange={(e) => this.setState({jobTitle: e.target.value, label: 'Post Job', error: '' })} />
                            <br />
                        <TextField floatingLabelText="Job Type" onChange={(e) => this.setState({jobType: e.target.value, label: 'Post Job', error: ''})} />
                            <br />
                        <TextField floatingLabelText="Required Qualification" onChange={(e) => this.setState({requiredQualification: e.target.value, label: 'Post Job', error: ''})} />
                            <br />
                        <TextField floatingLabelText="Required Experience" onChange={(e) => this.setState({requiredExperience: e.target.value, label: 'Post Job', error: ''})} />
                            <br />
                        <TextField defaultValue={this.state.salary} type='number' onChange={(e) => this.setState({salary: e.target.value, label: 'Post Job', error: ''})} floatingLabelText="Salary" />
                            <br />
                        <span style={style.error}>{this.state.error}</span>
                            <br />                
                        <RaisedButton type='submit' style={{margin: '20px'}} label='Post Job' primary={true} />        
                    </form>
                </Paper> : <div>
                    <img alt='img' style={style.logo} src={logo} /><br />
                    <RaisedButton onClick={() => this.setState({form: true})} style={{margin: '20px'}} label='Post Another Job' primary={true} />
                </div>
                }
            </div>
        );
    };
};

const style = {
    height: 550,
    width: 350,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    error: {
        color: 'red',
    },
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    logo: {
        marginTop: 100,
    }
};

export default PostJob;