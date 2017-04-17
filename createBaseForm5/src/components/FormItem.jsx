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
        inputComp = getComplexInputComp(form,schema) ;
    }else{
        inputComp = getSimpleInputComp(form,schema) ;
    }
    return inputComp ;
}

function handleChange4InputFactory(form,fieldName){
    return function(fieldValue){
        //console.info(`fieldName:${fieldName},fieldValue : ${fieldValue}`) ;
        form.setSingleFieldValue(fieldName,fieldValue) ;
    }
}

/**
 * 简单类型
 * @param form
 * @param schema
 */
function getSimpleInputComp(form,schema,keyIndex){
   // console.info('method getSimpleInputComp () is called .. ') ;
    let {type,name,defaultValue,unit} = schema ;
    let inputComp = null ;
    //如果隐藏的话直接返回null
    let hideFlag = form.getSingleHideState(name) ;
    if(hideFlag) return inputComp ;
    //如果组件需要显示
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
    //收集表单默认值
    return inputComp ==null ? null : React.cloneElement(inputComp,{
        value:form.getSingleFieldValue(name),
        width:schema.width,
        handleChange:handleChange4InputFactory(form,name),
        key:keyIndex,
        unit:unit
    }) ;
}

//处理复杂类型的schema
function dealComplexInputSchema(schema){
    let {fields} = schema ;
    let newFields = fields.map(function(item){
        let {unit,...other} = item ;
        return other ;
    }) ;
    return Object.assign({},schema,{fields:newFields}) ;
}




function getComplexInputComp(form,schema){
    //处理下复杂schema的数据
    schema = dealComplexInputSchema(schema)  ;
    let {fields,divline} = schema ;
    let arr = [] ;
    let len = fields.length ;
    //只要有一个空间是显示得就需要显示
    let needShowFlag = false ;
    for(let i =0 ;i < len ; i ++){
        let tmpFieldName = fields[i]['name'] ;
        //console.info(`fieldName: ${tmpFieldName},  hideFlag : ${hideFlag}`) ;
        //如果中间有分割线则将分割线显示出来
        if(arr.length > 0){
            if(divline){
                arr.push(<span key={'sp'+i} className="split-line"></span>) ;
            }else{
                arr.push(<span key={'sp'+i} className="split-line-none"></span>) ;
            }
        }
        let tmpInput = getSimpleInputComp(form,fields[i],i) ;
        if(tmpInput != null){
            arr.push(tmpInput) ;
            needShowFlag = true ;
        }
    }
    if(needShowFlag){
        return (
            <span className="input-complex">
                {arr}
            </span>
        ) ;
    }else{
        return null ;
    }
}


class FormItem extends Component{
    constructor(props){
        super(props) ;
        //收集表单的schema
        let {form,schema} = this.props ;
        let needAssembleFormSchema = this.props.needAssembleFormSchema ;
        if(needAssembleFormSchema !== false){
            //form.addFieldSchema(schema)
            form.addOrginFieldSchema(schema) ;
            form.addSingleValidateRuleByOrginFieldSchema(schema)
        }
    }   
   
    
    render () {
         //如果需要显示form group
        let {form,schema} = this.props ;
        let {label,name} = schema ;
        let inputComp = InputCompFactory({form,schema}) ;
        if(inputComp == null){
            return null ;
        }
        return (
            <div className="form-group">
                <label  className="col-sm-2 control-label">{label}</label>
                <div className="col-sm-7">
                    {inputComp}
                </div>
                <span className="error-tip col-sm-3">
                    {getFieldErrorStr(form,schema)}
                </span>
            </div>
        )
    }

}


function getFieldErrorStr(form,schema){
    let names = getNameFromFieldSchema(schema) ;
    let err = null ;
    for(let name of names){
        err = form.getSingleFieldError(name) ;
        if(err) break ;
    }
    return err || '' ;
}


function getNameFromFieldSchema(schema){
    let {type,name,fields} = schema ;
    if(type==='complex'){
        return fields.map(function(item){
            return item.name ;
        }) ;
    }
    return [name] ;
}

export default FormItem ;



