import {isArray,isArrayNotEmpty,isStrNotEmpty} from './common.js' ;
export let validationFn = {
    required:function(value){
        if(value != null){
            if(isArray(value)){
               return isArrayNotEmpty(value) ;
            }else{
               return isStrNotEmpty(value) ;
            }
        }
        return false;
    },
    email:function(value){
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(value && !(myreg.test(value))){
            return false;      
        }
        return true;
    },
    minLength:function(value,min){
       let numMin = parseInt(min,10) ;
       if(value && value.trim().length >= numMin){
          return true ;
       }
       return  false ;     
    },
    date:function(value){
        return isLegalDate(value) ;
    },
    integer:function(value){
        if(value && value.length>0){
            return /^-?\d+$/.test(value);
        }
        return true ;
    }
} ;
export let validationMessages ={
    required:function(fieldName){
        return '必填字段' ;
    },
    email:function(fieldName){
        return '邮箱不合法' ;
    },
    minLength:function(fieldName,min){
        return `不能小于${min}个字符` ;
    },
    date:function(fieldName){
        return '日期格式不合法' ;
    },
    integer:function(fieldName){
        return '输入整数' ;
    }
} ;

//判断日期是否合法
function  isLegalDate(datavalue,noTimeLimit){
    var date = datavalue;
    if( !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date)){
        return false;
    }
    var result = true;
    var curYear = (new Date().getFullYear() - 0);
    var ymd = date.split(/-/);
    var year = ymd[0] - 0;
    var month = ymd[1] - 0;
    var day = ymd[2] - 0;
    /* month-day relation, January begins from index 1 */
    var mdr = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var isLeapYear = function(){
        // 判断年份是否是闰年
        return (year % 400 === 0) || ((year % 4 === 0) && (year % 100 !== 0));
    };
    if(!noTimeLimit&&(year < curYear - 20 || year > curYear + 20)){
    // 年份超过前后20年，则校验失败
    result = false;
    }
    if(month > 12 || month < 1){
    // 如果月份不合法，则校验失败
    result = false;
    }
    if(mdr[month] < day || day < 1 || day > 31){
    // 日期天数不合法，校验失败
    result = false;
    }
    if(month === 2 && !isLeapYear() && day > 28){
    // 年份不是闰年，日期天数不合法，校验失败
    result = false;
    }
    return result;
}

// export default {
//   validationFn ,
//   validationMessages 
// } ;