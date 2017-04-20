import React,{Component,PropTypes} from 'react' ;
import TableCell from './TableCell.jsx' ;

class TableRow extends Component{
    renderAllTds(record,columns,rowIndex){
        return columns.map( (column,columnIndex) => {
            let obj = {record,column,rowIndex} ;
            return <TableCell {...obj}  key ={columnIndex}/>
        }) ;
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

export default TableRow ;