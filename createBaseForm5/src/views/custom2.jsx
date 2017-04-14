import React,{Component} from 'react';
import BaseModule from '../components/BaseModule.jsx';
import CreateBaseForm from '../components/CreateBaseForm.jsx'; 
import Api, {getUserEditFormSchemaApi} from '../api/Api.js' ;
import {dealPromise4Callback} from '../common/common.js' ;
///////////////////////////////////////////////////////////
import FormGroup from '../components/FormGroup.jsx' ;
import OCInput from '../components/oc-input.jsx' ;
import OCDate from '../components/oc-date.jsx' ;
import OCSelect from '../components/oc-select.jsx' ;

class UserInfoEditForm extends BaseModule {
    
    constructor(props){
         super(props) ;
         this.validateRules = {
            serviceType:{
                name:'serviceType', 
                rule:{required:true,validator:'customValidateServiceType'},
                options:[
                    {name:'选择',value:''},
                    {name:'F类型-显示邮箱',value:'F'},
                    {name:'M类型-隐藏邮箱',value:'M'},
                    {name:'T类型-显示邮箱',value:'T'}
                ]
            },
            username:{
                name:'username',
                rule:{required:true,validator:'validate1'}, 
            },
            addr:{
                name:'addr',
                rule:{required:true},
            },
            email:{
                name:'email',
                rule:{required:true,email:true} 
            },
            effDate:{
                name:'effDate',
                rule:{required:true,date:true} 
            },
            upFloatRatio:{
                name:'upFloatRatio',
                rule:{integer:true} 
            }
        } ;
    }

    componentDidMount() {
       this.initPageOtherParam() ;
    }

    //初始化数据
    //如果不使用异步加载的formSchema，而是自己定制页面的form的话，需要实现这个方法
    getInitialFormData(){
        return {
            username:'yicj',
            addr:'',
            email:'',
            effDate:''
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
        // if(validatorName=='validate1'){
        //     return this.validateUserName ;
        // }else if(){
        //     return this.customValidateServiceType ;
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
        let serviceTypeErrorTip = this.form.getSingleFieldError('serviceType') ;
        let usernameErrorTip = this.form.getSingleFieldError('username') ;
        let addrErrorTip = this.form.getSingleFieldError('addr') ;
        let emailErrorTip = this.form.getSingleFieldError('email') ;
        let effDateErrorTip = this.form.getSingleFieldError('effDate') ;
        let upFloatRatioErrorTip = this.form.getSingleFieldError('upFloatRatio') ;
        return (
            <div>
                <form  className="form-horizontal" role="form">
                    <FormGroup label ="服务类型" msg={serviceTypeErrorTip} >
                        <OCSelect {...this.form.getSingleFieldProp('serviceType',this.validateRules.serviceType)}/>
                    </FormGroup>
                    <FormGroup label ="用户名" msg={usernameErrorTip} hideFlag = {this.form.getSingleHideState('username')}>
                        <OCInput {...this.form.getSingleFieldProp('username',this.validateRules.username)}/>
                    </FormGroup>
                    <FormGroup label ="地址" msg={addrErrorTip} hideFlag = {this.form.getSingleHideState('addr')}>
                        <OCInput {...this.form.getSingleFieldProp('addr',this.validateRules.addr)}/>
                    </FormGroup>
                    <FormGroup label ="上浮比例" msg={upFloatRatioErrorTip} hideFlag = {this.form.getSingleHideState('upFloatRatio')}>
                        <div style={{width:'95%',display: 'inline-block'}}>
                            <OCInput {...this.form.getSingleFieldProp('upFloatRatio',this.validateRules.upFloatRatio)}/>
                        </div> %
                    </FormGroup>
                    <FormGroup label ="邮箱" msg={emailErrorTip} hideFlag = {this.form.getSingleHideState('email')}>
                        <OCInput {...this.form.getSingleFieldProp('email',this.validateRules.email)}/>
                    </FormGroup>
                    <FormGroup label ="生效日期" msg={effDateErrorTip} hideFlag = {this.form.getSingleHideState('effDate')}>
                        <OCDate {...this.form.getSingleFieldProp('effDate',this.validateRules.effDate)}/>
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

