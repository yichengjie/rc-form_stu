
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
require('bootstrap/dist/css/bootstrap.css') ;
require('./styles/index.css') ;
//引入组件
import CreateBaseFormView from './views/CreateBaseFormView.jsx' ;
import CreateBaseFormView2 from './views/CreateBaseFormView2.jsx' ;
let ShowView = CreateBaseFormView ;
//let ShowView = CreateBaseFormView2 ;

ReactDOM.render(
  <ShowView />,
  document.getElementById('app')
);