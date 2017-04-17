import React,{Component} from 'react' ;
import classNames from 'classnames';
import createBaseInput from './CreateBaseInput.jsx' ;

function isString(obj){
    return Object.prototype.toString.call(obj) === '[object String]' ;
}

class OCInput extends Component {

    constructor(props){
        super(props) ;
        console.info('oc-input constructor is call...') ;
        this.handleChange = this.handleChange.bind(this) ;
    }
    handleChange(event){
        var value = event.target.value ;
        this.props.handleChange(value) ;
    }

    render(){
        let {name,value,unit} = this.props ;

        let hasUnitFlag = false ;
        if(unit != null && isString(unit) && unit.length > 0){
            hasUnitFlag = true ;
        }
        let classStr = classNames('form-control', { 'input-with-unit': hasUnitFlag}); // => 'foo bar'
        let inputComp = <input className= {classStr}  type="text"  style={{width:this.props.width}}
                    name ={name} value={value || ''} onChange={this.handleChange}/>    ;
        if(hasUnitFlag){
             return (
                 <span className="input-with-unit-wrapper">
                    {inputComp}
                    <span className ="input-unit">
                     {unit}
                    </span>
                 </span>
                
            ) ;
        }
        return inputComp ;
       
    }
}

export default createBaseInput(OCInput) ;