import React,{Component} from 'react';
import BaseModule from '../components/BaseModule.jsx';
import CreateBaseForm from '../components/CreateBaseForm.jsx'; 
import FormGroup from '../components/FormGroup.jsx' ;

class UserInfoEditForm extends BaseModule {
    constructor( props ){
        super( props ) ;
    }
    //初始化数据
    getInitialFormData(){
        return {
            username:'yicj',
            addr:'',
            age1:'',
            age2:''
        } ;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let formData = this.getFormData () ;
        let infoStr = JSON.stringify(formData,null,2) ;
        console.info('formData : ' ,infoStr) ;
    }
    toRender(){
        let formError = this.getFormError() ;
        return (
            <div>
                <form className="form-horizontal">

                    <FormGroup label="用户名" errorTip = {formError.username}>
                        <input type="text" className="form-control"  {...this.getFieldProp('username')} />
                    </FormGroup>

                    <FormGroup label="地址" errorTip = {formError.addr}>
                        <input type="text" className="form-control" {...this.getFieldProp('addr')} />
                    </FormGroup>

                    <FormGroup label="年龄范围" errorTip = {formError.age1 || formError.age2 }>
                        
                        <div className="row">
                            <div className="col-sm-6">
                                 <input type="text" className="form-control" {...this.getFieldProp('age1')} />
                            </div>
                            <div className="col-sm-6">
                                 <input type="text" className="form-control" {...this.getFieldProp('age2')} />
                            </div>
                        </div>

                    </FormGroup>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" onClick={this.handleSubmit} className="btn btn-default">Sign in</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default CreateBaseForm(UserInfoEditForm) ;

