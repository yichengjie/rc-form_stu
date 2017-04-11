
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
require('bootstrap/dist/css/bootstrap.css') ;
require('./styles/index.css') ;
//引入组件
import CreateBaseFormView from './views/CreateBaseFormView.jsx' ;

ReactDOM.render(
  <CreateBaseFormView />,
  document.getElementById('app')
);