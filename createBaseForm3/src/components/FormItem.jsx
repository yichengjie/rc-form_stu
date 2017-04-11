import React,{Component} from 'react' ;
import OCInput from './oc-input.jsx' ;
import OCTextArea from './oc-textarea.jsx' ;
import OCDate from './oc-date.jsx' ;
import OCRadio from './oc-radio.jsx' ;
import OCSelect from './oc-select.jsx' ;
import OCCheckbox from './oc-checkbox.jsx' ;

/**
 * 获取输入框$$_a$$_b
 */
function InputCompFactory({form,schema}){
    let {type,name} = schema ;
    let inputComp = null ;
    if('complex' === type){
        inputComp = null ;
    }else{
        inputComp = getSimpleInputComp(form,schema) ;
    }
    return inputComp ;
}

function handleChange4InputFactory(form,fieldName){
    return function(fieldValue){
        console.info(`fieldName:${fieldName},fieldValue : ${fieldValue}`) ;
        form.setFieldValue(fieldName,fieldValue) ;
    }
}

/**
 * 简单类型
 * @param form
 * @param schema
 */
function getSimpleInputComp(form,schema){
    let {type,name} = schema ;
    let inputComp = null ;
    //name ={} value = {} onChange={}
    if(['text','email'].includes(type)){
        inputComp = <OCInput />
    }else if('textarea' === type){
        inputComp = <OCTextArea />
    }else if('date' === type){
        inputComp = <OCDate />
    }else if('select' === type){
        inputComp = <OCSelect options ={schema.options} /> ;
    }else if('radio' === type){
        inputComp = <OCRadio options ={schema.options}/>
    }else if('checkbox' === type){
        inputComp = <OCCheckbox options ={schema.options}/>
    }
    return inputComp ==null ? null : React.cloneElement(inputComp,{
        value:form.getFieldValue(name),
        width:schema.width,
        handleChange:handleChange4InputFactory(form,name),
    }) ;
}


function FormItem ({form,schema}){
    //如果需要显示form group
    let {label,name} = schema ;
    let inputComp = InputCompFactory({form,schema}) ;
    if(inputComp == null){
        return null ;
    }
    return (
        <div className="form-group">
            <label  className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-5">
                {inputComp}
            </div>
            <span className="error-tip col-sm-3">
            {form.getFieldError(name)}
            </span>
        </div>
    ) ;
}

export default FormItem ;



