
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './components/HelloComp.jsx' ;
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

import TableDemo001 from './components/TableDemo001.jsx' ;

ReactDOM.render(
  <TableDemo001 />,
  document.getElementById('app')
);