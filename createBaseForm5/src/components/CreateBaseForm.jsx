import React, { Component, PropTypes } from 'react';
import FormItem from './FormItem.jsx' ;
import {getFieldObjByFieldSchema,isComplexFieldSchema,isString,getDefaultValue,
    stringify,isObject,shallowCopyObj} from '../common/common.js' ;
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
    },
    checkConfigExixt(config){
        config = config || {} ;
        let {name,rule} = config ;
        if(name == null || name.length == 0){
            return false ;
        }
        if(rule == null){
            return false ;
        }
        if(!isObject(rule)){
            return false ;
        }
        return true ;
    }
    
} ;


 function creatBaseForm(WrapperComponent){
     return  class BaseForm extends WrapperComponent{
        constructor(props){
            super(props) ;
            //console.info('BaseForm constructor ...') ;
            //同步表单数据
             //------------------同步数据保存----------------------//
            this._inner_weird_formData_sync = {} ;
             //表格控件的schema
            //this._inner_weird_formSchema = [] ;//组织好的form schema ，去除了组件应该显示的位置
            this._inner_weird_originformSchema= [] ; //这个是从后台获取到的原始的formschema
            this._inner_weird_validateRules = {} ;//页面字段的校验规则
            //表单初始化初始化数据
            this._inner_weird_initFormData = {} ;
            //---------------------------------------------------//
            let baseState = {
                _inner_weird_formData:{},
                _inner_weird_formError:{},
                _inner_weird_hideState:{},
            } ;
            //将BaseForm的基本数据合并到state上
            if(this.getInitialFormData && typeof this.getInitialFormData === 'function'){
                let initialFormState = this.getInitialFormData()  ;
                baseState._inner_weird_formData = initialFormState ;
                //this._inner_inner_weird_setFieldValueObj(initialFormState,false) ;
                this._inner_inner_weird_setInitFormDataObj(initialFormState) ;
            }
            Object.assign(this.state,baseState) ;
           
            this.form = {
                //---------------------高频api---------------------------//
                //获取整个表单数据
                //getAllFormData : this._inner_weird_getAllFormData.bind(this),
                //获取同步的formData
                getAllFormDataSync : this._inner_weird_getAllFormDataSync.bind(this) ,
                //设置某个字段的value
                setSingleFieldValue : this._inner_weird_setSingleFieldValue.bind(this),
                //设置formData的值
                setFieldValueObj :this._inner_inner_weird_setFieldValueObj.bind(this) ,
                //获取某个字段的值
                getSingleFieldValue:this._inner_weird_getSingleFieldValue.bind(this),
                //校验整个表单
                validateAllForm : this._inner_werid_validateAllForm.bind(this),
                //隐藏某一个字段
                hideSingleField : this._inner_weird_hideSingleField.bind(this),
                //显示某一个字段
                showSingleField : this._inner_werid_showSingleField.bind(this),
                //重置表单
                resetForm : this._inner_weird_resetForm.bind(this),
                //---------------------非高频api---------------------------//
                //获取某个字段的隐藏flag
                getSingleHideState : this._inner_werid_getSingleHideState.bind(this),//
                //给表单添加校验规则(这个是给FormItem自动调用的)
                addSingleValidateRuleByOrginFieldSchema : this._inner_weird_addSingleValidateRuleByOrginFieldSchema.bind(this),
                //添加一个formSchema(这个是给FormItem自动调用的)
                addOrginFieldSchema : this._inner_werid_addOrginFieldSchema.bind(this),
                //给Input注入公用的方法,eg:{value:'1',onChange=xxx}
                getSingleFieldProp : this._inner_weird_getSingleFieldProp.bind(this),
                //获取某个字段的错误提示信息(FormItem自动调用)
                getSingleFieldError : this._inner_getSingleFieldError.bind(this),
                //设置某个字段的错误提示
                //setSingleFieldError : this.setSingleFieldError.bind(this),
            } ;
        }

       
        showLoadingIcon(){
            this.setState({loading:true}) ;
        }

        hideLoadingIcon(){
            this.setState({loading:false}) ;
        }

        //初始化页面的表单显示Schema
        initPageFormSchema(formSchema){
            //保存schema
            for(let tmp of formSchema){
                //this.addFieldSchema(tmp) ;
                this._inner_werid_addOrginFieldSchema(tmp) ;
                this._inner_weird_addSingleValidateRuleByOrginFieldSchema(tmp) ;
            }
            //表单默认值数据
            let initFormDataObj = BaseFormUtil.getInitFormDataByFormSchema(this._inner_inner_weird_getAllOriginFormSchema()) ;
             //将初始化数据保存起来
            this._inner_inner_weird_setInitFormDataObj(initFormDataObj) ;
            //初始化页面
            this._inner_inner_weird_setFieldValueObj(initFormDataObj,false) ;
        }

        //-------------初始化数据-----------------------//
        _inner_inner_weird_getAllInitFormData(){
            return this._inner_weird_initFormData ;
        }

        _inner_inner_weird_setInitFormDataObj(obj){
            let initFormData = this._inner_inner_weird_getAllInitFormData() ;
            Object.assign(initFormData,shallowCopyObj(obj)) ;
        }

        //---------------------------------------------//

        //--------------------------------------------------//
        //设置字段的隐藏或显示
        _inner_weird_hideSingleField(fieldName){
            this._inner_inner_weird_setSingleHideState(fieldName,true) ;
            let oldValue = this._inner_weird_getSingleFieldValue(fieldName) ;
            let defaultValue = getDefaultValue(oldValue) ;
            //不用校验对错
            this._inner_weird_setSingleFieldValue(fieldName,defaultValue,false) ;
            this._inner_inner_werid_setSingleFieldError(fieldName,'') ;
        }
        _inner_werid_showSingleField(fieldName){
            this._inner_inner_weird_setSingleHideState(fieldName,false) ;
        }
        _inner_inner_werid_getAllHideState(){
            return this.state._inner_weird_hideState ;
        }
        _inner_werid_getSingleHideState(fieldName){
            let hideState = this._inner_inner_werid_getAllHideState() ;
            return hideState[fieldName] || false ;
        }
        _inner_inner_weird_setSingleHideState(fieldName,hideFlag){
            let obj = {[fieldName]:hideFlag} ;
            this._inner_inner_weird_setHideStateObj(obj) ;
        }
        _inner_inner_weird_setHideStateObj(obj){
            this._inner__inner_weird_setComplexState('_inner_weird_hideState',obj) ;
        }
         //--------------------------------------------------//
        //--------------------------------------------------//
        //获取所有的校验规则
        _inner_inner_weird_getAllValidateRules(){
            return this._inner_weird_validateRules ;
        }
        //获取单个的校验规则
        _inner_inner_werid_getSingleValidateRule(fieldName){
            let validateRules = this._inner_inner_weird_getAllValidateRules() ;
            return validateRules[fieldName];
        }
        
        //--------------------------validate 相关 ----------------------//
        //通过原始的FieldSchema添加校验规则
        _inner_weird_addSingleValidateRuleByOrginFieldSchema(schema){
            let ruleObj = BaseFormUtil.getFieldValidRuleByOrginFieldSchema(schema) ;
            this._inner_inner_weird_addSingleValidateRuleObj(ruleObj) ;
        }

        //内部使用的方法
        _inner_inner_weird_addSingleValidateRule(fieldName,rule){
            let ruleObj = {[fieldName]:rule} ;
            this._inner_inner_weird_addSingleValidateRuleObj(ruleObj) ;
        }
        //内部使用的方法
        _inner_inner_weird_addSingleValidateRuleObj(ruleObj){
            let validateRules = this._inner_inner_weird_getAllValidateRules() ;
            Object.assign(validateRules,ruleObj) ;
        }
        //--------------------------validate 相关 ----------------------//

         //校验整个表单数据的合法性
        _inner_werid_validateAllForm(){
            let allRules = this._inner_inner_weird_getAllValidateRules() ;
            let ruleKyes = Object.keys(allRules) ;
            let allValid = true ;
            let allErrorInfoObj = {} ;
            ruleKyes.forEach(fieldName=>{
                //let fieldValue = this._inner_weird_getSingleFieldValue(fieldName) ;
                let fieldValue = this._inner_inner_weird_getSingleFieldValueSync(fieldName) ;
                let {flag,msg} = this._inner_inner_weird_getSingleFieldValidInfo(fieldName,fieldValue) ;
                allErrorInfoObj[fieldName] = msg ;
                if(!flag){
                    allValid = false;
                }
            }) ;
            this._inner_inner_weird_setFieldErrorObj(allErrorInfoObj) ;
            return allValid ;
        }
        //获取单个字段上的校验提示信息
        _inner_inner_weird_getSingleFieldValidInfo(fieldName,fieldValue){
            let hideFlag = this._inner_werid_getSingleHideState(fieldName) ;
            if(hideFlag){
                return {flag:true,msg:''};
            }
            let rule = this._inner_inner_werid_getSingleValidateRule(fieldName) ;
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
        //原始schema
        _inner_werid_addOrginFieldSchema(schema){
            let originFormSchema = this._inner_inner_weird_getAllOriginFormSchema() ;
            originFormSchema.push(schema) ;
        }
        _inner_inner_weird_getAllOriginFormSchema (){
            return this._inner_weird_originformSchema ;
        }

         //-------------------------同步数据start--------------------------//
        _inner_weird_getAllFormDataSync(){
            return this._inner_weird_formData_sync ;
        }
        //同步获取单个字段的value
        _inner_inner_weird_getSingleFieldValueSync(fieldName){
            let formDataSync = this._inner_weird_getAllFormDataSync() ;
            return formDataSync[fieldName] ;
        }
        //------------------------end------------------------------------//

        //--------------------------异步formData---------------------------//
        _inner_weird_setSingleFieldValue (fieldName,fieldValue,needValidFlag){
            let obj = {[fieldName]:fieldValue} ;
            this._inner_inner_weird_setFieldValueObj(obj,needValidFlag) ;
        }
        _inner_weird_getSingleFieldValue(fieldName){
            let formData = this._inner_weird_getAllFormData() ;
            return formData[fieldName] ;
        }

        _inner_inner_weird_setFieldValueObj (obj,needValidFlag) {
            //同步数据到 `formDataSync`中
            //let formDataSync = this._inner_weird_getAllFormDataSync() ;
            Object.assign(this._inner_weird_getAllFormDataSync(),obj) ;
            //1.存储数据
            this._inner__inner_weird_setComplexState('_inner_weird_formData',obj) ;
            if(needValidFlag === false){
                return ; 
            }
            //2.校验数据的合法性
            let fieldNames = Object.keys(obj) ;
            let errorObj = {} ;
            for(let fieldName of fieldNames){
                let fieldValue = obj[fieldName] ;
                let {msg} = this._inner_inner_weird_getSingleFieldValidInfo(fieldName,fieldValue) ;
                errorObj[fieldName] = msg ;
            }
            this._inner_inner_weird_setFieldErrorObj(errorObj) ;
        }
        _inner_weird_getAllFormData (){
            return this.state._inner_weird_formData ;
        } 
        //---------------------------------------------------//
        _inner_inner_werid_getAllFormError (){//内部使用方法 
            return this.state._inner_weird_formError ;
        }
        _inner_getSingleFieldError(fieldName){
            let formError = this._inner_inner_werid_getAllFormError() ;
            return formError[fieldName] ;
        }
        
        //设置错误提示信息
        _inner_inner_werid_setSingleFieldError(fieldName,errMsg){
            let obj = {[fieldName]:errMsg} ;
            this._inner_inner_weird_setFieldErrorObj(obj) ;
        }


        _inner_inner_weird_setFieldErrorObj (obj) {
            this._inner__inner_weird_setComplexState('_inner_weird_formError',obj) ;
        }
        //-----------------------------------------------------//
        _inner__inner_weird_setComplexState (fieldName,obj)  {
            this.setState(function(preState){
                let newObjValue = Object.assign({},preState[fieldName],obj) ;
                let newState = Object.assign({},preState,{[fieldName]:newObjValue}) ;
                //debugger
                return newState ;
            }) ;
        }

        //-------------------------完全自定义布局的时候可以使用------------------------------//
        //完全自定义页面时可以使用
        _inner_weird_getSingleFieldProp (fieldName,config){
            //收集校验规则
            let configFlag = BaseFormUtil.checkConfigExixt(config) ;
            if(configFlag){
                //因为这里config可能还有别的参数，所以不能直接将config保存为校验规则
                let {name,rule} = config ;
                //this._inner_weird_addSingleValidateRule(tmp) ;
                this._inner_inner_weird_addSingleValidateRule(name,rule) ;
            }
            let formData = this._inner_weird_getAllFormData() ;
            //如果是select或则radio时可能会传入option
            let options  = config && (config.options || []) ;
            let retObj = {
                name:fieldName,
                value:formData[fieldName] || '' ,
                handleChange:(value)=>{
                    this._inner_weird_setSingleFieldValue(fieldName,value) ;
                }
            } 
            if(options.length > 0){
                retObj['options'] = options ;
            }
            //console.info('options : ' ,options) ;
            return retObj;
        }

        //-------------------------------------------------------------------------------//

        stringify(obj){
            return stringify(obj) ;
        }

        //重置formData
        _inner_weird_resetFormData(){
            //获取表单初始化数据
            let initFormDataObj = this._inner_inner_weird_getAllInitFormData() ;
            //初始化页面
            let formData = this._inner_weird_getAllFormData() ;
            let keys = Object.keys(formData) ;
            //debugger
            let newObj = {} ;
            for(let key of keys){
                newObj[key] = initFormDataObj[key] ;
            }
            this._inner_inner_weird_setFieldValueObj(newObj,false) ;
        }
        //重置formError
        _inner_weird_resetFormError(){
            let formError = this._inner_inner_werid_getAllFormError() ;
            let keys = Object.keys(formError) ;
            if(keys.length > 0){
                let newObj = {} ;
                keys.forEach(function(key){
                    newObj[key] = '' ;
                }) ;
                this._inner_inner_weird_setFieldErrorObj(newObj) ;
            }
        }
        //重置显隐状态
        _inner_weird_resetHideState(){
            let hideState = this._inner_inner_werid_getAllHideState() ;
            let keys = Object.keys(hideState) ;
            if(keys.length>0){
                let newObj = {} ;
                keys.forEach(function(key){
                    newObj[key] = false ;
                }) ;
                this._inner_inner_weird_setHideStateObj(newObj) ;
            }
        }

         _inner_weird_resetForm(){
            //console.info('resetForm () is called ...') ;
            //formData清空
            this._inner_weird_resetFormData() ;            
            //formError清空
            this._inner_weird_resetFormError() ;
            //hideState清空
            this._inner_weird_resetHideState() ;
            //测试一个假数据
            //重新校验一下整个表单的情况
        }


        /**公共方法api end */
        renderBaseForm () {
            let originFormSchema = this._inner_inner_weird_getAllOriginFormSchema() ;
            let form = this.form ;
            return (
                <form  className="form-horizontal" role="form">
                    {
                        originFormSchema.map(function(schema,index){
                            return (<FormItem form={form} 
                                        schema={schema} 
                                        key ={index} 
                                        needAssembleFormSchema={false}  />
                            ) ;
                        }) 
                    }
                </form>
            );
        }
    }
 }

export default creatBaseForm ;

