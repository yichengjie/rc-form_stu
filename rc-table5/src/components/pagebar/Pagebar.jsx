let React = require('react') ;
let PropTypes = require('prop-types') ;
let Component = React.Component ;
const defaultPageSize = 10 ;

class Pagebar extends Component {

    static propTypes = {
        pageBean:PropTypes.object,
        handleToPageNumFn:PropTypes.func,
        loading:PropTypes.bool
    }

    static defaultProps = {
        pageBean:{
           curPage:1,//当前是第几页
           pageSize:defaultPageSize,//每页显示的记录数
           recordCount:0,//总记录数
           starPageNum:0,//第一页
           endPageNum:0,//最有一页
           pageCount:0, // 总页码数
           prePageNum:0,//上一页页码数
           nextPageNum:0,//下一页页码数
        },
        handleToPageNumFn:(toPageNum)=>{},
    }

    preventDefaultEventAction(e){
        e.preventDefault() ;
        e.stopPropagation() ;
    }

    renderLoading(){
        return <div className="no-data">
            <img src="http://gtms04.alicdn.com/tps/i4/T1hPyYFD0kXXa679Pe-40-40.gif" width="20" />
        </div>
    }

    __handleToPageNumFn(toPageNum){
        this.props.handleToPageNumFn(toPageNum) ;
    }

    handleToPageNumClickFactory(toPageNum){
        return e => {
            this.preventDefaultEventAction(e) ;
            this.__handleToPageNumFn(toPageNum) ;
        }
    }

    handleToPreviousPageClick = e =>{
        this.preventDefaultEventAction(e) ;
        let {curPage} = this.props.pageBean ;
        if(curPage > 1){
            let toPageNum = curPage - 1 ;
            this.__handleToPageNumFn(toPageNum) ;
        }
    }

    handleToNextPageClick = e => {
        this.preventDefaultEventAction(e) ;
        let {curPage,pageCount} = this.props.pageBean ;
        //console.info(`curPage : ${this.state.curPage} , pageCount : ${this.state.pageCount}`) ;
        if(curPage < pageCount){
            let toPageNum = curPage + 1 ;
            this.__handleToPageNumFn(toPageNum) ;
        }
    }


    renderPageNumList(){
        let {curPage,startPageNum,endPageNum} = this.props.pageBean ;
        let retArr = [] ;
        if(startPageNum > 0 && endPageNum > 0 && endPageNum >= startPageNum){
            for(let item = startPageNum ; item <= endPageNum ; item ++ ){
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
        let {pageCount,recordCount} = this.props.pageBean ;
        let {loading} = this.props ;
        if(loading){
            return this.renderLoading() ;
        }
        return (
            <nav aria-label="Page navigation" className ="pagebar-container">
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
                    <li><div className="pagebar-tip-info">共{pageCount}页,{recordCount}条记录</div></li>
                </ul>
            </nav>
        )
    }
}

module.exports = Pagebar ;