const profix = 'basefrom_formSchema_' ;
const INIT_FORM_SCHEMA = profix +'INIT_FORM_SCHEMA' ;
//////////////////////action start/////////////////////////////
export function initFormSchema(formSchema) {
  return { type: INIT_FORM_SCHEMA, formSchema }
}
//////////////////////action end/////////////////////////////
//////////////////////reducer start/////////////////////////////
function formSchema(state = [], action) {
  switch (action.type) {
    case INIT_FORM_SCHEMA:
      return [...action.formSchema] ;
    default:
      return state
  }
}
//////////////////////reducer end/////////////////////////////
export default formSchema ;