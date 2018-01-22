import React, { Component } from 'react';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import JobCard from './jobCard';

class Jobs extends Component{
    constructor(){
        super();
        this.state = {
            uids: '',
            jobs: [],
            jobKeys: [],
        };
    };
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            // let uids = user.uid;
            // this.setState({uids : uids})
            firebase.database().ref(`campus/jobs/`).on('value', snap => {
                let data = snap.val();
                let jobs = [];
                let jobKeys = [];
                // console.log(this.props.signInType);
                for(let keys in data){
                    // console.log(user.uid, ':::', data[keys].UID)
                    if(data[keys].UID === user.uid){
                        jobs.push(data[keys]);
                        jobKeys.push([keys])
                        // console.log(data[keys]);
                        // console.log(keys);
                    }
                };
                this.setState({jobs, jobKeys});
            });
        });
    };
    render(){
        return(
            <div>
                <h1 style={styles.headline}>Jobs List</h1>
                <Paper style={styles.paper} zDepth={2}>
                    {
                        // this.state.jobs.map((job, index) => {
                            <JobCard signInType={this.props.signInType} job={this.state.jobs} jobKeys={this.state.jobKeys} />
                        // })
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
    },
};
export default Jobs;