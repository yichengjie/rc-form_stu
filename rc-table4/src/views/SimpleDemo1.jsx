import React,{Component} from 'react' ;
import Table from '../components/table/Table.jsx' ;

const columns = [
        { title: 'username', dataIndex: 'username', key: 'a', width: 100},
        { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
        { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
        { title: '操作', dataIndex: '', key: 'x', width:300 },
    ];
const data = [{ username: '123' ,key:'001'}, { username: 'cdd', b: 'edd',key:'002' }, { username: '1333', b: 'eee', c: 2 ,key:'003'}];


export default () => (
    <Table data ={data} 
        columns={columns} 
        width= {700} 
        supportSelectAllWidth={100}
        supportSelectAllFlag/>
) ;