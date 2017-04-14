import React,{Component} from 'react';
import BaseModule from '../components/BaseModule.jsx';
import CreateBaseForm from '../components/CreateBaseForm.jsx'; 
import Api, {getUserEditFormSchemaApi} from '../api/Api.js' ;
import {dealPromise4Callback} from '../common/common.js' ;
///////////////////////////////////////////////////////////
import FormGroup from '../components/FormGroup.jsx' ;
import OCInput from '../components/oc-input.jsx' ;

class UserInfoEditForm extends BaseModule {

    componentDidMount() {
        this.initPageOtherParam() ;
    }

      //初始化数据
    //如果不使用异步加载的formSchema，而是自己定制页面的form的话，需要实现这个方法
    getInitialFormData(){
        return {
            username:'yicj',
            addr:''
        } ;
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
        });
    }

    //实现自定义校验的方法
    getCustomValidatorFn(validatorName){
        if(validatorName=='validate1'){
            return this.validateUserName ;
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
                    <FormGroup label ="用户名" msg="错误提示">
                        <OCInput {...this.form.getgetSingleFieldProp('username')}/>
                    </FormGroup>
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

