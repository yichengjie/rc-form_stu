import React,{Component} from 'react' ;
import classNames from 'classnames';
import createBaseInput from './CreateBaseInput.jsx' ;

class OCSelect extends Component{
    
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
      let options = this.props.options || [] ;
      let classStr = classNames('form-control', { 'error-input-border': !this.props.isValid }); // => 'foo bar'
      return (
        <select className= {classStr} name ={name} 
            value ={value} onChange={this.handleChange}
            style={{width:this.props.width}}>
            {options.map(function(t,index){
                return <option value={t.value} key ={index}>{t.name}</option>
            })}
        </select>
      ) ;
  }

}

export default createBaseInput(OCSelect)  ;