import React,{Component} from 'react';
import BaseModule from '../components/BaseModule.jsx';
import CreateBaseForm from '../components/CreateBaseForm.jsx'; 
import {getUserEditFormSchemaApi} from '../api/Api.js' ;

class UserInfoEditForm extends BaseModule {
    constructor( props ){
        super( props ) ;
    }
    //初始化数据
    //如果不使用异步加载的formSchema，而是自己定制页面的form的话，需要实现这个方法
    // getInitialFormData(){
    //     return {
    //         username:'yicj'
    //     } ;
    // }
     //实现自定义校验的方法
    getCustomValidatorFn(validatorName){
        if(validatorName === 'validate1'){
            return this.validateUserName ;
        }else if(validatorName === 'customValidateServiceType'){
            return this.customValidateServiceType ;
        }
    }

    
    customValidateServiceType(fieldValue,fieldName){
        if(fieldValue === 'M'){
            this.form.hideSingleField('email') ;
        }else{
            this.form.setSingleHideState('email',false) ;
        }
    }
    validateUserName(fieldValue,fieldName){
       //console.info(`fieldValue : ${fieldValue} ,fieldName : ${fieldName} `) ; 
        if(fieldValue === 'admin'){
            return "用户名不能为admin" ;
        }
        return null ;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let formData = this.form.getAllFormData () ;
        let infoStr = JSON.stringify(formData,null,2) ;
        console.info('formData : ' ,infoStr) ;
        let flag = this.form.validateAllForm() ;
        console.info('form valid flag : ' + flag) ;
    }
    toRender(){
        return (
            <div>
                {this.renderBaseForm()}
                <div className="row">
                    <div className="col-sm-offset-2">
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>保存</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBaseForm(UserInfoEditForm,getUserEditFormSchemaApi) ;

