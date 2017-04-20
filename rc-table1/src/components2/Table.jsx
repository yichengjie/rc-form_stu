import React,{Component} from 'react' ;

class Theader extends Component{
    renderAllThs(columns){
        return columns.map((item,columnIndex) => {
            return  this.renderThItem(item,columnIndex);
        }) ;
    }
    renderThItem(item,columnIndex){
        let {title,key} = item ;
        key = columnIndex + '' + key ;
        return (
             <th key={key}>{title}</th>
        ) ;
    }
    render(){
        let columns = this.props.columns ;
        return (
            <thead>
                <tr>
                    {this.renderAllThs(columns)}
                </tr>
            </thead>
        ) ;
    }
}


class TrItem extends Component{
    renderAllTds(record,columns,rowIndex){
        return columns.map( (column,columnIndex) => {
            return this.renderTdItem(record,column,rowIndex,columnIndex) ;
        }) ;
    }
    renderTdItem(record,column,rowIndex,columnIndex){
        let fieldName = column.dataIndex ;
        let showText = record[fieldName] ;
        if(fieldName && fieldName.length > 0){
             return <td key ={columnIndex}>{showText}</td> ;
        }else{
            return <td key ={columnIndex}>{column.render(record,rowIndex)}</td> ;
        }
    }
    render(){
        let {record,columns,rowIndex} = this.props ;
        return (
            <tr>
                {this.renderAllTds(record,columns,rowIndex)}
            </tr>
        ) ;
    }
}

class Table extends Component {
    renderAllTrs(data,columns,rowKeyFn){
        return data.map((record,rowIndex)=>{
            return this.renderTrItem(record,columns,rowIndex,rowKeyFn) ;
        }) ;
    }
    renderTrItem(record,columns ,rowIndex ,rowKeyFn){
        return (<TrItem  record = {record}  
                    columns ={columns}  
                    rowIndex = {rowIndex}
                    key ={this.getKeyByRowKeyFn(record,rowIndex,rowKeyFn)}/>) ;
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
                <Theader columns ={columns} />
                <tbody>
                    {this.renderAllTrs(data,columns,rowKeyFn)}
                </tbody>
            </table>
        );
    }
} ;


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