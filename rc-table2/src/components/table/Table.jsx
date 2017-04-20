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
    }
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

module.exports = Table ;
