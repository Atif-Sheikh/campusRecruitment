import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List'; 
import RaisedButton from 'material-ui/RaisedButton';             
import * as firebase from 'firebase';

class JobCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            // jobTitle: '',
            // jobType: '',
            // requiredExperience: '',
            // qualification: '',
            // salary: '',
            // signInType: '',
            // UID: '',
            // skills: '',
            // displayName: '',
            // email: '',
            studentDetails: [],
            studentType: '',
            jobs:  [],
            label: 'Apply For Job',
        };
    };
    applyButton = (key) => {
        const { studentDetails } = this.props;
        let data = [];
        // console.log('e:r' ,key);
        // console.log(studentDetails);
        let uid = firebase.auth().currentUser.uid
        firebase.database().ref(`campus/jobs/${key}/applicants/${uid}`).on('value', snap => {
            console.log(snap.val());
            for(let key in snap.val()){
                console.log(snap.val());
                data.push(snap.val()[key]);
            };
        });
        // console.log(data[1]);
        // console.log(studentDetails);
        // console.log(studentDetails[1]);
        if(data[1] !== studentDetails[1]){
            // console.log(data.email, 'emails' , studentDetails[0][1])
        firebase.database().ref(`campus/jobs/${key}/applicants/${uid}`).set({
            displayName: studentDetails[0], email: studentDetails[1], 
            qualification: studentDetails[2], signInType: studentDetails[3], skills: studentDetails[4]});
            alert('You have successFully apply!');
        }else{
            alert('you have already applied!');
        };
    };
    deleteButton = (key) => {
        // console.log(key);
        firebase.database().ref(`campus/jobs/${key}`).remove();
    };
    // componentWillReceiveProps(props){
    //     let jobs = Object.values(props.job);
    //     let studentType = props.signInType;
    //     let studentDetails = props.studentDetails;
    //     this.setState({jobs, studentType, studentDetails});
    //     // console.log(props);
    // };
    // componentDidMount(){
    //     console.log(this.props.job ,'did mount!');
    //     let studentDetails = [];
    //     firebase.auth().onAuthStateChanged(user => {
    //         firebase.database().ref(`campus/students/${user.uid}`).on('value', snap => {
    //             // console.log(Object.values(snap.val()));
    //             studentDetails = Object.values(snap.val()); 
    //             // console.log(studentDetails);
    //             this.setState({studentDetails}); 
    //             // console.log(this.state.studentDetails);
    //         });
    //     });
    // };
    render(){
        // console.log(this.props.job)
        // console.log(this.props.indexKey[this.props.index], 'key', this.props.index, 'index');
        // console.log(this.state.studentDetails);
        return(
            <div>
                {
                    this.props.job.map((job, index) => {
                        return <Paper key={index} style={styles.paper} zDepth={5}>
                        <h2 style={styles.header}>{job.displayName}</h2>
                        <List style={styles.list}>
                            <ListItem primaryText={`Job Type: ${job.jobType}`} />
                                <br />
                            <ListItem primaryText={`Title: ${job.jobTitle}`} />
                                <br />
                            <ListItem primaryText={`Required Experience: ${job.requiredExperience}`} />
                                <br />
                            <ListItem primaryText={`Required Qualification: ${job.requiredQualification}`} />
                                <br />
                            <ListItem primaryText={`Salary: $${job.salary}`} />
                                <br />
                            {
                                this.props.signInType === 'Student' ? <div>
                                    <RaisedButton onClick={(e)=> {e.preventDefault();this.applyButton(this.props.jobkeys[index])}} label={this.state.label} primary={true} />
                                </div> : <div>
                                <RaisedButton style={{marginBottom: '2px'}} label='View applicants!' primary={true} onClick={()=> alert()} />
                                    <br />
                                <RaisedButton style={{width: '100%', marginBottom: '10px'}} backgroundColor='#03A9F4' primary={true} onClick={(e)=> {this.deleteButton(this.props.jobKeys[index])}} label='Delete Job' />
                                </div>
                            }                    
                        </List>
                    </Paper>
                    })
                }
            </div>  
        );
    };
};
const styles = {
    paper: {
        height: 412,
        width: 320,
        margin: 12,
        marginLeft: 24,
        textAlign: 'center',
        background: 'skyblue',         
        float: 'left',
        overflow: 'hidden',
        fontWeight: 'bold',
        borderRadius: '5px',
    },
    header: {
        width: '100%', 
        fontSize: 30,
        height: 40, 
        marginTop: '1px', 
        background: '#03A9F4',
        color: 'rgba(0,0,0,0.7)'
    },
    list: {
        fontSize: '5px',
        padding: '5px',       
        color: 'rgba(0,0,0,0.5)',
    },
};
export default JobCard;