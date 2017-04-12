import React, { Component, PropTypes } from 'react';
import FormItem from './FormItem.jsx' ;
import {getFieldObjByFieldSchema,isComplexFieldSchema} from '../common/common.js' ;

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
            this._inner_weird_formSchema = [] ;//组织好的form schema ，去除了组件应该显示的位置
            this._inner_weird_originformSchema= [] ; //这个是从后台获取到的原始的formschema
            this.form = {
                setFieldValue : this.setFieldValue.bind(this),
                getFieldValue:this.getFieldValue.bind(this),
                setFieldError : this.setFieldError.bind(this),
                getFieldError : this.getFieldError.bind(this),
                getFormData : this.getFormData.bind(this) ,
                getFieldProp : this.getFieldProp.bind(this),
                addFieldSchema : this.addFieldSchema.bind(this)
                //setFormSchema : this.setFormSchema.bind(this),
            } ;
             //加载页面schema
            this.loadFormSchema() ;
            //初始化页面数据
        }

        getInitFormDataByFromSchema(){//这个方法只有从后台获取schema时才会被调用
            let formSchema = this.getFormSchema() ;
            let initFormData = {} ;
            if(formSchema && formSchema.length > 0){
                formSchema.forEach(function(item){
                   let {name,defaultValue} = item ;
                   initFormData[name] = defaultValue ;
                }) ;
                return initFormData ;
            }
            return null ;
        }

        loadFormSchema(){
            if(getFormSchemaApi && typeof getFormSchemaApi === 'function'){
                let promise = getFormSchemaApi() ;
                promise.then(retData=>{
                    this._inner_weird_originformSchema = retData ;//原始formSchema
                    //保存schema
                    for(let tmp of retData){
                        this.addFieldSchema(tmp,false) ;
                    }
                    let initFormDataObj = this.getInitFormDataByFromSchema() ;
                    //初始化页面
                    this.setFieldValueObj(initFormDataObj,false) ;
                }) ;
            }
        }

        refreshFormView(){/**刷新表单视图 */
            this.setState(function(prevState){
                let newObj = {_inner_weird_refreshFormViewFlag:!prevState._inner_weird_refreshFormViewFlag} ;
                return Object.assign({},prevState,newObj) ;
            }) ;
        }

        addFieldSchema(schema,needAddOriginFormSchemeFlag){
            //组织后续使用的formSchema
            let {label,fields} = schema ;
            let formSchema  = this.getFormSchema() ;
            if(isComplexFieldSchema(schema)){
                let tmpArr = fields.map(function(item){
                    return {label,...item} ;
                }) ;
                formSchema.push(...tmpArr) ;
            }else{
                formSchema.push({...schema}) ;
            }
            //填充原始form schema
            if(needAddOriginFormSchemeFlag === false){
                return ;
            }
            let originFormSchema = this.getOriginFormSchema() ;
            originFormSchema.push(schema) ;
        }
        
        //获取表单的schema
        getFormSchema () {
            return this._inner_weird_formSchema
        }

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
            let keys = Object.keys(obj) ;
            let errorObj = {} ;
            for(let key of keys){
                errorObj[key] = '数据不合法...' ;
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

