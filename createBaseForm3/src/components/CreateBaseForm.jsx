import React, { Component, PropTypes } from 'react';
import FormItem from './FormItem.jsx' ;

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
            this._inner_weird_formSchema = [] ;
            this._inner_weird_formInitialValue = {} ;
            this.form = {
                setFieldValue : this.setFieldValue.bind(this),
                getFieldValue:this.getFieldValue.bind(this),
                setFieldError : this.setFieldError.bind(this),
                getFieldError : this.getFieldError.bind(this),
                getFormData : this.getFormData.bind(this) ,
                getFieldProp : this.getFieldProp.bind(this),
                setFormSchema : this.setFormSchema.bind(this),
                collectFieldInitialState : this.collectFieldInitialState.bind(this)
            } ;
             //加载页面schema
            this.loadFormSchema() ;
        }

        loadFormSchema(){
            if(getFormSchemaApi && typeof getFormSchemaApi === 'function'){
                let promise = getFormSchemaApi() ;
                promise.then(retData=>{
                    this._inner_weird_formSchema = retData ;
                    //组织数据
                    this.refreshFormView() ;
                }) ;
            }
        }

        refreshFormView(){/**刷新表单视图 */
            this.setState(function(prevState){
                let newObj = {_inner_weird_refreshFormViewFlag:!prevState._inner_weird_refreshFormViewFlag} ;
                return Object.assign({},prevState,newObj) ;
            }) ;
        }

        collectFieldInitialState (fieldName,initialValue){
            this._inner_weird_formInitialValue[fieldName] = initialValue ;
        }
        //获取表单的schema
        getFormSchema () {
            return this._inner_weird_formSchema
        }
        setFieldValue (fieldName,fieldValue){
            let obj = {[fieldName]:fieldValue} ;
            this.setFieldValueObj(obj) ;
        }
        getFieldValue(fieldName){
            let formData = this.getFormData() ;
            return formData[fieldName] ;
        }

        setFieldValueObj (obj) {
            //1.存储数据
            this._inner_setComplexState('_inner_weird_formData',obj) ;
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
            let formSchema = this.getFormSchema() ;
            let form = this.form ;
            return (
                <form  className="form-horizontal" role="form">
                    {
                        formSchema.map(function(schema,index){
                            return <FormItem form={form} schema={schema} key ={index}  />
                        }) 
                    }
                </form>
            )
        }
    }
 }

export default creatBaseForm ;

