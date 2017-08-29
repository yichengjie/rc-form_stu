let React = require('react') ;
let PropTypes = require('prop-types') ;
let Component = React.Component ;

class TableHeader extends Component{
    static propTypes = {
         columns: PropTypes.array,
         supportSelectAllFlag:PropTypes.bool,
         supportSelectAllWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
         handleSelectAllCheckbox:PropTypes.func,
    }
    renderAllThs(columns,supportSelectAllFlag,selectedAllFlag){
        let arr = columns.map((item,columnIndex) => {
            return  this.renderThItem(item,columnIndex);
        }) ;
        if(supportSelectAllFlag){
            arr.splice(0,0,this.getSelectAllComp(columns.length,selectedAllFlag)) ;
        }
        return arr ;
    }


    getSelectAllComp(columnCount,selectedAllFlag){
        let {supportSelectAllWidth} = this.props ;
        //console.info(`supportSelectAllWidth : ${supportSelectAllWidth}`) ;
        return (<th width= {supportSelectAllWidth} key = {columnCount} >
                    <label className="checkbox-inline" >
                        <input type="checkbox"  
                            onClick={this.props.handleSelectAllCheckbox}
                            checked={selectedAllFlag} /> 全选
                    </label>
               </th>
        ) ;
    }

    renderThItem(item,columnIndex){
        let {title,key,width} = item ;
        return (
             <th width={width} key={key || columnIndex}>{title}</th>
        ) ;
    }
    render(){
        let {columns,supportSelectAllFlag,selectedAllFlag} = this.props ;
        return (
            <thead>
                <tr>
                    {this.renderAllThs(columns,supportSelectAllFlag,selectedAllFlag)}
                </tr>
            </thead>
        ) ;
    }
}


module.exports = TableHeader ;