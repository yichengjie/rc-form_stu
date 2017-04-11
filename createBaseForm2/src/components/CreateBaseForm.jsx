import React, { Component, PropTypes } from 'react';

 function creatBaseForm(WrapperComponent){
     return  class BaseForm extends WrapperComponent{
        constructor(props){
            super(props) ;
            console.info('BaseForm constructor ...') ;
            let baseState = {
                _inner_weird_formData:{},
                _inner_weird_formError:{}
            } ;
            if(this.getInitialFormData && typeof this.getInitialFormData === 'function'){
                let initialFormState = this.getInitialFormData()  ;
                baseState._inner_weird_formData = initialFormState ;
            }
            //将BaseForm的基本数据合并到state上
            Object.assign(this.state,baseState) ;
            //
            this.form = {
                setFormData : this.setFormData.bind(this),
                setFormError : this.setFormError.bind(this),
                getFormData : this.getFormData.bind(this) ,
                getFormError : this.getFormError.bind(this),
                getFieldProp : this.getFieldProp.bind(this)
            } ;
        }
        setFormData (obj) {
            this._inner_setComplexState('_inner_weird_formData',obj) ;
        }
        setFormError (obj) {
            this._inner_setComplexState('_inner_weird_formError',obj) ;
        }
        getFormData (){
            return this.state._inner_weird_formData ;
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
        getFieldProp(fieldName){
            let formData = this.getFormData() ;
            return {
                value:formData[fieldName] || '' ,
                onChange:(event)=>{
                    var value = event.target.value ;
                    this.setFormData({[fieldName]:value}) ;
                } 
            } ;
        }
    }
 }

export default creatBaseForm ;

