let React = require('react') ;
let PropTypes = require('prop-types') ;
let Component = React.Component ;
let TableCell = require('./TableCell.jsx') ;

class TableRow extends Component{
    static propTypes = {
         record: PropTypes.object,
         columns: PropTypes.array,
         rowIndex: PropTypes.number,
         onRowClick: PropTypes.func,
         supportSelectAllFlag: PropTypes.bool,
         selectedList: PropTypes.array,
         onDestroy: PropTypes.func
    }

    static defaultProps = {
        onRowClick(){},
        onDestroy(record){},
        selectedList:[]
    }

    componentWillUnmount(){
        let record = this.props.record ;
        this.props.onDestroy(record) ;
    }

    renderAllTds(record,columns,rowIndex,supportSelectAllFlag){
        let arr = columns.map( (column,columnIndex) => {
            let obj = {record,column,rowIndex} ;
            return <TableCell {...obj}  key ={columnIndex}/>
        }) ;
        if(supportSelectAllFlag){
            arr.splice(0,0,this.getSingleSelectComp(columns.length,record)) ;
        }
        return arr ;
    }

    handleSelectSingleCheckboxItemFactory(record) {
        return e => {
            e.stopPropagation() ;
            this.props.handleSelectSingleCheckboxItem(record) ;
        }
    } 

    

    getSingleSelectComp(columnCount,record){
        let checkedFlag = false; 
        if( this.props.selectedList.length > 0){
            checkedFlag = this.props.selectedList.includes(record) ;
        }
        return (<td key ={columnCount} onClick ={e => e.stopPropagation()}>
                     <label className="checkbox-inline" >
                        <input type="checkbox"  checked = {checkedFlag}  
                            onClick={this.handleSelectSingleCheckboxItemFactory(record)}/>选择
                    </label> 
                </td>
        ) ;
    }
    
    
    render(){
        let {record,columns,rowIndex,onRowClick,supportSelectAllFlag} = this.props ;
        return (
            <tr onClick= {onRowClick(record,rowIndex)}>
                {this.renderAllTds(record,columns,rowIndex,supportSelectAllFlag)}
            </tr>
        ) ;
    }
}


module.exports = TableRow ;