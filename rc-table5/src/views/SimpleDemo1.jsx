import React,{Component} from 'react' ;
import Table from '../components/table/Table.jsx' ;

const columns = [
    { 
      title: '用户名', dataItemKey: 'username', width: 100,
      render:'showUserNameColumnFnName',//用户可能需要显示高亮一点
    },
    { title: '专业', dataItemKey: 'dept',  width: 100 },
    { title: '主页', dataItemKey: 'homepage',width: 200,
       dataItemColumnRender:'showMyHomePageFnName'//主页可能需要显示成超链接
    },
    { title: '操作', dataItemKey: '',  width:300 },//dateKey为空，标识为操作列
];
const data = [
    { username: '张三',dept:"软件工程",homepage:'wwww.baidu.com' ,key:'001'}, //key 为本条记录的一个唯一主键
    { username: '李四',dept:"英语",homepage:'www.jd.com' ,key:'002' }
];

function rowKeyFunc(record,index){

}

export default () => (
    <Table data ={data} 
        columns={columns} 
        width= {700} 
        supportSelectAllWidth={100}
        supportSelectAllFlag
        rowKeyFn={rowKeyFunc}/>
) ;