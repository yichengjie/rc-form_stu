import React from 'react';
import ReactDOM from 'react-dom';
//给当前模块一个漂亮的加载中状态
class Placeholder extends React.Component {
    render(){
        return <div className="department-list placeholder">
            <dl className="department-big-list">
                <dt><span className="title"></span></dt>
                <dd>
                    <ul>
                        <li><a></a></li>
                        <li><a></a></li>
                        <li><a></a></li>
                        <li><a></a></li>
                        <li><a></a></li>
                        <li><a></a></li>
                        <li><a></a></li>
                    </ul>
                </dd>
            </dl>
        </div>
    }
}