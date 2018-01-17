import React, { Component } from 'react';
// import {List, ListItem} from 'material-ui/List';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import * as firebase from 'firebase';

class Companies extends Component{
    constructor(){
        super();
        this.state = {
            companies: [],
        };
    };
    componentDidMount(){
        firebase.database().ref(`campus/students`).on('value', snap => {
            // let keys = Object.keys(snap.val());
            let values = Object.values(snap.val());
            // console.log('snap', snap.val(), 'keys', keys, 'values', values);
            var filt = values.filter((val) => val.signInType === 'Company');
            // console.log(filt, 'filter');
            this.setState({
                companies: filt,
            });
        });
    };
    render(){
        return(
            <div>
                <h1>Companies List</h1>
                <Table>
                <TableHeader>    
                <TableRow>
                    <TableHeaderColumn style={{fontSize: '30px'}}>index</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '30px'}}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '30px'}}>Email</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        this.state.companies.map((company, index) => {
                            // return <ListItem style={{fontSize: '30px', float: 'left', marginLeft: '100px', marginTop: '20px'}} key={index} primaryText={`${index+1}: Company Name : ${ company.displayName} Email: ${company.email}`} />
                            return (<TableRow key={index}>
                              <TableRowColumn style={{fontSize: '20px'}}>{index+1}</TableRowColumn>
                              <TableRowColumn style={{fontSize: '20px'}}>{company.displayName}</TableRowColumn>
                              <TableRowColumn style={{fontSize: '20px'}}>{company.email}</TableRowColumn>
                            </TableRow>)
                        })
                    }
                    {/* <ListItem primaryText="Inbox" />
                    <ListItem primaryText="Starred" />
                    <ListItem primaryText="Sent mail" />
                    <ListItem primaryText="Drafts" />
                    <ListItem primaryText="Inbox" /> */}
                </TableBody>    
                </Table>
        </div>
        );
    };
}

export default Companies;