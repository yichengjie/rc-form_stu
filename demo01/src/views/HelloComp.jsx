import  React,{Component} from 'react'
import { createForm } from 'rc-form';

class Form extends React.Component {
  constructor(){
      super() ;
      this.state = {
          normal:"",
          required:""
      } ;
  }  
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (<div>
      <input {...getFieldProps('normal')}/>
      <input {...getFieldProps('required', {
        onChange(){}, // have to write original onChange here if you need
        rules: [{required: true}],
      })}/>
      {(errors = getFieldError('required')) ? errors.join(',') : null}
      <button onClick={this.submit}>submit</button>
    </div>)
  }
}

export default createForm()(Form);