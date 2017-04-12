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
                rule:{required:true,validator:'validateUsername'}, 
            },
            addr:{
                type:'text',
                label:'地址',
                name:'addr',
                rule:{required:true,validator:'validateUsername'},
            }
        } ;
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
        let formData = this.form.getFormData () ;
        let infoStr = JSON.stringify(formData,null,2) ;
        console.info('formData : ' ,infoStr) ;
    }
    toRender(){
        return (
            <div>
                <form  className="form-horizontal" role="form">
                    <FormItem form = {this.form} schema ={this.formSchema.username}></FormItem>
                    <FormItem form = {this.form} schema ={this.formSchema.addr}></FormItem>
                </form>

                <div className="form-group">
                    <div className="col-sm-offset-2">
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>保存</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBaseForm(UserInfoEditForm) ;

