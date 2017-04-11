
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import Helloworld from './views/Helloworld.jsx' ;
//import HelloComp from './components/HelloComp2.jsx' ;
//import AsyncInit from './components/async-init.js' ;
import DepartmentList from './views/DepartmentList.jsx' ;
import DepartmentList2 from './views/DepartmentList2.jsx' ;

ReactDOM.render(
  <DepartmentList2 />,
  document.getElementById('app')
);