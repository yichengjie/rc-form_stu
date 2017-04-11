import React,{Component} from 'react';
import BaseModule from '../components/BaseModule.jsx';
import CreateBaseForm from '../components/CreateBaseForm.jsx'; 
import {getUserEditFormSchemaApi} from '../api/Api.js' ;


class UserInfoEditForm extends BaseModule {
    constructor( props ){
        super( props ) ;

       
    }
    //初始化数据
    getInitialFormData(){
        return {
            username:'yicj',
            addr:'',
            age1:'',
            age2:''
        } ;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let formData = this.getFormData () ;
        let infoStr = JSON.stringify(formData,null,2) ;
        console.info('formData : ' ,infoStr) ;
    }
    toRender(){
        let formError = this.getFormError() ;
        return (
            <div>
                {this.renderBaseForm()}
            </div>
        );
    }
}

export default CreateBaseForm(UserInfoEditForm,getUserEditFormSchemaApi) ;

