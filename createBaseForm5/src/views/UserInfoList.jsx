import React,{Component} from 'react';
import BaseModule from '../components/BaseModule.jsx';
import CreateBaseForm from '../components/CreateBaseForm.jsx'; 
import Api, {getUserEditFormSchemaApi} from '../api/Api.js' ;
import {dealPromise4Callback} from '../common/common.js' ;

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

    componentDidMount() {
        this.showLoadingIcon() ;
        let promise = getUserEditFormSchemaApi() ;
        promise.then(retData=>{
            this.initPageFormSchema(retData) ;
            //UserInfoList.jsx
            this.initPageOtherParam() ;
        }) ;
    }
    //初始化其他参数
    initPageOtherParam(){
        console.info('初始化页面其他数据') ;
        let id = '1';
        dealPromise4Callback(Api.queryUserById(id),(retData)=>{
            this.hideLoadingIcon() ;
            let formDataDB = retData.formData ;
            this.form.setFieldValueObj(formDataDB,false) ;

            //
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
        if(validatorName === 'validate1'){
            return this.validateUserName ;
        }else if(validatorName === 'customValidateServiceType'){
            return this.customValidateServiceType ;
        }
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
    handleSubmit = (event) => {
        event.preventDefault();
        let flag = this.form.validateAllForm() ;
        console.info('form valid flag : ' + flag) ;
        /////////////
        let formData = this.form.getAllFormDataSync () ;
        let infoStr = this.stringify(formData) ;
        console.info('formData : ' ,infoStr) ;
    }
    toRender(){
        return (
            <div>
                {this.renderBaseForm()}
                <div className="row">
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

