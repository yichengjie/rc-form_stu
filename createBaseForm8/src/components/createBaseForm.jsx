import React,{Component} from 'react' ;
import {validationFn,validationMessages} from  '../common/validator.js'; 
import {isArray,stringify} from '../common/common.js' ;
import FormItem from './FormItem.jsx' ;
import { connect } from 'react-redux';
import {setFieldValue,initFormData,resetFormData} from '../redux/createBaseForm/formData.js' ;
import {initFormSchema} from '../redux/createBaseForm/formSchema.js' ;
import {setFieldError,resetFormError} from '../redux/createBaseForm/formError.js' ;
import {setFieldHide,resetFormHide} from '../redux/createBaseForm/formHide.js' ;

function createForm (WrapperComponent,getSchemaApi){
    class HOCComponent extends WrapperComponent{
        constructor(props){
            super(props) ;
            //这个是专供内部使用的校验规则
            this._inner_formRules ={} ;
            this.form = {
                /**-----------------field value 相关 api----------------- */
                //获取字段的value
                getFieldValue:this._form_getFieldValue.bind(this) ,
                //给字段赋值
                setFieldValue:this._form_setFieldValue.bind(this),
                //给字段赋值并校验合法性
                setFieldValueAndValidate:this._form_setFieldValueAndValidate.bind(this),
                //给字段赋默认值(赋值+擦除错误提示)
                setFieldDefaultValue:this._form_setFieldDefaultValue.bind(this),
                /**-----------------field error 相关 api------------------ */
                //获取字段的错误提示
                getFieldError:this._form_getFieldError.bind(this),
                /**-----------------field hide 相关 api------------------- */
                //设置字段隐藏flag (true：隐藏，false：显示)
                setFieldHideFlag:this._form_setFieldHideFlag.bind(this),
                //获取字段隐藏的flag (true：隐藏，false：显示)
                getFieldHideFlag:this._form_getFieldHideFlag.bind(this),
                /**-----------------form 相关操作 api-------------------- */
                //初始化页面的多个字段默认值
                initFormData:this._form_initFormData.bind(this),
                //校验整个form
                validateForm:this._form_validateForm.bind(this),
                //重置表单数据
                resetForm:this._form_resetForm.bind(this),
                /**------------------form 相关信息获取 api--------------- */
                //获取表单的formData数据
                getFormData:this._form_getFormData.bind(this),
                //获取表单的隐藏状态数据
                getFormHide:this._form_getFormHide.bind(this),
                //获取表单的错误提示信息
                getFormError:this._form_getFormError.bind(this),
                /**------------------------------------------------- ----*/
            } ;
            this._inner_initFormSchema() ;
        } 
        /**私有方法start */
        _inner_initFormSchema(){
            let promise = getSchemaApi.call(null);
            promise.then((retData)=>{
                let initialState = getFormDefaultValueState(retData) ;
                //console.info('initFormData : ' , initialState) ;
                this.props._inner_redux_initFormSchema(retData) ;
                this._inner_assembleFormValidRule(retData) ;
                this.props._inner_redux_initFormData(initialState) ;
                //初始化页面参数
                this.initPageParam() ;
            }) ;
            
        }
         _inner_getFormSchema(){
            return this.props._inner_redux_formSchema ;
        }
         //获取表单项校验规则
        _inner_getSingleFieldValidateRule(fieldName){
            return this._inner_formRules[fieldName] ;
        }
        //获取表单的所有校验规则
        _inner_getAllFieldValidateRules(){
            return this._inner_formRules ;
        }  
        _inner_resetFieldValue(fieldName){
            let oldValue = this.form.getFieldValue(fieldName) ;
            //这个可能是从schema中获取默认值
            let defaultValue = getDefaultValue(oldValue) ;
            this.form.setFieldValue(fieldName,defaultValue) ;
        }
        _inner_clearFieldError(fieldName){
           this.props._inner_redux_setFieldError(fieldName,'') ; 
        }
        _form_getFieldValue(fieldName){
           return this.props._inner_redux_formData[fieldName] ;
        }
        _form_setFieldValue(fieldName,fieldValue){
            this.props._inner_redux_setFieldValue(fieldName,fieldValue) ;
        }
        //设值并校验值的正确性
        _form_setFieldValueAndValidate(fieldName,fieldValue){
            //将value保存到formData中
            this._form_setFieldValue(fieldName,fieldValue) ;
            //校验当前字段的合法性
            this._inner_validSingleField(fieldName,fieldValue) ;
        }
        //给字段赋默认值
        _form_setFieldDefaultValue(fieldName,fieldValue){
            //将value保存到formData中
            this._form_setFieldValue(fieldName,fieldValue) ;
            //清空字段的错误提示
            this._inner_clearFieldError(fieldName) ;
            //显隐暂时不做处理
        }
        _form_initFormData(formData){
            this.props._inner_redux_initFormData(formData) ;
        }
        _form_getFieldError(fieldName){//_inner_formError
            return this.props._inner_redux_formError[fieldName] || '' ;
        }
        _form_setFieldError(fieldName,fieldError){//_inner_formError
           this.props._inner_redux_setFieldError(fieldName,fieldError)
        }
        _form_getFormError(){
            return this.props._inner_redux_formError ;
        }
        _form_getFieldHideFlag(fieldName){
            let hideFlag = this.props._inner_redux_formHide[fieldName] || false;
            return hideFlag ;
        }
        _form_setFieldHideFlag(fieldName,hideFlag){
            //console.info(`setFieldHideFlag () , fieldName : ${fieldName} , hideFlag : ${hideFlag}`) ;
            //如果是隐藏字段，还要清楚错误提示和当前填写过的value
            if(hideFlag){
                //重置表单元素的value
                this._inner_resetFieldValue(fieldName) ;
                this._inner_clearFieldError(fieldName) ;
            }
            this.props._inner_redux_setFieldHide(fieldName,hideFlag) ;
        }
        _form_getFormHide(){
            return this.props._inner_redux_formHide ;
        }
        
        _form_getFormData(){
            return this.props._inner_redux_formData ;
        }
        _form_validateForm(){
            let rules = this._inner_getAllFieldValidateRules() ;
            //console.info('rules : ' , stringify(rules)) ;
            let keys = rules && Object.keys(rules) ;
            let allValid = true ;
            keys.forEach(fieldName=>{
                //let hideFlag = 
                let fieldValue = this.form.getFieldValue(fieldName) ;
                let tmpFlag = this._inner_validSingleField(fieldName,fieldValue) ;
                if(!tmpFlag){
                    allValid = false;
                }
            }) ;
            //console.info('------- > ' , stringify(this.state.formError));
            return allValid ;
        }
        _form_resetForm(){
            //console.info('resetForm () is called ...') ;
            //formData清空
            this.props._inner_redux_resetFormData() ;
            //formError清空
            this.props._inner_redux_resetFormError() ;
            //hideState清空
            this.props._inner_redux_resetFormHide() ;
            //测试一个假数据
            //重新校验一下整个表单的情况
            //注意这里一定要放到setTimeout中执行，因为redux的dispatch好像是异步的，
            //那么下面的代码可能会早与上面的代码执行
            setTimeout(() => {
                this._inner_dealFormdHideState() ;
            }, 0);
        }

        //根据formData的值处理整个表单的显隐
        _inner_dealFormdHideState(){
            let rules = this._inner_getAllFieldValidateRules() ;
            let keys = rules && Object.keys(rules) ;
            keys.forEach(fieldName=>{
                let fieldValue = this.form.getFieldValue(fieldName) ;
                this._inner_dealFieldHideState(fieldName,fieldValue) ;
            }) ;
        }
        //处理字段的显隐逻辑
        _inner_dealFieldHideState(fieldName,fieldValue){
            //如果字段没有隐藏，则进行常规校验
            let rule = this._inner_getSingleFieldValidateRule(fieldName) ;
            if(rule==null) return false;
            //如果存在校验规则
            let {validator} = rule ;
            if(validator && Object.prototype.toString.call(validator) === '[object String]' &&validator.length>0 ){
                let validatorFn = this[validator] ;
                validatorFn && validatorFn.call(this,fieldValue,fieldName) || '' ;
            }
            return true ;
        }
         //校验表单的某一个字段
        _inner_validSingleField(fieldName,fieldValue){
            let hideFlag = this.form.getFieldHideFlag(fieldName) ;
            if(hideFlag){
                return true;
            }
            //如果字段没有隐藏，则进行常规校验
            let rule = this._inner_getSingleFieldValidateRule(fieldName) ;
            if(rule==null) return false;
            //如果存在校验规则
            let {validator,...other} = rule ;
            //other :{email: true}
            var keys = Object.keys(other) ;
            let errTip = '' ;
            let validFlag = true ;
            for(let key of keys){
                let param = other[key] ;
                if(validationFn[key]){
                   let flag = validationFn[key].call(null,fieldValue,param) ;
                   if(!flag){//如果校验没有通过的话
                      validFlag = false;
                      errTip= validationMessages[key].call(null,fieldName,param) ;
                      break ;
                   }
                } 
            }
            //如果上面的静态校验通过了，还存在自定义校验的话，将进行自定义校验
            if(errTip.length==0 && validator && Object.prototype.toString.call(validator) === '[object String]' &&validator.length>0 ){
                let validatorFn = this[validator] ;
                /**
                 * 这里需要注意，
                 * 第一个参数是fieldValue
                 * 第二个参数是fieldName
                 * */
                errTip = validatorFn && validatorFn.call(this,fieldValue,fieldName) || '' ;
                if(errTip&&errTip.length>0){
                    validFlag = false ;
                }
            }
            this.props._inner_redux_setFieldError(fieldName,errTip) ;
            // if(fieldName === 'age'){
                 //console.info(`fieldName : ${fieldName} , fieldName: ${fieldName} , validFlag : ${validFlag}, errTip : ${errTip}`) ;
            //     //debugger ;
            // }
            return validFlag ;
        }

        //组装表单的所有字段校验规则
        _inner_assembleFormValidRule(formSchema){
            formSchema.forEach((schemaItem) => {
                let {type} = schemaItem ;
                if(type==='complex'){
                    let {fields} = schemaItem;
                    fields.forEach((field) => {
                        let {name,rule} = field; 
                        this._inner_formRules[name] = {...rule} ;
                    }) ; 
                }else{
                    let {name,rule} = schemaItem; 
                    this._inner_formRules[name] = {...rule} ;
                }
            }) ;
        }
        /**公共方法api end */
        renderBaseForm () {
            return (
                <form  className="form-horizontal" role="form" >
                     {renderFormSchema(this._inner_getFormSchema(),this.form)}
                </form>
            )
        }

    }
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(HOCComponent) ;
}
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
  return {
    _inner_redux_formData: state.baseForm.formData,
    _inner_redux_formSchema:state.baseForm.formSchema,
    _inner_redux_formError:state.baseForm.formError,
    _inner_redux_formHide:state.baseForm.formHide
  };
}
// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
  return {
    _inner_redux_setFieldValue: (fieldName,fieldValue) => dispatch(setFieldValue(fieldName,fieldValue)),
    _inner_redux_initFormData:(formData) => dispatch(initFormData(formData)),
    _inner_redux_initFormSchema:(formSchema) => dispatch(initFormSchema(formSchema)),
    _inner_redux_setFieldError:(fieldName,fieldError) => dispatch(setFieldError(fieldName,fieldError)),
    _inner_redux_setFieldHide:(fieldName,hideFlag) => dispatch(setFieldHide(fieldName,hideFlag)),
    _inner_redux_resetFormData:() => dispatch(resetFormData()),
    _inner_redux_resetFormError:() => dispatch(resetFormError()),
    _inner_redux_resetFormHide:() => dispatch(resetFormHide()),
  };
}
function renderFormSchema(formSchema,form){
    return formSchema.map(function(schema,index){
        return  <FormItem schema={schema}  form={form} key ={index} /> ;
    }) ;
}
/**
 * 从FormSchema中获取默认的formData数据
 */
function getFormDefaultValueState(fieldSchemaList){
    let obj = {} ;
    for(let item of fieldSchemaList){
        let {type} = item ;
        if(type==='complex'){
           let {fields} = item;
           fields.forEach(function(field){
                let {name,defaultValue} = field; 
                obj[name] = defaultValue ;
           }) ; 
        }else{
            let {name,defaultValue} = item; 
            obj[name] = defaultValue ;
        }
    }
    return obj ;
}

function getDefaultValue(value){
    if(value == null){
        return null ;
    }else{
        let str = Object.prototype.toString.call(value) ;
        return defaultValueMap[str]  ;
    }
}

let defaultValueMap ={
    '[object String]':'',
    '[object Array]':[],
    '[object Number]':'',
    '[object Boolean]':'',
    '[object Date]':''
} ;


export default createForm ;

