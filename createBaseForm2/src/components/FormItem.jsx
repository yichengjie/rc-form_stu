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
    let {type,name,rule} = schema ;
    let inputComp = null ;
    if('complex' === type){
        inputComp = null ;
    }else{
        let errorStr = getFieldErrorStr(form,schema) ;
        inputComp = getSimpleInputComp(form,schema,errorStr ==null || errorStr.length === 0 ) ;
    }
    return inputComp ;
}
/**
 * 简单类型
 * @param form
 * @param schema
 * @param index  (复杂表单才有意义)    一组控件的的第几个
 * @param count （复杂表单才会有意义）  一组控件总数
 */
function getSimpleInputComp(form,schema,isValid,index){
    let {type,name,rule} = schema ;
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
        key:index,
        isValid:isValid/**是否合法 */
    }) ;
}


function FormItem ({form,schema}){
    //如果需要显示form group
    let {label} = schema ;
    return (
        <div className="form-group">
            <label  className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-5">
                {InputCompFactory({form,schema})}
            </div>
            <span className="error-tip col-sm-3">错误提示</span>
        </div>
    ) ;
}


export default FormItem ;



