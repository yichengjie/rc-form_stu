'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import 'bootstrap/dist/css/bootstrap.css' ;
// require('rc-table/assets/index.css');
// import HelloComp from './components/HelloComp.jsx' ;
// import SimpleTable from './components/SimpleTable.jsx' ;
// import SimpleTable2 from './components/SimpleTable2.jsx' ;
// import SubTable from './components/SubTable.jsx' ;
// import NoData from './components/NoData.jsx' ;
// import NestedData from './components/NestedData.jsx' ;
// import SpecifyKey from './components/SpecifyKey.jsx' ;
// import JSXTable from './components/JSXTable.jsx' ;
// import TitleAndFooter from './components/TitleAndFooter.jsx' ;
// import RowAndCellClick from './components/RowAndCellClick.jsx' ;
// import ScrollX from './components/ScrollX.jsx' ;
// import ScrollXY from './components/ScrollXY.jsx' ;
// import ScrollY from './components/ScrollY.jsx' ;
// import HideTableHeader from './components/HideTableHeader.jsx' ;
// import GroupingColumns from './components/GroupingColumns.jsx' ;
// import FixedColumns from './components/FixedColumns.jsx' ;
// import FixedColumnsAndHeader from './components/FixedColumnsAndHeader.jsx' ;
// import ExpandedRowRender from './components/ExpandedRowRender.jsx' ;
import ChildrenIndent from './components/ChildrenIndent.jsx' ;
import ClassName from './components/ClassName.jsx' ;
import ColspanRowspan from './components/ColspanRowspan.jsx' ;
import Dropdown from './components/Dropdown.jsx' ;
import TableDemo1 from './views/TableDemo1.jsx' ;

ReactDOM.render(
  <Dropdown />,
  document.getElementById('app')
);