import React, { Component } from 'react';
// import { List, ListItem } from 'material-ui/List';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import * as firebase from 'firebase';

class StudentsList extends Component {
    constructor(){
        super();
        this.state = {
            students: [],
        };
    };
    componentDidMount(){
        firebase.database().ref(`campus/students`).on('value', snap => {
            let value = Object.values(snap.val());
            // console.log(value, ':values');
            let filt = value.filter((val) => val.signInType === 'Student');
            this.setState({
                students: filt,
            });
        });
    };
    render(){
        return(
            <div>
                <h2>StudentsList</h2>
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn  style={{fontSize: '30px'}}>Name</TableHeaderColumn>
                        <TableHeaderColumn  style={{fontSize: '30px'}}>Email</TableHeaderColumn>
                        <TableHeaderColumn  style={{fontSize: '30px'}}>Qualification</TableHeaderColumn>
                        <TableHeaderColumn  style={{fontSize: '30px'}}>Skills</TableHeaderColumn>                        
                    </TableRow>
                </TableHeader>
                <TableBody>        
                    {
                        this.state.students.map((student, index) => {
                            // return <ListItem key={index} 
                            //     primaryText={`Name: ${student.displayName} Email: ${student.email} Qualification: ${student.qualification} Skills: ${student.skills}`} 
                            //     style={{fontSize: '20px', float: 'left', marginLeft: '100px', marginTop: '20px'}} 
                            //     hoverColor='darkCyan'
                            // />
                        return<TableRow key={index}>
                            <TableRowColumn  style={{fontSize: '20px'}}>{student.displayName}</TableRowColumn>
                            <TableRowColumn style={{fontSize: '20px'}}>{student.email}</TableRowColumn>
                            <TableRowColumn style={{fontSize: '20px'}}>{student.qualification}</TableRowColumn>
                            <TableRowColumn style={{fontSize: '20px'}}>{student.skills}</TableRowColumn>                            
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