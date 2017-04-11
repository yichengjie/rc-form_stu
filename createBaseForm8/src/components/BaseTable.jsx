import React,{Component} from 'react';

function handleClickFactory(callback,item){
    return function(event){
        return callback && callback.call(null,item) ;
    }
}
export default class BaseTable extends Component{
    //render操作列
    renderOperColumn (dataItem){
        //操作列的所有节点
        let operColumnChildren =this.props.children ;
        let opers = React.Children.map(operColumnChildren,(operElem,index)=>{
            //将一行的数据传给onClick的回调函数中
            let handleClick = handleClickFactory(operElem.props.handleClick,dataItem) ;
            return React.cloneElement(operElem,{key:index,onClick:handleClick}) ;
        }) 
        return opers ;
    }
    //render一行中的所有td
    renderTds(dataItem){
        let names = this.props.tableFields.map(item=>item.name) ;
        return names.map((name,index)=>{
            return <td key={index}>{dataItem[name]}</td>
        }) ;
    }

    //render表头部分
    renderTitle(tableFields){
        let titles =  tableFields.map((item,index)=>{
            return <th key ={index}>{item.label}</th>
        }) ;
        //<th>操作</th>
        let count = React.Children.count(this.props.children) ;
        if(count>0){
            titles.push(<th key ="operTableColumn">操作</th>) ;
        }
        return titles ;
    }

    renderTrs(tableFields,list){
        let names = tableFields.map(item=>item.name) ;
        return list.map((item,index)=>{
            return (
                    <tr key={index}>
                        {this.renderTds(item)}
                        <td className="oper-column">
                            {this.renderOperColumn(item) }
                        </td>
                    </tr>
            ) ;
        }) ;
    }
    render(){
        let {tableFields,list} = this.props ;
        return (
            <div>
                <table className="table table-striped table-border">
                    <thead>
                        <tr>
                            {this.renderTitle(tableFields)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTrs(tableFields,list)}
                    </tbody>
                </table>
            </div>
        ) ;
    }
}


