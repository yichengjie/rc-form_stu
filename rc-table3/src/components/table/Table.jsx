let React = require('react') ;
let PropTypes = require('prop-types') ;
let Component = React.Component ;
let TableHeader = require('./TableHeader.jsx') ;
let TableRow  = require('./TableRow.jsx') ;

class Table extends Component {
    static propTypes = {
         columns: PropTypes.array,
         data: PropTypes.array,
         rowKeyFn: PropTypes.func
    } ;
    static defaultProps = {
        data: []
    };
    renderAllTrs(data,columns,rowKeyFn,onRowClick){
        return data.map((record,rowIndex)=>{
            return this.renderTrItem(record,columns,rowIndex,rowKeyFn,onRowClick) ;
        }) ;
    }
    renderTrItem(record,columns ,rowIndex ,rowKeyFn,onRowClick){
        return (<TableRow  record = {record}  
                    columns ={columns}  
                    rowIndex = {rowIndex}
                    onRowClick = {onRowClick}
                    key ={this.getKeyByRowKeyFn(record,rowIndex,rowKeyFn)}/>
        ) ;
    }
    getKeyByRowKeyFn(record,rowIndex,rowKeyFn){
        let tmpStr = '' ;
        if(rowKeyFn && typeof rowKeyFn === 'function'){
            tmpStr = rowKeyFn(record,rowIndex) + '' ;
        }
        return rowIndex + '' +  tmpStr + record.key ;
    }

    render() {
        let {columns,data,rowKeyFn,onRowClick} = this.props ;
        return (
            <table className="table table-bordered">
                <TableHeader columns ={columns} />
                <tbody>
                    {this.renderAllTrs(data,columns,rowKeyFn,onRowClick)}
                </tbody>
            </table>
        );
    }
} ;

module.exports = Table ;
