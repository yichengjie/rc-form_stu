
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
//import HelloComp from './components/HelloComp.jsx' ;
import HelloComp from './components/HelloComp2.jsx' ;
import AsyncInit from './components/async-init.js' ;

ReactDOM.render(
  <AsyncInit />,
  document.getElementById('app')
);