import React,{Component} from 'react' ;

class FormGroup extends Component{
    render () {
        //如果需要显示form group
        let label = this.props.label ;
        let msg = this.props.msg ;
        let hideFlag = this.props.hideFlag ;
        if(hideFlag){
            return null ;
        }
        return (
            <div className="form-group">
                <label  className="col-sm-2 control-label">{label}</label>
                <div className="col-sm-7">
                    {this.props.children}
                </div>
                <span className="error-tip col-sm-3">
                    {msg}
                </span>
            </div>
        )
    }
}

export default FormGroup ;
