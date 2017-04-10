import React, { Component, PropTypes } from 'react';

 function creatBaseForm(WrapperComponent){
     return  class BaseForm extends WrapperComponent{
        constructor(props){
            super(props) ;
            console.info('BaseForm constructor ...') ;
            let baseState = {
                _inner_formData:{
                    name:'',
                    addr:'',
                },
                _inner_formError:{
                    name:'',
                    addr:'',
                }
            } ;
            //将BaseForm的基本数据合并到state上
            Object.assign(this.state,baseState) ;
        }
        setFormData (obj) {
            this._inner_setComplexState('_inner_formData',obj) ;
        }
        setFormError (obj) {
            this._inner_setComplexState('_inner_formError',obj) ;
        }
        getFormData (){
            return this.state._inner_formData ;
        } 
        getFormError (){
            return this.state._inner_formError ;
        }
        _inner_setComplexState (fieldName,obj)  {
            this.setState(function(preState){
                let newObjValue = Object.assign({},preState[fieldName],obj) ;
                let newState = Object.assign({},preState,{[fieldName]:newObjValue}) ;
                return newState ;
            }) ;
        }
    }
 }

export default creatBaseForm ;

