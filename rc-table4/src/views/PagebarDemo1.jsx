import React,{Component} from 'react' ;
import Table from '../components/table/Table.jsx' ;
import Pagebar from '../components/pagebar/Pagebar.jsx' ;

const columns = [
        { title: 'username', dataIndex: 'username', key: 'a', width: 100},
        { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
        { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
    ];
const data = [{ username: '123' ,key:'001'}, { username: 'cdd', b: 'edd',key:'002' }, { username: '1333', b: 'eee', c: 2 ,key:'003'}];

class PagebarDemo1 extends Component{

    render () {
        return (
            <div>
               <Table data ={data} 
                   columns={columns} 
                   width= {700} 
                   supportSelectAllWidth={100}
                   supportSelectAllFlag> 
                   <Pagebar test ="hello" />
                </Table>
            </div>
        )
    }

} 

export default PagebarDemo1 ;