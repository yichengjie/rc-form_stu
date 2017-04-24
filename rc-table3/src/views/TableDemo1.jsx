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
         return <a href="#" onClick ={this.handleDeleteClick(index)} >Delete</a>;
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
       console.info('selectedList :  ' , selectedList) ;
    }

    render(){
        const columns = [
            { title: 'username', dataIndex: 'username', key: 'a', width: 100, render: this.renderTitle1 },
            { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
            { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
            { title: 'Operations', dataIndex: '', key: 'x', render: this.renderAction },
        ];
        return (
            <div>
                <Table data = {this.state.data} 
                    ref = "myTable"
                    columns ={columns} 
                    rowKeyFn ={record => record.username}
                    onRowClick={this.onRowClick}
                    supportSelectAllFlag = {true} /**  是否支持全选**/
                />
                <button className="btn btn-danger" onClick ={this.handleBatchDelete}>批量删除</button>
                <button className="btn btn-danger" onClick ={this.handleTest}>test</button>
            </div>
            
        ) ;
    }
}

const data = [{ username: '123' }, { username: 'cdd', b: 'edd' }, { username: '1333', b: 'eee', c: 2 }];

export default () => <MyTable data ={data} /> ;