import React, { Component, PropTypes } from 'react';

class BaseModule extends Component{
    constructor(props){
        super(props) ;
        //console.info('BaseModule constructor ...') ;
        let baseState = {
            msg:'test msg',
            loading:false,
            success:true,
        } ;
        this.state = baseState ;
    }
    renderLoading(){
        return <div className="no-data">
            <img src="http://gtms04.alicdn.com/tps/i4/T1hPyYFD0kXXa679Pe-40-40.gif" width="20" />
        </div>
    }
    renderIOError(){//当再次被点击的时候可以再次查询数据
        return (<div className="no-data">{this.state.msg || "请求失败"}</div>)
    }
    renderError(){
        return <div className="no-data">数据格式不正确</div>
    }
    render() {
        //console.info('_inner_weird_formData : ' ,this.state._inner_weird_formData) ;
        console.info('_inner_weird_formData : ' ,this.stringify(this.state._inner_weird_formData)) ;
        if (this.state.loading) {
            return this.renderLoading() ;
        }
        if (this.state && this.state.success == false) {
            return this.renderIOError() ;
        } else {
            try {
                return this.toRender() ;
            } catch (e) {
                if (navigator.userAgent.indexOf("MSIE 8.0") == -1){
                    console.log(e, this) ;
                }
                return this.renderError() ;
            }
        }
    }
}

export default BaseModule ;

