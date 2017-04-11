import React, { Component, PropTypes } from 'react';

class FormGroup extends Component{
    constructor(props){
        super(props) ;
    }
    render () {
        let {label,errorTip} = this.props ;
        return (
           <div className="form-group">
                <label className="col-sm-2 control-label">{label}</label>
                <div className="content col-sm-7">
                    {this.props.children}
                </div>
                <div className="col-sm-3 error-tip">
                   {errorTip} 
                </div>
            </div>
        )
    }
}

export default FormGroup ;