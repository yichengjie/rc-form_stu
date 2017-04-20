import React,{Component,PropTypes} from 'react' ;

class TableHeader extends Component{

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

export default TableHeader ;