'use strict';
import React,{Component} from 'react';
import {stringify} from '../common/common.js' ;
//引入样式文件
import Api from '../api/Api.js' ;
import BaseTable from '../components/BaseTable.jsx' ;
import Navbar from '../components/Navbar.jsx' ;


export default class UserQueryPage extends Component{
  constructor(props){
      super(props) ;
      this.state={
          tableFields:[],
          list:[]
      } ;
  }
  componentDidMount() {
      let promise = Api.getUserListTableSchema() ;
      promise.then(tableFields=>{
          this.setState({tableFields}) ;
      }) ;
  }
  handleQueryOper(){
       let promise = Api.queryUserList() ;
       promise.then(list=>{
           this.setState({list}) ;
       }) ;
  }
  handleDeleteItem = (delItem)=>{
    console.info('---------->'  + stringify(delItem)) ;
    let newList = this.state.list.filter(function(item){
        return delItem != item ;
    }) ;
    this.setState({list:newList}) ;
  }
  handleEditItem(item){
      console.info('---------->'  + stringify(item)) ;
  }
  render(){
      return (
          <div>
            <Navbar/>
            <button type="button" className="btn btn-primary" onClick={this.handleQueryOper.bind(this)}>查询</button>
            <br/>
            <BaseTable tableFields={this.state.tableFields} list={this.state.list}>
                <i className="glyphicon glyphicon-trash" handleClick={this.handleDeleteItem}></i>
                <i className="glyphicon glyphicon-pencil" handleClick={this.handleEditItem}></i>
            </BaseTable>
          </div>
      ) ;
  }
}

