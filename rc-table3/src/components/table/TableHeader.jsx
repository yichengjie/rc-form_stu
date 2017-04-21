let React = require('react') ;
let PropTypes = require('prop-types') ;
let Component = React.Component ;

class TableHeader extends Component{
    static propTypes = {
         columns: PropTypes.array,
    }
    renderAllThs(columns){
        return columns.map((item,columnIndex) => {
            return  this.renderThItem(item,columnIndex);
        }) ;
    }
    renderThItem(item,columnIndex){
        let {title,key} = item ;
        key = columnIndex + '' + key ;
        return (
             <th key={key}>{title}</th>
        ) ;
    }
    render(){
        let columns = this.props.columns ;
        return (
            <thead>
                <tr>
                    {this.renderAllThs(columns)}
                </tr>
            </thead>
        ) ;
    }
}


module.exports = TableHeader ;