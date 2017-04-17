import React,{Component} from 'react' ;
import createBaseInput from './CreateBaseInput.jsx' ;

class OCRadio extends Component{

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
      let radios = options.map((item,index)=>{
          let curValue = item.value ;
          let curLabel = item.name ;
          return (
              <label className="radio-inline" key={index}>
                <input type="radio" name={name}  
                    value={curValue} 
                    checked={value === curValue} 
                    onChange={this.handleChange}/>
                {curLabel}
              </label>
          ) ;
      }) ;

      return <span className="radio">{radios}</span> ;
  }
}

export default createBaseInput(OCRadio) ; 