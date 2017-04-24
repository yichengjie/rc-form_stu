'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import 'bootstrap/dist/css/bootstrap.css' ;
import './style/index.css' ;
import TableDemo1 from './views/TableDemo1.jsx' ;
import SimpleDemo1 from './views/SimpleDemo1.jsx' ;
import PagebarDemo1 from './views/PagebarDemo1.jsx' ;

ReactDOM.render(
  <TableDemo1 />,
  document.getElementById('app')
);