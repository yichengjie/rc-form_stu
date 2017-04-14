import React,{Component} from 'react';
import BaseModule from '../components/BaseModule.jsx';
import CreateBaseForm from '../components/CreateBaseForm.jsx'; 
import Api, {getUserEditFormSchemaApi} from '../api/Api.js' ;
import {dealPromise4Callback} from '../common/common.js' ;
///////////////////////////////////////////////////////////
import FormItem from '../components/FormItem.jsx' ;

class UserInfoEditForm extends BaseModule {
    constructor( props ){
        super( props ) ;
        this.formSchema = {
                serviceType:{
                type:'select',
                label:'服务类型',
                name:'serviceType',
                defaultValue:'F',
                rule:{required:true,validator:'customValidateServiceType'},
                options:[
                    {name:'选择',value:''},
                    {name:'F类型-显示邮箱',value:'F'},
                    {name:'M类型-隐藏邮箱',value:'M'},
                    {name:'T类型-显示邮箱',value:'T'}
                ],
            },
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
            },
            effDate:{
                type:'date',
                label:'生效日期',
                name:'effDate',
                defaultValue:'',
                rule:{required:true,date:true} 
            }
        } ;
    }

    componentDidMount() {
        this.initPageOtherParam() ;
    }

    //初始化页面其他数据
    initPageOtherParam(){
       console.info('初始化页面其他数据') ;
        let id = '1';
        this.showLoadingIcon() ;
        dealPromise4Callback(Api.queryUserById(id),(retData)=>{
            this.hideLoadingIcon() ;
            let formDataDB = retData.formData ;
            this.form.setFieldValueObj(formDataDB,false) ;

            this.dealResult4Edit(formDataDB) ;
        });
    }

    //特殊处理一些数据
    dealResult4Edit(formDataDB){
        if(formDataDB.serviceType == 'M'){
            this.form.hideSingleField('email') ;
        }
    }
    //实现自定义校验的方法
    getCustomValidatorFn(validatorName){
        // if(validatorName=='validate1'){
        //     return this.validateUserName ;
        // }
        return this[validatorName] ;
    }

    customValidateServiceType(fieldValue,fieldName){
        let username = 'yicj-no-m' ;
        let age = '11' ;
        let descr = 'test-no-m' ;
        if(fieldValue==='M'){
            username = 'yicj-m' ;
            age = '22x' ;
            descr = 'test-m' ;
        }
        if(fieldValue === 'M'){
            this.form.hideSingleField('email') ;
        }else{
            this.form.showSingleField('email') ;
        }
        //this.form.setSingleFieldValue('username',username,false) ;
        this.form.setSingleFieldValue('age','12',false) ;
        //this.form.setSingleFieldValue('descr',descr,false) ;
    }

    validateUserName(fieldValue,fieldName){
        //console.info(`fieldValue : ${fieldValue} ,fieldName : ${fieldName} `) ; 
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
        let flag = this.form.validateAllForm() ;
        console.info('form valid flag : ' + flag) ;
        //////////////////////////////////////////////
        let formData = this.form.getAllFormDataSync () ;
        let infoStr = this.stringify(formData) ;
        console.info('formData : ' ,infoStr) ;
        this.form.validateAllForm() ;
    }
    toRender(){
        return (
            <div>
                <form  className="form-horizontal" role="form">
                    <FormItem form = {this.form} schema ={this.formSchema.serviceType}></FormItem>
                    <FormItem form = {this.form} schema ={this.formSchema.username}></FormItem>
                    <FormItem form = {this.form} schema ={this.formSchema.addr}></FormItem>
                    <hr/>
                    <FormItem form = {this.form} schema ={this.formSchema.email}></FormItem>
                    <FormItem form = {this.form} schema ={this.formSchema.effDate}></FormItem>
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

