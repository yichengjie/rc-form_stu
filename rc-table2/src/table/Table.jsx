import React,{Component,PropTypes} from 'react' ;
import TableHeader from './TableHeader.jsx' ;
import TableRow from './TableRow.jsx' ;

class Table extends Component {
    renderAllTrs(data,columns,rowKeyFn){
        return data.map((record,rowIndex)=>{
            return this.renderTrItem(record,columns,rowIndex,rowKeyFn) ;
        }) ;
    }
    renderTrItem(record,columns ,rowIndex ,rowKeyFn){
        return (<TableRow  record = {record}  
                    columns ={columns}  
                    rowIndex = {rowIndex}
                    key ={this.getKeyByRowKeyFn(record,rowIndex,rowKeyFn)}/>
        ) ;
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
                <TableHeader columns ={columns} />
                <tbody>
                    {this.renderAllTrs(data,columns,rowKeyFn)}
                </tbody>
            </table>
        );
    }
} ;

export default Table ;
