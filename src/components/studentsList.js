import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
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
                <List>
                    {
                        this.state.students.map((student, index) => {
                            return <ListItem key={index} 
                                primaryText={`Name: ${student.displayName} Email: ${student.email} Qualification: ${student.qualification} Skills: ${student.skills}`} 
                                style={{fontSize: '20px', float: 'left', marginLeft: '100px', marginTop: '20px'}} 
                                hoverColor='darkCyan'
                            />
                        })
                    }
                </List>
            </div>
        );
    };
};

export default StudentsList;