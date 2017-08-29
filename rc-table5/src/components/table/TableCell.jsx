let React = require('react') ;
let PropTypes = require('prop-types') ;
let Component = React.Component ;
//【表格行】中的【单元格】
class TableCell extends Component{
    static propTypes = {
         record:PropTypes.object,
         column:PropTypes.object,
         rowIndex: PropTypes.number,
    }
    renderTdItem(record,column,rowIndex){
        let fieldName = column.dataIndex ;
        let render = column.render ;
        let showText = record[fieldName] ;
        //console.info(`rowIndex : ${rowIndex} , record.username : ${record.username}` , render) ;
        if(render && typeof render === 'function'){
           return <td>{render(record,rowIndex)}</td>  ; 
        }else{
             return <td>{showText}</td> ;
        }
    }
    render() {
        let {record,column,rowIndex} = this.props ;
        return this.renderTdItem(record,column,rowIndex) ;
    }
}

module.exports =  TableCell ;