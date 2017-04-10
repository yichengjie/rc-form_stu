
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import Helloworld from './components/Helloworld.jsx' ;
//import HelloComp from './components/HelloComp2.jsx' ;
//import AsyncInit from './components/async-init.js' ;
import DepartmentList from './components/DepartmentList.jsx' ;

ReactDOM.render(
  <DepartmentList />,
  document.getElementById('app')
);