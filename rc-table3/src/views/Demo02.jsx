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
    constructor(props){
        super(props) ;
        console.info('LiComp ..constructor() ...') ;
    }
     componentWillUnmount() {
        console.info('--------- start ------------') ;  
        const { record, index } = this.props;
        console.info('index : ' ,index) ;
        console.info('record : ' , JSON.stringify(record,null,2)) ;
        console.info('--------- end ------------') ;  
    }
    handleClick = e => {
        let {record,index,removeItemFn} = this.props ;        
        console.info(`click item  idnex : ${index} ,record : ` , record) ;
        removeItemFn(record) ;
    }
    render (){
        let {index,record} = this.props ;
        return (
            <li style={liStyleObj} onClick ={this.handleClick}>name:{record.name} , addr : {record.addr}  --- 点击删除</li>
        ) ;
    }
}

class UlComp extends Component {
    render(){
        let {list,removeItemFn} = this.props ;
        return (
            <ul>
                {
                    list.map((record,index)=>{
                        return  (
                            <LiComp key ={index} 
                                    index ={index} 
                                    record ={record} 
                                    removeItemFn = {removeItemFn}/>
                        ) ;
                    }) 
                }
            </ul>
        ) ;
    }

}


class Demo02 extends Component{
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
    render () {
        return (
            <div>
                <UlComp list ={this.state.list} removeItemFn = {this.removeItemFn}/>
                <button className ="btn" onClick ={this.showData}>test</button>
            </div>
        ) ;
    }
}



export default Demo02 ;