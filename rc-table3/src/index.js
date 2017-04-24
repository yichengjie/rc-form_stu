'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import 'bootstrap/dist/css/bootstrap.css' ;
import TableDemo1 from './views/TableDemo1.jsx' ;
import Demo02 from './views/Demo02.jsx' ;
import Demo03 from './views/Demo03.jsx' ;
import RcTable001 from './views/rctable001.jsx' ;
import TableAnimation from './views/TableAnimation.jsx' ;


ReactDOM.render(
  <TableAnimation />,
  document.getElementById('app')
);