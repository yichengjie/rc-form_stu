'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//import Perf from 'react-addons-perf' ; // ES6
import { Provider } from 'react-redux';
import store from './redux/editPageStore.js' ;
//引入组件
import 'bootstrap/dist/css/bootstrap.css' ;
import './styles/jquery_ui.datepicker-modify.css';
import './styles/jquery-ui-timepicker-addon.css' ;
import './styles/app.scss' ;
import './lib/tui-core/index.js' ;
import './lib/tui-drag/index.js' ;
import './lib/jq-datepicker/index.js' ;
import EditPageDemo from './views/EidtPageDemo.jsx' ;
import QueryPageDemo from './views/QueryPageDemo.jsx' ;
import HelloDemo from './views/HelloDemo.jsx' ;


let ShowView = QueryPageDemo ;
ShowView = EditPageDemo ;
//ShowView = HelloDemo ;
//window.Perf = Perf ;
// class App extends Component{
// 	constructor(props){
// 		super(props) ;
// 	}
// 	render(){
// 		console.info('App render method is call...') ;
// 		return (
// 			<ShowView/>
// 		) ;
// 	}
// }


ReactDOM.render(
  <Provider store={store}>
    <ShowView/>
  </Provider>,
  document.getElementById('app')
);

