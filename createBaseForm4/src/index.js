
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
require('bootstrap/dist/css/bootstrap.css') ;
require('./styles/index.css') ;
//引入组件
import CreateBaseFormView from './views/UserInfoList.jsx' ;
import CreateBaseFormCustomView from './views/UserInfoList-custom.jsx' ;
let ShowView = CreateBaseFormView ;
//let ShowView = CreateBaseFormCustomView ;

ReactDOM.render(
  <ShowView />,
  document.getElementById('app')
);