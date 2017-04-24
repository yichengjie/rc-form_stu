import React,{Component} from 'react' ;
import Table from '../components/table/Table.jsx' ;

class MyTable extends Component{

    constructor(props){
        super(props) ;
        this.state = {
            data:this.props.data ,
        } ;
    }

    handleDeleteClick(index){
        return (event) => {
            event.stopPropagation() ;
            event.preventDefault() ;
            this.removeItem(index) ;
        }
    }

    renderAction = (record,index) =>{
        if(record.username !== 'cdd'){
            return <a href="#" onClick ={this.handleDeleteClick(index)} >删除</a>;
        }
        return null ;
    }

    removeItem(index){
        console.info('index : ' ,index ) ;
        let rows = [...this.state.data] ;
        rows.splice(index,1) ;
        this.setState({data:rows}) ;
    }

    renderTitle1 = (record, index) => {
        let username = record.username ;
        return <a href="#">{username}</a>
    }

    onRowClick (record,index) {
        return e => {
            e.preventDefault() ;
            console.info('method onRowClick ...' ,record) ;
        }
    }
    onRowDoubleClick(record,index){
        console.info('method onRowDoubleClick ...') ;
    }

    handleBatchDelete = e => {
       let myTable =  this.refs.myTable ;
       let selectedList = myTable.getSelectedList() ;
       let data = this.state.data ;
       if(selectedList.length > 0 && data.length > 0){
            let newList = data.filter(item =>{
                return !selectedList.includes(item) ;
            }) ;
            this.setState({
                data:newList
            }) ;
           // myTable.clearSelectedList() ;
       }
    }

    handleTest = e => {
       let myTable =  this.refs.myTable ;
       let selectedList = myTable.getSelectedList() ;
       console.info('selectedList :  ' , JSON.stringify(selectedList,null,2) ) ;
    }

    render(){
        const columns = [
            { title: 'username', dataIndex: 'username', key: 'a', width: 100, render: this.renderTitle1 },
            { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
            { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
            { title: '操作', dataIndex: '', key: 'x', width:300, render: this.renderAction },
        ];
        return (
            <div>
                <Table data = {this.state.data} 
                    ref = "myTable"
                    columns ={columns} 
                    rowKeyFn ={record => record.username}
                    onRowClick={this.onRowClick}
                    supportSelectDisableFn={record=> record.username === '1333'}
                    supportSelectAllFlag = {true} /**  是否支持全选**/
                    supportSelectAllWidth="150" /**选中列占宽 */
                    width = {800}
                />
                <button className="btn btn-danger" onClick ={this.handleBatchDelete}>批量删除</button>
                {'  '}
                <button className="btn btn-default" onClick ={this.handleTest}>查看选中数据</button>
            </div>
            
        ) ;
    }
}

const data = [{ username: '123' }, { username: 'cdd', b: 'edd' }, { username: '1333', b: 'eee', c: 2 }];

export default () => <MyTable data ={data} /> ;