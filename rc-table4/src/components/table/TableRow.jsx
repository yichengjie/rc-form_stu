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
         onDestroy: PropTypes.func,
         supportSelectDisableFn:PropTypes.func
    }

    static defaultProps = {
        onRowClick(record,index){},
        onDestroy(record){},
        selectedList:[]
    }

    componentWillUnmount(){
        const { record, onDestroy, rowIndex } = this.props;
        //console.info('rowIndex : ' , rowIndex) ;
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
            //console.info('record .... ' ,record ) ;
            e.stopPropagation() ;
            this.props.handleSelectSingleCheckboxItem(record) ;
        }
    } 


    //判断当前checkbox是否应该被选中
    getCheckboxSelectedFlag (record){
        let checkedFlag = false; 
        let {supportSelectDisableFn,selectedList} = this.props ;
        let selectDisableFlag = supportSelectDisableFn(record) ;
        if(!selectDisableFlag){//false:可以选择，true：不能选择
            if(selectedList.length > 0){
               checkedFlag = this.props.selectedList.includes(record) ;
            }
        }
        return checkedFlag  ;
    }
    

    getSingleSelectComp(columnCount,record){
        let checkboxSelectedFlag = false; 
        let checkboxComp = null ;
        let {supportSelectDisableFn,selectedList} = this.props ;
        let selectDisableFlag = supportSelectDisableFn(record) ;
        if(!selectDisableFlag){//false:可以选择，true：不能选择
            checkboxSelectedFlag = this.getCheckboxSelectedFlag(record) ;
            checkboxComp = (<label className="checkbox-inline" >
                                <input type="checkbox"  checked = {checkboxSelectedFlag}  
                                    onClick={this.handleSelectSingleCheckboxItemFactory(record)}/>选择
                            </label> ) ;
        }
        return (<td key ={columnCount} onClick ={e => e.stopPropagation()}>
                   {checkboxComp} 
                </td>
        ) ;
    }
    
    
    render(){
        let {record,columns,rowIndex,onRowClick,supportSelectAllFlag} = this.props ;
        let checkboxSelectedFlag = this.getCheckboxSelectedFlag(record) ;
        return (
            <tr onClick= {onRowClick(record,rowIndex)} className={checkboxSelectedFlag ? 'info':''}>
                {this.renderAllTds(record,columns,rowIndex,supportSelectAllFlag)}
            </tr>
        ) ;
    }
}


module.exports = TableRow ;