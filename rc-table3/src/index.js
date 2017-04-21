'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import 'bootstrap/dist/css/bootstrap.css' ;
import TableDemo1 from './views/TableDemo1.jsx' ;

ReactDOM.render(
  <TableDemo1 />,
  document.getElementById('app')
);