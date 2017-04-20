import React,{Component} from 'react' ;
import Table from '../table/Table.jsx' ;

class MyTable extends Component{

    constructor(props){
        super(props) ;
        this.state = {
            data:this.props.data 
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

    render(){
        const columns = [
            { title: 'title1', dataIndex: 'a', key: 'a', width: 100, render: this.checkbox },
            { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
            { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
            { title: 'Operations', dataIndex: '', key: 'x', render: this.renderAction },
        ];
        return (
            <Table data = {this.state.data} 
                columns ={columns} 
                rowKeyFn ={record => record.a}/>
        ) ;
    }
}

const data = [{ a: '123' }, { a: 'cdd', b: 'edd' }, { a: '1333', c: 'eee', d: 2 }];

export default () => <MyTable data ={data} /> ;