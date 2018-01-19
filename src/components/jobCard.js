import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List'; 
import RaisedButton from 'material-ui/RaisedButton';    
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';        
import * as firebase from 'firebase';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

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
        open: false,
        jobs:  [],
        applicants: [],
        label: 'Apply For Job',
    };
};
    applyButton = (key) => {
        const { studentDetails } = this.props;
        let data = [];
        // console.log(studentDetails);
        if(studentDetails[3] && studentDetails[4]){
            let uid = firebase.auth().currentUser.uid
            firebase.database().ref(`campus/jobs/${key}/applicants/${uid}`).on('value', snap => {
                // console.log(snap.val());
                for(let key in snap.val()){
                    // console.log(snap.val()[key].qualification);
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
        }
        else{
            alert('please update your profile!');
        }
    };
    deleteButton = (key) => {
        // console.log(key);
        firebase.database().ref(`campus/jobs/${key}`).remove();
    };
    handleClick = (jobKey) => {
        // This prevents ghost click.
        // event.preventDefault();
        // console.log(jobKey);
        let applicants = [];
        firebase.database().ref(`campus/jobs/${jobKey}/applicants`).on('value', snap => {
            // console.log(Object.values(snap.val()));
            if(snap.val()){
                applicants = Object.values(snap.val());
                console.log(applicants);
                this.setState({
                    open: true,
                    applicants,
                })
            }else{
                alert('No applicant Found!!!');
                this.setState({open: false});
            };
        });
        //     this.setState({
        //     open: true,
        //     applicants,
        // });
    };
    
    handleRequestClose = () => {
        this.setState({
          open: false,
        });
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
    renderCard = (index) => {
        if(this.props.signInType === 'Student'){
            return <RaisedButton onClick={(e)=> {e.preventDefault();this.applyButton(this.props.jobkeys[index])}} label={this.state.label} primary={true} />
        }else if(this.props.adminType === 'admin'){
            return <section>
                <RaisedButton style={{marginBottom: '2px'}} label='View applicants!' primary={true} onClick={(e)=>{e.preventDefault(); this.handleClick(this.props.jobkeys[index])}} />
                    <br />
                <RaisedButton style={{width: '100%', marginBottom: '10px'}} backgroundColor='#03A9F4' primary={true} onClick={(e)=> {this.deleteButton(this.props.jobkeys[index])}} label='Delete Job' />            
            </section>
        }else if(this.props.signInType === 'Company'){
            return <section>
                <RaisedButton style={{marginBottom: '2px'}} label='View applicants!' primary={true} onClick={(e)=>{e.preventDefault(); this.handleClick(this.props.jobKeys[index])}} />
                    <br />
                <RaisedButton style={{width: '100%', marginBottom: '10px'}} backgroundColor='#03A9F4' primary={true} onClick={(e)=> {this.deleteButton(this.props.jobKeys[index])}} label='Delete Job' />            
            </section>
        }
    };
    render(){
        // console.log(this.props.studentDetails[0]);
        // console.log(this.props.indexKey[this.props.index], 'key', this.props.index, 'index');
        // console.log(this.state.studentDetails);
        const actions = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleRequestClose}
            />,
        ];
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
                                <div>
                                {this.renderCard([index])}
                                {/* // this.props.signInType === 'Student' ?  */}
                                {/* //     <RaisedButton onClick={(e)=> {e.preventDefault();this.applyButton(this.props.jobkeys[index])}} label={this.state.label} primary={true} /> */}
                                {/* // </div> : <div> */}
                                {/* // <RaisedButton style={{marginBottom: '2px'}} label='View applicants!' primary={true} onClick={(e)=>{e.preventDefault(); this.handleClick(this.props.jobKeys[index])}} /> */}
                                {/* <Popover
                                    open={this.state.open}
                                    // anchorEl={this.state.anchorEl}
                                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    onRequestClose={this.handleRequestClose}
                                    >
                                    <Menu style={{borderRadius: '5px' ,marginLeft: '10px', width: '200px', maxHeight: '400px', background: '#B3E5FC', overflow: 'scroll'}}>
                                        {
                                            this.state.applicants.map((student, index) => {
                                                return <section key={index.toString()}>
                                                                <h3>Student Details</h3>
                                                                <MenuItem>Email:{student.email}</MenuItem>
                                                                <MenuItem>Qualification:{student.qualification}</MenuItem>
                                                                <MenuItem>Skills:{student.skills}</MenuItem>
                                                                <hr />                                                                 
                                                </section>
                                            })
                                        }
                                    </Menu>
                                </Popover> */}
                                    <Dialog
                                    actions={actions}
                                    modal={false}
                                    open={this.state.open}
                                    onRequestClose={this.handleClose}
                                    autoScrollBodyContent={true}
                                    >Applicants
                                    <Table>
                                    <TableHeader>    
                                    <TableRow>
                                        <TableHeaderColumn style={{fontSize: '30px'}}>Name</TableHeaderColumn>
                                        <TableHeaderColumn style={{fontSize: '30px'}}>Email</TableHeaderColumn>
                                        <TableHeaderColumn style={{fontSize: '30px'}}>Qualification</TableHeaderColumn>
                                        <TableHeaderColumn style={{fontSize: '30px'}}>Skills</TableHeaderColumn>                                        
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                    {
                                        this.state.applicants.map((student, index) => {
                                            return<TableRow  key={index.toString()}>
                                                    <TableRowColumn style={{fontSize: '15px'}}>{student.displayName}</TableRowColumn>                                                    
                                                    <TableRowColumn style={{fontSize: '15px'}}>{student.email}</TableRowColumn>
                                                    <TableRowColumn style={{fontSize: '15px'}}>{student.qualification}</TableRowColumn>
                                                    <TableRowColumn style={{fontSize: '15px'}}>{student.skills}</TableRowColumn>                                                                                                        
                                            </TableRow>
                                        })
                                    }
                                    </TableBody>
                                    </Table>
                                    {/* <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                        {radios}
                                    </RadioButtonGroup> */}
                                    </Dialog>
                                    {/* <br /> */}
                                {/* <RaisedButton style={{width: '100%', marginBottom: '10px'}} backgroundColor='#03A9F4' primary={true} onClick={(e)=> {this.deleteButton(this.props.jobKeys[index])}} label='Delete Job' /> */}
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