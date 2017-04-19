'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
require('rc-table/assets/index.css');
import HelloComp from './components/HelloComp.jsx' ;
import SimpleTable1 from './components/SimpleTable1.jsx' ;
import SimpleTable2 from './components/SimpleTable2.jsx' ;
import SubTable1 from './components/SubTable1.jsx' ;

ReactDOM.render(
  <SubTable1 />,
  document.getElementById('app')
);