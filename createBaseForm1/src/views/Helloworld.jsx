import React,{Component} from 'react'

class Helloworld extends Component{
    constructor(){
        super() ;
        this.handleClick = this.handleClick.bind(this) ;
        this.state = {
            name:''
        } ;
    }

    handleClick(event){
        event.preventDefault() ;
        this.setState({name:'yicj'}) ;
        let name = this.state.name ;
        console.info(`name : ${name}`) ;
    }

    handleClick2 = (event) => {
        event.preventDefault() ;
        this.setState(function(prevState){
            return Object.assign(prevState,{name:'yicj'}) ;
        }) ;
        this.forceUpdate() ;
        let name = this.state.name ;
        console.info(`name : ${name}`) ;
    }

    render() {
        console.info('render method is exex ...') ;
        return (
            <div>
                <p>{this.state.name}</p>
                <button onClick={this.handleClick}>test</button> <br/>
                <button onClick={this.handleClick2}>test2</button>                  
            </div>
        );
    }

}

export default Helloworld