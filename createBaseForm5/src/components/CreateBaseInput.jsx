function createBaseInput(WrapperComponent){
    class OCBaseInput extends WrapperComponent{
        shouldComponentUpdate (nextProps, nextState) {
            let oldValue = this.props.value ;
            let newValue = nextProps.value ;
            if(oldValue === newValue){
                return false ;
            }
            return true;
        }
    }
    return OCBaseInput ;
}

export default createBaseInput ;