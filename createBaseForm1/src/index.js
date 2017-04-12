
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import Helloworld from './views/Helloworld.jsx' ;
//import HelloComp from './components/HelloComp2.jsx' ;
//import AsyncInit from './components/async-init.js' ;
import BaseFormView from './views/BaseFormView.jsx' ;
import CreateBaseForm from './views/CreateBaseForm.jsx' ;

ReactDOM.render(
  <Helloworld />,
  document.getElementById('app')
);