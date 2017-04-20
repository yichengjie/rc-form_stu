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
        let showText = record[fieldName] ;
        if(fieldName && fieldName.length > 0){
             return <td>{showText}</td> ;
        }else{
            return <td>{column.render(record,rowIndex)}</td> ;
        }
    }
    render() {
        let {record,column,rowIndex} = this.props ;
        return this.renderTdItem(record,column,rowIndex) ;
    }
}

module.exports =  TableCell ;