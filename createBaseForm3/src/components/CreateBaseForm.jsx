import React, { Component, PropTypes } from 'react';
import FormItem from './FormItem.jsx' ;
import {getFieldObjByFieldSchema,isComplexFieldSchema} from '../common/common.js' ;
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
    }
} ;


 function creatBaseForm(WrapperComponent,getFormSchemaApi){
     return  class BaseForm extends WrapperComponent{
        constructor(props){
            super(props) ;
            console.info('BaseForm constructor ...') ;
            let baseState = {
                _inner_weird_formData:{},
                _inner_weird_formError:{},
                _inner_weird_refreshFormViewFlag:false/**强制刷新视图使用的 */
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
                setFieldValue : this.setFieldValue.bind(this),
                getFieldValue:this.getFieldValue.bind(this),
                setFieldError : this.setFieldError.bind(this),
                getFieldError : this.getFieldError.bind(this),
                getFormData : this.getFormData.bind(this),
                getFieldProp : this.getFieldProp.bind(this),
                //addFieldSchema : this.addFieldSchema.bind(this),
                addOrginFieldSchema : this.addOrginFieldSchema.bind(this),
                addSingleValidateRule : this.addSingleValidateRule.bind(this),
                validateAllForm : this.validateAllForm.bind(this)
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
        //--------------------------------------------------//

        refreshFormView(){/**刷新表单视图 */
            this.setState(function(prevState){
                let newObj = {_inner_weird_refreshFormViewFlag:!prevState._inner_weird_refreshFormViewFlag} ;
                return Object.assign({},prevState,newObj) ;
            }) ;
        }
        // addFieldSchema(schema){
        //     //组织后续使用的formSchema
        //     let {label,fields} = schema ;
        //     let formSchema  = this.getFormSchema() ;
        //     if(isComplexFieldSchema(schema)){
        //         let tmpArr = fields.map(function(item){
        //             return {label,...item} ;
        //         }) ;
        //         formSchema.push(...tmpArr) ;
        //     }else{
        //         formSchema.push({...schema}) ;
        //     }
        // }
        //原始schema
        addOrginFieldSchema(schema){
            let originFormSchema = this.getOriginFormSchema() ;
            originFormSchema.push(schema) ;
        }
        
        //获取表单的schema
        // getFormSchema () {
        //     return this._inner_weird_formSchema
        // }

        getOriginFormSchema (){
            return this._inner_weird_originformSchema ;
        }


        setFieldValue (fieldName,fieldValue,needValidFlag){
            let obj = {[fieldName]:fieldValue} ;
            this.setFieldValueObj(obj,needValidFlag) ;
        }
        getFieldValue(fieldName){
            let formData = this.getFormData() ;
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

        setFieldError(fieldName,errMsg){
            let obj = {[fieldName]:errMsg} ;
            this.setFieldErrorObj(obj) ;
        }
        setFieldErrorObj (obj) {
            this._inner_setComplexState('_inner_weird_formError',obj) ;
        }
        getFormData (){
            return this.state._inner_weird_formData ;
        } 
        getFieldError(fieldName){
            let formError = this.getFormError() ;
            return formError[fieldName] ;
        }
        getFormError (){ 
            return this.state._inner_weird_formError ;
        }
        _inner_setComplexState (fieldName,obj)  {
            this.setState(function(preState){
                let newObjValue = Object.assign({},preState[fieldName],obj) ;
                let newState = Object.assign({},preState,{[fieldName]:newObjValue}) ;
                return newState ;
            }) ;
        }
        getFieldProp (fieldName){
            let formData = this.getFormData() ;
            return {
                value:formData[fieldName] || '' ,
                onChange:(event)=>{
                    var value = event.target.value ;
                    this.setFormData({[fieldName]:value}) ;
                } 
            } ;
        }

        //校验整个表单数据的合法性
        validateAllForm(){
            let allRules = this.getAllValidateRules() ;
            let ruleKyes = Object.keys(allRules) ;
            let allValid = true ;
            let allErrorInfoObj = {} ;
            ruleKyes.forEach(fieldName=>{
                let fieldValue = this.getFieldValue(fieldName) ;
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
            let rule = this.getSingleValidateRule(fieldName) ;
            if(rule==null) return false;
            let {validator,...other} = rule ;
            let retObj = BaseFormUtil.validSingleFieldStatic(fieldName,fieldValue,other) ;
            return retObj ;
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

