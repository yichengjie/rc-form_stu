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
         width: PropTypes.number,
         columns: PropTypes.array,
         data: PropTypes.array,
         rowKeyFn: PropTypes.func,
         supportSelectAllFlag:PropTypes.bool,
         supportSelectAllWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
         supportSelectDisableFn:PropTypes.func,
         getBodyWrapper:PropTypes.func,
    } ;
    static defaultProps = {
        data: [],
        getBodyWrapper:body => body,
        supportSelectDisableFn:(record) => false
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
        let {supportSelectDisableFn,data} = this.props ;
        let selectedList = this.state.selectedList ;
        //点击的前一刻checkbox的选中状态
        let oldSelectedAllFlag = this.getAllSelectedFlag() ;
        //console.info(`oldSelectedAllFlag : ${oldSelectedAllFlag}`)
        if(oldSelectedAllFlag){//如果之前为选中，则selectedList将清空
            this.setState({selectedList:[]}) ;
        }else{
            let selectedArr = data.filter(record => !supportSelectDisableFn(record));
            this.setState({selectedList:selectedArr}) ;
        }
    }

    renderAllTrs(){
        let {data} = this.props ;
        return data.map((record,rowIndex)=>{
            return this.renderTrItem(record,rowIndex) ;
        }) ;
    }
    renderTrItem(record,rowIndex){
        let {columns,rowKeyFn,onRowClick,supportSelectAllFlag,supportSelectDisableFn} = this.props ;
        let selectedList = this.state.selectedList ;
        return (<TableRow  record = {record}  
                    selectedList = {selectedList}
                    columns ={columns}  
                    rowIndex = {rowIndex}
                    onRowClick = {onRowClick}
                    onDestroy = {this.removeSelectedItem}
                    supportSelectAllFlag = {supportSelectAllFlag}   
                    supportSelectDisableFn = {supportSelectDisableFn} 
                    handleSelectSingleCheckboxItem = {this.handleSelectSingleCheckboxItem}
                    key ={this.getKeyByRowKeyFn(record,rowKeyFn,rowIndex)}/>
        ) ;
    }
    //key一定要唯一能确定一条记录，并且必须由外部指定，不能直接使用rowIndex
    getKeyByRowKeyFn(record,rowKeyFn,rowIndex){
        if(rowKeyFn && typeof rowKeyFn === 'function'){
            return rowKeyFn(record,rowIndex) ;
        }
        return record.key ;
    }


    getTableStyle(){
        let {width} = this.props ;
        let tableObj = {} ;
        if(width && width > 0){
           tableObj.width = width +"px" ; 
        }
        return tableObj ;
    }


    getAllSelectedFlag(){
        let {data,supportSelectDisableFn} = this.props ;
        let selectedList = this.state.selectedList ;
        //let selectedAllFlag = data.length > 0 && (data.length === selectedList.length) ;
        if(data.length> 0 && selectedList.length > 0){
             let selectedAllFlag = true ;
             let canSelectArr = data.filter(record => !supportSelectDisableFn(record)) ;
             return selectedList.length === canSelectArr.length ;
        }
        return false;
    }

    render() {
        let {columns,data,getBodyWrapper,supportSelectAllFlag,supportSelectDisableFn,supportSelectAllWidth} = this.props ;
        let selectedAllFlag = this.getAllSelectedFlag() ;
        const tableBody = getBodyWrapper(
            <tbody>
                {this.renderAllTrs()}
            </tbody>
        ) ;
        return (
            <div style={this.getTableStyle()}>
                <table className="table table-bordered" >
                    <TableHeader columns ={columns} 
                        supportSelectAllFlag={supportSelectAllFlag} 
                        supportSelectAllWidth = {supportSelectAllWidth}
                        selectedAllFlag={selectedAllFlag}
                        handleSelectAllCheckbox = {this.handleSelectAllCheckbox}/>
                    {tableBody}
                </table>
                {this.props.children}
            </div>
        );
    }
} ;

module.exports = Table ;
