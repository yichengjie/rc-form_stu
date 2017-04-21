let React = require('react') ;
let PropTypes = require('prop-types') ;
let Component = React.Component ;
let TableCell = require('./TableCell.jsx') ;

class TableRow extends Component{
    static propTypes = {
         record: PropTypes.object,
         columns: PropTypes.array,
         rowIndex: PropTypes.number,
         onRowClick: PropTypes.func
    }

    static defaultProps = {
        onRowClick(){}
    }

    renderAllTds(record,columns,rowIndex){
        return columns.map( (column,columnIndex) => {
            let obj = {record,column,rowIndex} ;
            return <TableCell {...obj}  key ={columnIndex}/>
        }) ;
    }
    
    render(){
        let {record,columns,rowIndex,onRowClick} = this.props ;
        return (
            <tr onClick= {onRowClick(record,rowIndex)}>
                {this.renderAllTds(record,columns,rowIndex)}
            </tr>
        ) ;
    }
}

module.exports = TableRow ;