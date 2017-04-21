import React,{Component} from 'react' ;
import Table from '../components/table/Table.jsx' ;

class MyTable extends Component{

    constructor(props){
        super(props) ;
        this.state = {
            data:this.props.data ,
            usernameArr:[]
        } ;
    }

    handleDeleteClick(index){
        return (event) => {
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

    selectSigleItem = (e) => {
        e.stopPropagation() ;

    }

    renderTitle1 = (record, index) => {
        let username = record.username ;
        let retComp = (
            <label className="checkbox-inline">
                <input type="checkbox"  value="option1" onClick={this.selectSigleItem}  /> {username}
            </label>
        ) ;
        return retComp
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

    render(){
        const columns = [
            { title: 'title1', dataIndex: 'username', key: 'a', width: 100, render: this.renderTitle1 },
            { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
            { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
            { title: 'Operations', dataIndex: '', key: 'x', render: this.renderAction },
        ];
        return (
            <Table data = {this.state.data} 
                columns ={columns} 
                rowKeyFn ={record => record.a}
                onRowClick={this.onRowClick}
            />
        ) ;
    }
}

const data = [{ username: '123' }, { username: 'cdd', b: 'edd' }, { username: '1333', c: 'eee', d: 2 }];

export default () => <MyTable data ={data} /> ;