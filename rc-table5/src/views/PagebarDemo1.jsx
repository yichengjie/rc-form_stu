import React,{Component} from 'react' ;
import Table from '../components/table/Table.jsx' ;
import Pagebar from '../components/pagebar/Pagebar.jsx' ;

const columns = [
    { title: 'username', dataIndex: 'username', key: 'a', width: 100},
    { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
    { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
];
const data = [
    { username: '123' ,key:'001'}, 
    { username: 'cdd', b: 'edd',key:'002' }, 
    { username: '1333', b: 'eee', c: 2 ,key:'003'}
];

class PagebarDemo1 extends Component{
    constructor(props){
        super(props) ;
        this.state = {
            pageBean:{
                curPage:5,//当前是第几页
                pageSize:10,//每页显示的记录数
                recordCount:0,//总记录数
                startPageNum:5,//第一页
                endPageNum:10,//最有一页
                pageCount:50, // 总页码数
                prePageNum:0,//上一页页码数
                nextPageNum:0,//下一页页码数
            },
            loading:false
        } ;
    }
    
    handleToPageNumFn = (toPageNum) => {
        let pageBean = this.state.pageBean ;
        let newPageBean = {...pageBean,curPage:toPageNum} ;
        this.setState({loading:true}) ;
        //这里去做查询相关的业务，数据返回后更新pageBean
        setTimeout(()=>{
             this.setState({pageBean:newPageBean,loading:false}) ;
        },1000) ;
    } 

    render () {
        return (
            <div>
               <Table data ={data} 
                   columns={columns} 
                   width= {700} 
                   supportSelectAllWidth={100}
                   supportSelectAllFlag> 
                   <Pagebar pageBean = {this.state.pageBean}  
                     handleToPageNumFn={this.handleToPageNumFn}
                     loading={this.state.loading}/>
                </Table>
            </div>
        )
    }

} 

export default PagebarDemo1 ;