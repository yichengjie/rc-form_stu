'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import 'bootstrap/dist/css/bootstrap.css' ;
import TableDemo1 from './views/TableDemo1.jsx' ;
import Demo02 from './views/Demo02.jsx' ;

ReactDOM.render(
  <Demo02 />,
  document.getElementById('app')
);