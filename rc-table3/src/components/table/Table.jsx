let React = require('react') ;
let PropTypes = require('prop-types') ;
let Component = React.Component ;
let TableHeader = require('./TableHeader.jsx') ;
let TableRow  = require('./TableRow.jsx') ;

class Table extends Component {

    constructor(props){
        super(props) ;
        this.state = {
          selectedList:[]
        }
    }

    static propTypes = {
         columns: PropTypes.array,
         data: PropTypes.array,
         rowKeyFn: PropTypes.func,
         supportSelectAllFlag:PropTypes.bool
    } ;
    static defaultProps = {
        data: []
    };
    

    removeSelectedItem = (selectedItem) => {
        this.setState(preState =>{
            let selectedList = preState.selectedList ;
            let newList = selectedList.filter(item=>{
                return item !== selectedItem ;
            }) ;
            return Object.assign({},preState,{selectedList:newList}) ;
        })
    }


    getSelectedList(){
        return this.state.selectedList ;
    }

    // clearSelectedList(){
    //     this.setState({selectedList:[]}) ;
    // }

    handleSelectSingleCheckboxItem = (record) => {
       let selectedList = this.state.selectedList ;
       let flag = false ;
       let newList = selectedList.filter(item => {
          if(item === record){
              flag = true ;
              return false ;
          }
          return true ;
       }) ;
       if(!flag){
          newList.push(record) ;
       }
       this.setState({selectedList:newList}) ;
    }

    handleSelectAllCheckbox = e => {
        e.stopPropagation() ;
        let data = this.props.data ;
        let selectedList = this.state.selectedList ;
        //点击的前一刻checkbox的选中状态
        let selectedAllFlag = data.length > 0 && (data.length === selectedList.length) ;
        if(selectedAllFlag){//如果之前为选中，则selectedList将清空
            this.setState({selectedList:[]}) ;
        }else{
            this.setState({selectedList:[...data]}) ;
        }
    }

    renderAllTrs(param){
        let {data,columns,rowKeyFn,onRowClick,supportSelectAllFlag} = param ;
        return data.map((record,rowIndex)=>{
            let trParam = {record,columns,rowIndex,rowKeyFn,onRowClick ,supportSelectAllFlag} ;
            return this.renderTrItem(trParam) ;
        }) ;
    }
    renderTrItem(param){
        let {record,columns ,rowIndex ,rowKeyFn,onRowClick,supportSelectAllFlag} = param ;
        let selectedList = this.state.selectedList ;
        return (<TableRow  record = {record}  
                    selectedList = {selectedList}
                    columns ={columns}  
                    rowIndex = {rowIndex}
                    onRowClick = {onRowClick}
                    onDestroy = {this.removeSelectedItem}
                    supportSelectAllFlag = {supportSelectAllFlag}
                    handleSelectSingleCheckboxItem = {this.handleSelectSingleCheckboxItem}
                    key ={this.getKeyByRowKeyFn(record,rowKeyFn,rowIndex)}/>
        ) ;
    }
    //key一定要唯一能确定一条记录，并且必须由外部指定，不能直接使用rowIndex
    getKeyByRowKeyFn(record,rowKeyFn,rowIndex){
        if(rowKeyFn && typeof rowKeyFn === 'function'){
            return rowKeyFn.call(this,record,rowIndex) + '' ;
        }
        return record.key ;
    }

    render() {
        let {columns,data,rowKeyFn,onRowClick,supportSelectAllFlag} = this.props ;
        let param = {columns,data,rowKeyFn,onRowClick,supportSelectAllFlag} ;
        let selectedList = this.state.selectedList ;
        let selectedAllFlag = data.length > 0 && (data.length === selectedList.length) ;
        return (
            <table className="table table-bordered">
                <TableHeader columns ={columns} 
                    supportSelectAllFlag={supportSelectAllFlag} 
                    selectedAllFlag={selectedAllFlag}
                    handleSelectAllCheckbox = {this.handleSelectAllCheckbox}/>
                <tbody>
                    {this.renderAllTrs(param) }
                </tbody>
            </table>
        );
    }
} ;

module.exports = Table ;
