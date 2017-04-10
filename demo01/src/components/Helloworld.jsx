import React,{Component} from 'react'

class Helloworld extends Component{
    constructor(){
        super() ;
        this.handleClick = this.handleClick.bind(this) ;
        this.state = {
            name:''
        } ;
    }

    handleClick(){
        this.setState({name:'yicj'}) ;
    }

    render() {
        console.info('render method is exex ...') ;
        return (
            <div>
                <p>{this.state.name}</p>
                <button onClick={this.handleClick}>test</button>               
            </div>
        );
    }

}

export default Helloworld