import React, { Component, PropTypes } from 'react';

class BaseModule extends Component{
    constructor(props){
        super(props) ;
        console.info('BaseModule constructor ...') ;
        let baseState = {
            msg:'test msg',
            loading:false,
            success:true,
        } ;
       
        this.state = baseState ;
        
    }

    // setPlainState = (obj) =>{
    //      this.setState(function(preState){
    //         let newState = Object.assign({},preState,obj) ;
    //          return newState ;
    //      }) ;
    // }

    renderLoading(){
        return <div className="no-data">
            <img src="http://gtms04.alicdn.com/tps/i4/T1hPyYFD0kXXa679Pe-40-40.gif" width="20" />
        </div>
    }
    renderIOError(){//当再次被点击的时候可以再次查询数据
        console.info(this.state.msg) ;
        return (<div onClick={this.componentDidMount.bind(this)}
                        className="no-data">{this.state.msg || "请求失败"}</div>)
    }
    renderError(){
        return <div className="no-data" onClick={this.componentDidMount.bind(this)}>数据格式不正确</div>
    }
    render() {
        //console.info('state : ' ,this.state) ;
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

