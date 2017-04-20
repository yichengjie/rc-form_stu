import React,{Component} from 'react' ;

class Theader extends Component{
    renderAllThs(columns){
        return columns.map((item,columnIndex) => {
            return  this.renderThItem(item,columnIndex);
        }) ;
    }
    renderThItem(item,columnIndex){
        let {title,key} = item ;
        key = columnIndex + '' + key ;
        return (
             <th key={key}>{title}</th>
        ) ;
    }
    render(){
        let columns = this.props.columns ;
        return (
            <thead>
                <tr>
                    {this.renderAllThs(columns)}
                </tr>
            </thead>
        ) ;
    }
}


class TrItem extends Component{
    renderAllTds(record,columns,rowIndex){
        return columns.map( (column,columnIndex) => {
            return this.renderTdItem(record,column,rowIndex,columnIndex) ;
        }) ;
    }
    renderTdItem(record,column,rowIndex,columnIndex){
        let fieldName = column.dataIndex ;
        let showText = record[fieldName] ;
        if(fieldName && fieldName.length > 0){
             return <td key ={columnIndex}>{showText}</td> ;
        }else{
            return <td key ={columnIndex}>{column.render(record,rowIndex)}</td> ;
        }
    }
    render(){
        let {record,columns,rowIndex} = this.props ;
        return (
            <tr>
                {this.renderAllTds(record,columns,rowIndex)}
            </tr>
        ) ;
    }
}

class Table extends Component {
    renderAllTrs(data,columns,rowKeyFn){
        return data.map((record,rowIndex)=>{
            return this.renderTrItem(record,columns,rowIndex,rowKeyFn) ;
        }) ;
    }
    renderTrItem(record,columns ,rowIndex ,rowKeyFn){
        return (<TrItem  record = {record}  
                    columns ={columns}  
                    rowIndex = {rowIndex}
                    key ={this.getKeyByRowKeyFn(record,rowIndex,rowKeyFn)}/>) ;
    }
    getKeyByRowKeyFn(record,rowIndex,rowKeyFn){
        let tmpStr = '' ;
        if(rowKeyFn && typeof rowKeyFn === 'function'){
            tmpStr = rowKeyFn(record,rowIndex) + '' ;
        }
        return tmpStr + record.key ;
    }

    render() {
        let {columns,data,rowKeyFn} = this.props ;
        return (
            <table className="table table-bordered">
                <Theader columns ={columns} />
                <tbody>
                    {this.renderAllTrs(data,columns,rowKeyFn)}
                </tbody>
            </table>
        );
    }
} ;

export default Table ;
