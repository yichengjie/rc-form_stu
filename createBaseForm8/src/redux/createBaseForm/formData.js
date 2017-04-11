import {getEmptySimpleObj} from '../../common/common.js' ;
const profix = 'basefrom_formData_' ;
const SET_FIELD_VALUE = profix+'SET_FIELD_VALUE' ;
const INIT_FORM_DATA = profix + 'INIT_FORM_DATA' ;
const RESET_FORM_DATA = profix + 'RESET_FORM_DATA' ; 
//////////////////////action start/////////////////////////////
export function setFieldValue(fieldName,fieldValue) {
  return { type: SET_FIELD_VALUE, fieldName,fieldValue }
}
export function initFormData(formData){
  return {type:INIT_FORM_DATA,formData} ;
}
export function resetFormData(){
  return {type:RESET_FORM_DATA} ;
}
//////////////////////action end/////////////////////////////
//////////////////////reducer start/////////////////////////////
function formData(state = {}, action) {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {...state,...{[action.fieldName]:action.fieldValue}} ;
    case INIT_FORM_DATA:
      return {...state,...action.formData} ;
    case RESET_FORM_DATA:
      return getEmptySimpleObj(state) ;
    default:
      return state
  }
}
//////////////////////reducer end/////////////////////////////

export default formData ;