
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './components/HelloComp.jsx' ;

ReactDOM.render(
  <HelloComp />,
  document.getElementById('app')
);