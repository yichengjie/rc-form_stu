import React,{Component} from 'react' ;

let initList = [
    {name:'yicj',addr:'henan'},
    {name:'zhangsan',addr:'beijing'},
    {name:'lisi',addr:'beijing'},
    {name:'zhaoliu',addr:'tianjin'},
] ;

class LiComp extends Component {
    componentWillUnmount() {
        console.info('lifecycle func componentWillUnmount() start .....') ;  
        const { record, index } = this.props;
        console.info('index : ' ,index) ;
        console.info('record : ' , JSON.stringify(record,null,2)) ;
        console.info('lifecycle func componentWillUnmount() end .....') ;  

    }
    handleClick = e => {
        let {record,index,removeItemFn} = this.props ;        
        //console.info(`click item  idnex : ${index} ,record : ` , record) ;
        removeItemFn(record) ;
    }
    render (){
        let {index,record} = this.props ;
        return (
            <li onClick ={this.handleClick}>name:{record.name} , addr : {record.addr}</li>
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
    render () {
        return <UlComp list ={this.state.list} removeItemFn = {this.removeItemFn}/>
    }
}

export default Demo02 ;