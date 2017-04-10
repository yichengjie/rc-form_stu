import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import BaseModule from './BaseModule.jsx';

export default class DepartmentList extends BaseModule {
    constructor( props ){
        super( props ) ;
        this.handleClick = this.handleClick.bind(this) ;
        //这个地方需要注意，不能直接使用`this.state = {...}`,否则BaseModel中的state将会被完全替换掉。
    }
    //初始化数据
    getInitialState(){
        return {
            count:0
        } ;
    }
    componentDidMount(){
        console.info('获取数据.....') ;
    }
    handleClick (){
        console.info(`handleClick method is exec ... `) ;
        let nameFormObj = {name:'yicj'} ;
        let nameErrorObj = {name:'name 错误'} ;
        let addrFormObj = {addr:'henan'} ;
        let addrErrorObj = {addr:'addr 错误'} ;
        //this.setFieldValue({formData:nameFormObj}) ;
        //this.setFieldValue({formData:nameErrorObj}) ;
        this.setFormData(nameFormObj) ;
        this.setFormError(nameErrorObj) ;
        //
        //this.setFieldValue({formData:addrFormObj}) ;
        //this.setFieldValue({formError:addrErrorObj}) ;
        this.setFormData(addrFormObj) ;
        this.setFormError(addrErrorObj) ;
        //
        this.setFieldValue({count:this.state.count+1}) ;
        //
        // this.setState(function(prevState){
        //     let newObj = Object.assign({},prevState,{count:prevState.count+1}) ;
        //     return newObj ;
        // }) ;
        // this.setState(function(prevState){
        //     let newObj = Object.assign({},prevState,{count:prevState.count+1}) ;
        //     return newObj ;
        // }) ;
        // this.setState(function(prevState){
        //     let newObj = Object.assign({},prevState,{count:prevState.count+1}) ;
        //     return newObj ;
        // }) ;
    }
    toRender(){
        //请求完成渲染
        let corpId = this.corpId;
        //console.info(corpId.test) ;
        return (<div onClick={this.handleClick}>
                <p> hello world </p>
                <p>
                    formData name : {this.state.formData.name}
                </p> 
                <p>
                    formError name : {this.state.formError.name}
                </p>
                <hr/>
                <br/>
                <p>
                    formData addr : {this.state.formData.addr} 
                </p> 
                <p>
                    formError addr : {this.state.formError.addr} 
                </p>
                <br/>
                <hr/>
                <p>count : {this.state.count}</p> 
            </div>)
    }
}