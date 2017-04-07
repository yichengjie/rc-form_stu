import  React,{Component} from 'react'
import { createForm } from 'rc-form';

class Form extends React.Component {

  componentWillMount() {
    this.requiredDecorator = this.props.form.getFieldDecorator('required', {
        rules: [{required: true}],
        initialValue:''
    });
  }
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }

  render() {
    let errors;
    const { getFieldError } = this.props.form;
    return (<div>
      {this.requiredDecorator(
      <input onChange={e=>console.info(e.target.value)}
      />)}
      {(errors = getFieldError('required')) ? errors.join(',') : null}
      <button onClick={this.submit}>submit</button>
    </div>)
  }
}

export default createForm()(Form);