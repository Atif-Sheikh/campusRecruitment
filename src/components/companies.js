import React, { Component } from 'react';
// import {List, ListItem} from 'material-ui/List';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import * as firebase from 'firebase';
import FlatButton from 'material-ui/FlatButton';

class Companies extends Component{
    constructor(){
        super();
        this.state = {
            companies: [],
            keys: [],
        };
    };
    deleteCompany = (key) => {
        console.log(key);
        firebase.database().ref(`campus/students/${key}`).remove();
    };
    componentDidMount(){
        firebase.database().ref(`campus/students`).on('value', snap => {
            let companies = [];
            let keys = [];
            // let keys = Object.keys(snap.val());
            // let values = Object.values(snap.val());
            for(let key in snap.val()){
                if(snap.val()[key].signInType === 'Company'){   
                    companies.push(snap.val()[key]);
                    keys.push(key);                    
                }
            };
            // var filt = values.filter((val) => val.signInType === 'Company');
            // console.log(filt, 'filter');
            this.setState({
                companies,
                keys,
            });
        });
    };
    render(){
        return(
            <div>
                <h1>Companies List</h1>
                <Table>
                <TableHeader displaySelectAll={false}>    
                <TableRow>
                    <TableHeaderColumn style={{fontSize: '25px'}}>index</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '25px'}}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={{fontSize: '25px'}}>Email</TableHeaderColumn>
                    {
                        this.props.signInType === 'admin' ? <TableHeaderColumn style={{fontSize: '30px'}}>Delete</TableHeaderColumn>                    
                        : ''
                    }
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {
                        this.state.companies.map((company, index) => {
                            // return <ListItem style={{fontSize: '30px', float: 'left', marginLeft: '100px', marginTop: '20px'}} key={index} primaryText={`${index+1}: Company Name : ${ company.displayName} Email: ${company.email}`} />
                            return (<TableRow key={index}>
                              <TableRowColumn style={{fontSize: '20px'}}>{index+1}</TableRowColumn>
                              <TableRowColumn style={{fontSize: '20px'}}>{company.displayName}</TableRowColumn>
                              <TableRowColumn style={{fontSize: '20px'}}>{company.email}</TableRowColumn>
                              {
                                  this.props.signInType === 'admin' ? <TableRowColumn style={{fontSize: '20px'}}><FlatButton onClick={(e)=> {e.preventDefault(); this.deleteCompany(this.state.keys[index])}} style={{color: 'red'}} label="Delete" /></TableRowColumn>
                                  : ''
                              }
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