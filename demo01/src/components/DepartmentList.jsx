import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import BaseModule from './BaseModule.jsx';

export default class DepartmentList extends BaseModule {
    constructor( props ){
        super( props ) ;
        this.handleClick = this.handleClick.bind(this) ;
    }
    componentDidMount(){
        console.info('获取数据.....') ;
    }
    handleClick (){
        console.info(`handleClick method is exec ... `) ;
        this.setState({success:false,msg:'查询用户列表出错了'}) ;
    }
    toRender(){
        //请求完成渲染
        let corpId = this.corpId;
        //console.info(corpId.test) ;
        return (<div onClick={this.handleClick}>hello world</div>)
    }
}