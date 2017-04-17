import React,{Component} from 'react' ;
import createBaseInput from './CreateBaseInput.jsx' ;

class OCCheckbox extends Component {
    constructor(props){
        super(props) ;
        this.handleChange = this.handleChange.bind(this) ;
    }
    
    handleChange(event){
        var checkedFlag = event.target.checked ;
        var value = event.target.value || [] ;
        //如果是选中
        var oldValue = this.props.value || [] ;
        var newValue = null ;
        if(checkedFlag){
            newValue = [value].concat(oldValue)  ;
        }else{//选出
            newValue = oldValue.filter(function(item){
                return item !== value ;
            }) ;
        }
        this.props.handleChange(newValue) ;
    }

    render(){
        let {name} = this.props ;
        let value = this.props.value || [];
        let options = this.props.options || [] ;
        let arr = options.map((item,index) =>{
            return (
                <label key ={index} className="checkbox-inline">
                    <input type="checkbox" value={item.value} 
                        checked={value.includes(item.value)} 
                        onChange ={this.handleChange}/>{' ' + item.name}
                </label>
            ) ;
        }) ;
        return (
            <div className="checkbox">
                {arr}
            </div>
        ) ;
    }
}

export default createBaseInput(OCCheckbox) ;