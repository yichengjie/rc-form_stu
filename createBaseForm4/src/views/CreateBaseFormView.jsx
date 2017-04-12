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
        if(validatorName=='validate1'){
            return this.validateUserName ;
        }
    }

    validateUserName(){
        return "用户名输入错误" ;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        //let formData = this.form.getFormData () ;
        //let infoStr = JSON.stringify(formData,null,2) ;
        //console.info('formData : ' ,infoStr) ;
        let flag = this.form.validateAllForm() ;
        console.info('form valid flag : ' + flag) ;
    }
    toRender(){
        let formError = this.getFormError() ;
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

