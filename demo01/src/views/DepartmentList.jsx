import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import BaseForm from '../components/BaseForm.jsx';

export default class DepartmentList extends BaseForm {
    constructor( props ){
        super( props ) ;
        console.info('DepartmentList constructor ... ') ;
        this.handleClick = this.handleClick.bind(this) ;
        //这个地方需要注意，不能直接使用`this.state = {...}`,否则BaseModel中的state将会被完全替换掉。
    }
    //初始化数据
    getInitialState(){
        return {
            count:2,
            plain1:'1',
            plain2:'2'
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
        let plain1 = {plain1:'plain1 test'} ;
        let plain2 = {plain2:'plain2 test'} ;
        //设置formData的值
        this.setFormData(nameFormObj) ;
        this.setFormError(nameErrorObj) ;
        //设置formError的值
        this.setFormData(addrFormObj) ;
        this.setFormError(addrErrorObj) ;
        //
        //同步setState方式
        this.setState(function(prevState){
            let newCountObj = {count:prevState.count+1}
            return Object.assign({},prevState,newCountObj) ;
        }) ;
        this.setState(function(prevState){
            let newCountObj = {count:prevState.count+1}
            return Object.assign({},prevState,newCountObj) ;
        }) ;
        //设置简单扁平化对象的值
        this.setState(plain1) ;
        this.setState(plain2) ;
       
    }
    toRender(){
        //请求完成渲染
        let corpId = this.corpId;
        let formData = this.getFormData () ;
        let formError = this.getFormError () ;
        
        //console.info(corpId.test) ;
        return (<div onClick={this.handleClick}>
                <p> hello world </p>
                <p>
                    formData name : {formData.name}
                </p> 
                <p>
                    formError name : {formError.name}
                </p>
                <hr/>
                <br/>
                <p>
                    formData addr : {formData.addr} 
                </p> 
                <p>
                    formError addr : {formError.addr} 
                </p>
                <br/>
                <hr/>
                <p>plainState plain1 : {this.state.plain1}</p>
                <p>plainState plain2 : {this.state.plain2}</p>
                <br/>
                <hr/>
                <p>count : {this.state.count}</p> 
            </div>)
    }
}