import React,{Component} from 'react' ;
import classNames from 'classnames';

class OCInput extends Component {

    constructor(props){
        super(props) ;
        this.handleChange = this.handleChange.bind(this) ;
    }
    handleChange(event){
        var value = event.target.value ;
        this.props.handleChange(value) ;
    }

    render(){
        let {name,value} = this.props ;
        let classStr = classNames('form-control', { 'error-input-border': !this.props.isValid }); // => 'foo bar'
        return (
            <input className= {classStr}  type="text"  style={{width:this.props.width}}
                name ={name} value={value || ''} onChange={this.handleChange}/>    
        ) ;
    }
}

export default OCInput ;