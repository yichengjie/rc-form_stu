import React, { Component, PropTypes } from 'react';
import FormItem from './FormItem.jsx' ;
import {getFieldObjByFieldSchema,isComplexFieldSchema,isString,getDefaultValue} from '../common/common.js' ;
import {validationFn,validationMessages} from  '../common/validator.js'; 

let BaseFormUtil = {
   //组装表单的所有字段校验规则
    getFieldValidRuleByOrginFieldSchema(originFieldSchema){/**通过原始的formSchema获取validateRule对象 */
        let retObj = {} ;
        if(isComplexFieldSchema(originFieldSchema)){
            let {fields} = originFieldSchema;
            fields.forEach((field) => {
                let {name,rule} = field; 
                retObj[name] = {...rule} ;
            }) ; 
        }else{
            let {name,rule} = originFieldSchema; 
            retObj[name] = {...rule} ;
        }
        return retObj ;
    },
    getInitFormDataByFormSchema(originFormSchema){
        let initFormData = {} ;
        if(originFormSchema && originFormSchema.length > 0){
            originFormSchema.forEach(function(item){
               let obj =  getFieldObjByFieldSchema(item) ;
               Object.assign(initFormData,obj) ;
            }) ;
            return initFormData ;
        }
        return null ;
    },
    validSingleFieldStatic(fieldName,fieldValue,staticRule){//静态校验字段
        var keys = Object.keys(staticRule) ;
        let errTip = '' ;
        let validFlag = true ;
        for(let key of keys){
            let param = staticRule[key] ;
            if(validationFn[key]){
                let flag = validationFn[key].call(null,fieldValue,param) ;
                if(!flag){//如果校验没有通过的话
                    validFlag = false;
                    errTip= validationMessages[key].call(null,fieldName,param) ;
                    break ;
                }
            } 
        }
        return {flag:validFlag,msg:errTip} ;
    },
    validSingleFieldDynamic(fieldName,fieldValue,validatorFnName){
       let msg = '' ;
       let flag = true ;
       if(validatorFnName && isString(validatorFnName) &&validatorFnName.length>0 ){
            let validatorFn = this.getCustomValidatorFn(validatorFnName) ;
            /**
             * 这里需要注意，
             * 第一个参数是fieldValue
             * 第二个参数是fieldName
             * */
            msg = validatorFn && validatorFn.call(this,fieldValue,fieldName) || '' ;
            if(msg && msg.length>0){
                flag = false ;
            }
        }
        return {flag,msg} ;
    }
} ;


 function creatBaseForm(WrapperComponent,getFormSchemaApi){
     return  class BaseForm extends WrapperComponent{
        constructor(props){
            super(props) ;
            //console.info('BaseForm constructor ...') ;
            let baseState = {
                _inner_weird_formData:{},
                _inner_weird_formError:{},
                _inner_weird_hideState:{},
                _inner_weird_refreshFormViewFlag:false,/**强制刷新视图使用的 */
            } ;
            if(this.getInitialFormData && typeof this.getInitialFormData === 'function'){
                let initialFormState = this.getInitialFormData()  ;
                baseState._inner_weird_formData = initialFormState ;
            }
            //将BaseForm的基本数据合并到state上
            Object.assign(this.state,baseState) ;
            //表格控件的schema
            //this._inner_weird_formSchema = [] ;//组织好的form schema ，去除了组件应该显示的位置
            this._inner_weird_originformSchema= [] ; //这个是从后台获取到的原始的formschema
            this._inner_weird_validateRules = {} ;//页面字段的校验规则

            this.form = {
                setSingleFieldValue : this.setSingleFieldValue.bind(this),
                getSingleFieldValue:this.getSingleFieldValue.bind(this),
                setSingleFieldError : this.setSingleFieldError.bind(this),
                getSingleFieldError : this.getSingleFieldError.bind(this),
                getAllFormData : this.getAllFormData.bind(this),
                getSingleFieldProp : this.getSingleFieldProp.bind(this),
                //addFieldSchema : this.addFieldSchema.bind(this),
                addOrginFieldSchema : this.addOrginFieldSchema.bind(this),
                addSingleValidateRule : this.addSingleValidateRule.bind(this),
                validateAllForm : this.validateAllForm.bind(this),
                //setSingleHideState : this.setSingleHideState.bind(this),
                getSingleHideState : this.getSingleHideState.bind(this),
                hideSingleField : this.hideSingleField.bind(this),
                showSingleField : this.showSingleField.bind(this)
            } ;
             //加载页面schema
            this.loadFormSchema() ;
            //初始化页面数据
        }
       

        loadFormSchema(){
            if(getFormSchemaApi && typeof getFormSchemaApi === 'function'){
                let promise = getFormSchemaApi() ;
                promise.then(retData=>{
                    //保存schema
                    for(let tmp of retData){
                        //this.addFieldSchema(tmp) ;
                        this.addOrginFieldSchema(tmp) ;
                        this.addSingleValidateRule(tmp) ;
                    }
                    let initFormDataObj = BaseFormUtil.getInitFormDataByFormSchema(this.getOriginFormSchema()) ;
                    //初始化页面
                    this.setFieldValueObj(initFormDataObj,false) ;
                }) ;
            }
        }

        //--------------------------------------------------//
        //设置字段的隐藏或显示
        hideSingleField(fieldName){
            this.setSingleHideState(fieldName,true) ;
            let oldValue = this.getSingleFieldValue(fieldName) ;
            let defaultValue = getDefaultValue(oldValue) ;
            this.setSingleFieldValue(fieldName,defaultValue) ;
        }
        showSingleField(fieldName){
            this.setSingleHideState(fieldName,false) ;
        }
        getAllHideState(){
            return this.state._inner_weird_hideState ;
        }
        getSingleHideState(fieldName){
            let hideState = this.getAllHideState() ;
            return hideState[fieldName] || false ;
        }
        setSingleHideState(fieldName,hideFlag){
            let obj = {[fieldName]:hideFlag} ;
            this.setHideStateObj(obj) ;
        }
        setHideStateObj(obj){
            this._inner_setComplexState('_inner_weird_hideState',obj) ;
        }
         //--------------------------------------------------//
        //--------------------------------------------------//
        //获取所有的校验规则
        getAllValidateRules(){
            return this._inner_weird_validateRules ;
        }
        //获取单个的校验规则
        getSingleValidateRule(fieldName){
            let validateRules = this.getAllValidateRules() ;
            return validateRules[fieldName];
        }
        
        //添加单条校验规则
        addSingleValidateRule(schema){
            let validateRules = this.getAllValidateRules() ;
            let ruleObj = BaseFormUtil.getFieldValidRuleByOrginFieldSchema(schema) ;
            Object.assign(validateRules,ruleObj) ;
        }
         //校验整个表单数据的合法性
        validateAllForm(){
            let allRules = this.getAllValidateRules() ;
            let ruleKyes = Object.keys(allRules) ;
            let allValid = true ;
            let allErrorInfoObj = {} ;
            ruleKyes.forEach(fieldName=>{
                let fieldValue = this.getSingleFieldValue(fieldName) ;
                let {flag,msg} = this.getSingleFieldValidInfo(fieldName,fieldValue) ;
                allErrorInfoObj[fieldName] = msg ;
                if(!flag){
                    allValid = false;
                }
            }) ;
            this.setFieldErrorObj(allErrorInfoObj) ;
            return allValid ;
        }
        //获取单个字段上的校验提示信息
        getSingleFieldValidInfo(fieldName,fieldValue){
            let hideFlag = this.getSingleHideState(fieldName) ;
            if(hideFlag){
                return {flag:true,msg:''};
            }
            let rule = this.getSingleValidateRule(fieldName) ;
            if(rule==null) return false;
            let {validator,...other} = rule ;
            let retObj  = BaseFormUtil.validSingleFieldStatic(fieldName,fieldValue,other) ;
            let {flag} = retObj ;
            if(flag){
                 retObj = BaseFormUtil.validSingleFieldDynamic.call(this,fieldName,fieldValue,validator) ;
            }
            return retObj ;
        }
        //--------------------------------------------------//

        refreshFormView(){/**刷新表单视图 */
            this.setState(function(prevState){
                let newObj = {_inner_weird_refreshFormViewFlag:!prevState._inner_weird_refreshFormViewFlag} ;
                return Object.assign({},prevState,newObj) ;
            }) ;
        }
        //原始schema
        addOrginFieldSchema(schema){
            let originFormSchema = this.getOriginFormSchema() ;
            originFormSchema.push(schema) ;
        }
        getOriginFormSchema (){
            return this._inner_weird_originformSchema ;
        }
        setSingleFieldValue (fieldName,fieldValue,needValidFlag){
            let obj = {[fieldName]:fieldValue} ;
            this.setFieldValueObj(obj,needValidFlag) ;
        }
        getSingleFieldValue(fieldName){
            let formData = this.getAllFormData() ;
            return formData[fieldName] ;
        }

        

        setFieldValueObj (obj,needValidFlag) {
            //1.存储数据
            this._inner_setComplexState('_inner_weird_formData',obj) ;
            if(needValidFlag === false){
                return ; 
            }
            //2.校验数据的合法性
            let fieldNames = Object.keys(obj) ;
            let errorObj = {} ;
            for(let fieldName of fieldNames){
                let fieldValue = obj[fieldName] ;
                let {msg} = this.getSingleFieldValidInfo(fieldName,fieldValue) ;
                errorObj[fieldName] = msg ;
            }
            this.setFieldErrorObj(errorObj) ;
        }
        getAllFormData (){
            return this.state._inner_weird_formData ;
        } 
        //---------------------------------------------------//
        getAllFormError (){ 
            return this.state._inner_weird_formError ;
        }
        getSingleFieldError(fieldName){
            let formError = this.getAllFormError() ;
            return formError[fieldName] ;
        }
        setSingleFieldError(fieldName,errMsg){
            let obj = {[fieldName]:errMsg} ;
            this.setFieldErrorObj(obj) ;
        }
        setFieldErrorObj (obj) {
            this._inner_setComplexState('_inner_weird_formError',obj) ;
        }
        //-----------------------------------------------------//
        _inner_setComplexState (fieldName,obj)  {
            this.setState(function(preState){
                let newObjValue = Object.assign({},preState[fieldName],obj) ;
                let newState = Object.assign({},preState,{[fieldName]:newObjValue}) ;
                return newState ;
            }) ;
        }
        //这个方法暂时没有使用，完全自定义页面时可以使用
        getSingleFieldProp (fieldName){
            let formData = this.getAllFormData() ;
            return {
                value:formData[fieldName] || '' ,
                onChange:(event)=>{
                    var value = event.target.value ;
                    this.setFormData({[fieldName]:value}) ;
                } 
            } ;
        }

        /**公共方法api end */
        renderBaseForm () {
            let originFormSchema = this.getOriginFormSchema() ;
            let form = this.form ;
            return (
                <form  className="form-horizontal" role="form">
                    {
                        originFormSchema.map(function(schema,index){
                            return <FormItem form={form} schema={schema} key ={index} needAssembleFormSchema={false}  />
                        }) 
                    }
                </form>
            );
        }
    }
 }

export default creatBaseForm ;

