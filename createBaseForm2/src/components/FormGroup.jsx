import React, { Component, PropTypes } from 'react';

class FormGroup extends Component{
    constructor(props){
        super(props) ;
    }
    render () {
        let {label} = this.props ;
        return (
           <div className="form-group">
                <label className="col-sm-2 control-label">{label}</label>
                <div className="content col-sm-7">
                    {this.props.children}
                </div>
                <div className="col-sm-3">
                    错误提示区域
                </div>
            </div>
        )
    }
}

export default FormGroup ;