import {getEmptySimpleObj} from '../../common/common.js' ;
const profix = 'basefrom_formError_' ;
const SET_FIELD_ERROR = profix + 'SET_FIELD_ERROR' ;
const RESET_FORM_ERROR = profix + 'RESET_FORM_ERROR' ;
//////////////////////action start/////////////////////////////
export function setFieldError(fieldName,fieldError) {
  return { type: SET_FIELD_ERROR, fieldName,fieldError }
}
export function resetFormError(){
  return {type:RESET_FORM_ERROR} ;
}
//////////////////////action end/////////////////////////////
//////////////////////reducer start/////////////////////////////
function formError(state = {}, action) {
  switch (action.type) {
    case SET_FIELD_ERROR:
      return {...state,...{[action.fieldName]:action.fieldError}} ;
    case RESET_FORM_ERROR:
      return getEmptySimpleObj(state) ;
    default:
      return state
  }
}
//////////////////////reducer end/////////////////////////////
export default formError ;