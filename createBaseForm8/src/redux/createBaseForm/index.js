import { combineReducers } from 'redux' ;
import formData from './formData.js' ;
import formSchema from './formSchema.js' ;
import formError from './formError.js' ;
import formHide from './formHide.js' ; 


export default combineReducers({
  formData,
  formSchema,
  formError,
  formHide
}) ;



