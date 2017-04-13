import React,{Component} from 'react';
import BaseModule from '../components/BaseModule.jsx';
import CreateBaseForm from '../components/CreateBaseForm.jsx'; 
import {getUserEditFormSchemaApi} from '../api/Api.js' ;
import FormItem from '../components/FormItem.jsx' ;

class UserInfoEditForm extends BaseModule {
    constructor( props ){
        super( props ) ;
        this.formSchema = {
            username:{
                type:'text',
                label:'用户名',
                name:'username',
                rule:{required:true,validator:'validate1'}, 
            },
            addr:{
                type:'text',
                label:'地址',
                name:'addr',
                rule:{required:true},
            },
            email:{
                type:'email',
                label:'邮箱',
                name:'email',
                defaultValue:'',
                rule:{required:true,email:true} 
            }
        } ;
    }

    //初始化页面其他数据
    initPageOtherParam(){
        console.info('初始化页面其他数据') ;
        setTimeout(()=>{
            this.form.setSingleFieldValue('email','666') ;
        },300) ;
    }

    //实现自定义校验的方法
    getCustomValidatorFn(validatorName){
        if(validatorName=='validate1'){
            return this.validateUserName ;
        }
    }

    validateUserName(fieldValue,fieldName){
        console.info(`fieldValue : ${fieldValue} ,fieldName : ${fieldName} `) ; 
        if(fieldValue === 'admin'){
             return "用户名不能为admin" ;
        }
        return null ;
    }

    //初始化数据
    //如果不使用异步加载的formSchema，而是自己定制页面的form的话，需要实现这个方法
    getInitialFormData(){
        return {
            username:'yicj',
            addr:''
        } ;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let formData = this.form.getAllFormData () ;
        let infoStr = JSON.stringify(formData,null,2) ;
        console.info('formData : ' ,infoStr) ;
        this.form.validateAllForm() ;
    }
    toRender(){
        return (
            <div>
                <form  className="form-horizontal" role="form">
                    <FormItem form = {this.form} schema ={this.formSchema.username}></FormItem>
                    <FormItem form = {this.form} schema ={this.formSchema.addr}></FormItem>
                    <FormItem form = {this.form} schema ={this.formSchema.email}></FormItem>
                </form>

                <div className="form-group">
                    <div className="col-sm-offset-2">
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>保存</button>
                        &nbsp; &nbsp; &nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.form.resetForm}>重置</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBaseForm(UserInfoEditForm) ;

