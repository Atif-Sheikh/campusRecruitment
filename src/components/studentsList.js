import React, { Component } from 'react';
// import { List, ListItem } from 'material-ui/List';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';

class StudentsList extends Component {
    constructor(){
        super();
        this.state = {
            students: [],
            keys: [],
        };
    };
    deleteStudent = (key) => {
        console.log(key);
        firebase.database().ref(`campus/students/${key}`).remove();
    };
    componentDidMount(){
        firebase.database().ref(`campus/students`).on('value', snap => {
            let keys = [];
            let students = [];
            // let value = Object.values(snap.val());
            // console.log(value, ':values');
            // let filt = value.filter((val) => val.signInType === 'Student');
            for(let key in snap.val()){
                if(snap.val()[key]['signInType'] === 'Student'){
                    // console.log(key);
                    keys.push(key);
                    students.push(snap.val()[key]);
                }
            }
            this.setState({
                students,
                keys,
            });
        });
    };
    render(){
        return(
            <div>
                <h2>StudentsList</h2>
                <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn  style={{fontSize: '30px'}}>Name</TableHeaderColumn>
                        <TableHeaderColumn  style={{fontSize: '30px'}}>Email</TableHeaderColumn>
                        <TableHeaderColumn  style={{fontSize: '30px'}}>Qualification</TableHeaderColumn>
                        <TableHeaderColumn  style={{fontSize: '30px'}}>Skills</TableHeaderColumn>
                        {
                            this.props.signInType === 'admin' ? <TableHeaderColumn  style={{fontSize: '30px'}}>Delete</TableHeaderColumn>
                            : ''
                        }                        
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>        
                    {
                        this.state.students.map((student, index) => {
                            // return <ListItem key={index} 
                            //     primaryText={`Name: ${student.displayName} Email: ${student.email} Qualification: ${student.qualification} Skills: ${student.skills}`} 
                            //     style={{fontSize: '20px', float: 'left', marginLeft: '100px', marginTop: '20px'}} 
                            //     hoverColor='darkCyan'
                            // />
                        return<TableRow key={index.toString()}>
                            <TableRowColumn  style={{fontSize: '20px'}}>{student.displayName}</TableRowColumn>
                            <TableRowColumn style={{fontSize: '20px'}}>{student.email}</TableRowColumn>
                            <TableRowColumn style={{fontSize: '20px'}}>{student.qualification}</TableRowColumn>
                            <TableRowColumn style={{fontSize: '20px'}}>{student.skills}</TableRowColumn>
                            {
                                this.props.signInType === 'admin' ? <TableRowColumn style={{fontSize: '20px'}}>{<FlatButton style={{color: 'red'}} onClick={(e)=>{e.preventDefault(); this.deleteStudent(this.state.keys[index])}} label="Delete" />}</TableRowColumn> : ''
                            }                            
                        </TableRow>    
                        })
                    }
                </TableBody>    
                </Table>
            </div>
        );
    };
};

export default StudentsList;