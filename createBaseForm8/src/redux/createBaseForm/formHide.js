import {getEmptySimpleObj} from '../../common/common.js' ;
const profix = 'basefrom_formHide_' ;
const SET_FIELD_HIDE = profix+'SET_FIELD_HIDE' ;
const RESET_FORM_HIDE = profix+'RESET_FORM_HIDE' ;
//////////////////////action start/////////////////////////////
export function setFieldHide(fieldName,hideFlag) {
  return { type: SET_FIELD_HIDE, fieldName,hideFlag}
}
export function resetFormHide(){
  return {type:RESET_FORM_HIDE} ;
}
//////////////////////action end/////////////////////////////
//////////////////////reducer start/////////////////////////////
function formHide(state = {}, action) {
  switch (action.type) {
    case SET_FIELD_HIDE:
      return {...state,...{[action.fieldName]:action.hideFlag}} ;
    case RESET_FORM_HIDE:
      return getEmptySimpleObj(state) ;
    default:
      return state
  }
}
//////////////////////reducer end/////////////////////////////
export default formHide ;