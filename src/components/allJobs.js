import React, { Component } from 'react';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import JobCard from './jobCard';

class AllJobs extends Component{
    constructor(){
        super();
        this.state = {
            UID: '',
            jobs: [],
            signInType: '',
            jobkey : [],
            studentDetails: [],
        };
    };
    componentWillReceiveProps(props){
        // console.log(props.signInType, '::::type');
        this.setState({signInType: props.signInType});
    };
    componentDidMount(){
        let studentDetails = [];
        firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref(`campus/students/${user.uid}`).on('value', snap => {
                // console.log(Object.values(snap.val()));
                studentDetails = Object.values(snap.val()); 
                // console.log(studentDetails);
                this.setState({studentDetails}); 
                // console.log(this.state.studentDetails);
            });
        });
        firebase.database().ref(`campus/jobs`).on('value', snap => {
            let jobs = [];
            let data = snap.val()
            let jobkey = [];
            // console.log(snap.val());
            for(let key in data){
                // if(this.state.UID === snap.val()[key].UID){
                    // console.log('UID', Object.values(snap.val()));
                    //dfgdfgdfgdfgf
                    // jobs.push(Object.values(snap.val()));
                    jobs.push(data[key]);
                    jobkey.push(key)
                // }
            };
            this.setState({jobs , jobkey});
        });
    };
    render(){
        // console.log(this.props.adminType)
        return(
            <div>
                <h1 style={styles.headline}>Jobs List</h1>
                <Paper style={styles.paper} zDepth={5}>
                    {
                        // this.state.jobs.map((job, index) => {
                        //     return (<JobCard key={index} indexKey={Object.keys(job[index])} signInType={this.state.signInType} job={Object.values(job[index])} index={index} />)
                        // })
                        <JobCard adminType={this.props.adminType} studentDetails={this.state.studentDetails} signInType={this.state.signInType} job={this.state.jobs} jobkeys={this.state.jobkey} />
                    }
                </Paper>
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
    paper: {
        maxHeight: 450,
        minWidth: '90%',
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        overflowX: 'none',
        overflowY: 'scroll',
        background: 'rgba(0,0,0,0.2)',
    },
};
export default AllJobs;