import React,{Component} from 'react' ;

let initList = [
    {name:'zhang-3',addr:'henan'},
    {name:'li-4',addr:'beijing'},
    {name:'wang-4',addr:'beijing'},
    {name:'zhao-6',addr:'tianjin'},
] ;


let liStyleObj = {
    cursor:'pointer',
    height:'25px',
    borderBottom:'1px solid black',
    listStyle:'none'
} ;

class LiComp extends Component {
    componentWillUnmount() {
        console.info('--------- componentWillUnmount start ------------') ;  
        const { record, index } = this.props;
        console.info('index : ' ,index) ;
        console.info('record : ' , JSON.stringify(record,null,2)) ;
        console.info('--------- componentWillUnmount end ------------') ;  
    }
    handleDeleteItemClick = e => {
        console.info('--------- handleDeleteItemClick start ------------') ;  
        let {record,index,removeItemFn} = this.props ;    
        console.info('index : ' ,index) ;    
        console.info('record : ' , JSON.stringify(record,null,2)) ;
        removeItemFn(record) ;
        console.info('--------- handleDeleteItemClick end ------------') ;  
    }
    render (){
        let {index,record} = this.props ;
        return (
            <li style={liStyleObj} onClick ={this.handleDeleteItemClick}>
             name:{record.name} , addr : {record.addr}  --- 点击删除</li>
        ) ;
    }
}

class Demo03 extends Component{
    constructor(props){
        super(props) ;
        this.state = {
          list:initList
        } ;
    }
    removeItemFn = (record) => {
       let newList = this.state.list.filter(item=> item !== record ) ;
       this.setState({list:newList}) ;
    }
    showData = ()=>{
        console.info(JSON.stringify(this.state.list,null,2) ) ;
    }
    renderAllLi(){
       return this.state.list.map((record,index)=>{
           return (<LiComp key ={record.name} index ={index} record ={record} 
                    removeItemFn = {this.removeItemFn}  />) ;
       }) ;
    }
    render () {
        return (
            <div>
                <ul>
                    {this.renderAllLi()}
                </ul>
                <button className ="btn" onClick ={this.showData}>test</button>
            </div>
        ) ;
    }
}
export default Demo03 ;