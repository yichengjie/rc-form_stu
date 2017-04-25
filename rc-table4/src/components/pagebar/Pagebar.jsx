let React = require('react') ;
let Component = React.Component ;

class Pagebar extends Component {

    constructor(props){
        super(props) ;
        this.state = {
           curPage:5,//当前是第几页
           pageSize:10,//每页显示的记录数
           recordCount:0,//总记录数
           starPageNum:5,//第一页
           endPageNum:10,//最有一页
           pageCount:50, // 总页码数
           prePageNum:0,//上一页页码数
           nextPageNum:0,//下一页页码数
        } ; 
    }

    preventDefaultEventAction(e){
        e.preventDefault() ;
        e.stopPropagation() ;
    }

    handleToPageNumClickFactory(toPageNum){
        return e => {
            this.preventDefaultEventAction(e) ;
            this.setState({curPage:toPageNum}) ;
        }
    }

    handleToPreviousPageClick = e =>{
        this.preventDefaultEventAction(e) ;
        if(this.state.curPage > 1){
            this.setState({curPage:this.state.curPage-1}) ;
        }
    }

    handleToNextPageClick = e => {
        this.preventDefaultEventAction(e) ;
        //console.info(`curPage : ${this.state.curPage} , pageCount : ${this.state.pageCount}`) ;
        if(this.state.curPage < this.state.pageCount){
            this.setState({curPage:this.state.curPage+1}) ;
        }
    }


    renderPageNumList(){
        let {curPage,starPageNum,endPageNum} = this.state ;
        let retArr = [] ;
        if(starPageNum > 0 && endPageNum > 0 && endPageNum >= starPageNum){
            for(let item = starPageNum ; item <= endPageNum ; item ++ ){
                let comp = (<li className={(item === curPage) ? 'active' : ''} 
                                key ={item} 
                                onClick ={this.handleToPageNumClickFactory(item)}>
                                <a href="#">{item}</a>
                            </li>) ;
                retArr.push(comp) ;
            }
        }
        return retArr ;
    }

    render () {

        console.info('test : ' , this.props.test) ;

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li onClick ={this.handleToPreviousPageClick}>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {this.renderPageNumList()}
                    <li onClick ={this.handleToNextPageClick}>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    <li><div className="pagebar-tip-info">共50页</div></li>
                </ul>
            </nav>
        )
    }
}

module.exports = Pagebar ;