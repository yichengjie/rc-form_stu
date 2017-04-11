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
    componentDidMount(){
        console.info('获取数据.....') ;
    }
    handleChangeFactory (fieldName){
        return (event)=>{
            var value = event.target.value ;
            this.setFormData({[fieldName]:value}) ;
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let formData = this.getFormData () ;
        let infoStr = JSON.stringify(formData,null,2) ;
        console.info('formData : ' ,infoStr) ;
    }
    toRender(){
        return (
            <div>
                <form className="form-horizontal">

                    <FormGroup name ="username" label="用户名" form = {this.form}>
                        <input type="text" className="form-control"  {...this.getFieldProp('username')} />
                    </FormGroup>

                    <FormGroup name ="addr" label="地址" form = {this.form}>
                        <input type="text" className="form-control" {...this.getFieldProp('addr')} />
                    </FormGroup>

                    <FormGroup name ="age" label="年龄范围" form = {this.form}>
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

