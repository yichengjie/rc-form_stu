import React,{Component} from 'react' ;
import classNames from 'classnames';
//import {genSimulationEventByValue} from '../common/common.js' ;
import createBaseInput from './CreateBaseInput.jsx' ;

class InputDate extends Component{
    constructor(props){
        super(props) ;
        this.handleInputChange = this.handleInputChange.bind(this) ;
    }
    componentDidMount() {
        //let elem = ReactDOM.findDOMNode(this.myInput) ;
        let elem = this.myInput ;
        var minDate = new Date() ;
        //配置日期控件
        var optionObj = {} ;
        optionObj.dateFormat = "yy-mm-dd" ;
        optionObj.onSelect = (dateText,picker) =>{
            this.props.handleChange(dateText) ;
        };
        optionObj.minDate = minDate ;
        optionObj.showButtonPanel = true ;
        $(elem).datepicker(optionObj);
    }
   
    handleInputChange(event){
       var value = event.target.value ;
       this.props.handleChange(value) ;
    }
    render(){
       let classStr = classNames('form-control', { 'error-input-border': !this.props.isValid }); // => 'foo bar'
       return (
            <input type="text" 
                style={{width:this.props.width}}
                value={this.props.value || ''}
                className = {classStr} 
                onChange={this.handleInputChange}
                ref ={ t=>this.myInput= t}/>
       ) ;
    }
};

export default createBaseInput(InputDate);