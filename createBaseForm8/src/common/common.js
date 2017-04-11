/**从后台formSchema定义中获取到formData的结构 */
export function getFormDataFromSchema(schemaFields){
    let obj = {} ;
    schemaFields.forEach(field=>{
        //console.info('field : ' + JSON.stringify(field)) ;
        let name = field['name'] ;
        obj[name] = '' ;
    }) ;
    return obj ;
}


function _replacer(key,value){
    if(typeof value === 'function' ){
        return `function ${value.name} () {...}` ;
    }
    return value ;
}

export function stringify(obj){
    return JSON.stringify(obj,_replacer,2) ;
}

/**
 * 只有一个value时模拟生成一个类event提供给onChange函数使用
 */
export function genSimulationEventByValue(value){
    value = value+ '' ;
    return {target:{value}} ;
}


export function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
export function isString(obj){
    return Object.prototype.toString.call(obj) === '[object String]' ;
}

export function isArrayNotEmpty(arr){
    if(arr == null || arr.length == 0){
        return false ;
    }
    return true;
}
export function isStrNotEmpty(str){
    if(str == null || (str+ '').trim().length == 0 ){
        return false ;
    }
    return true;
}


export function dealPromise4Callback(promise,callback){
    promise.then(function(retData){
        callback(retData) ;
    },function(err){
        console.error('查询后台出错！') ;
    }) ;
}


/**
 * 清空表单内容
 */
export function getEmptySimpleObj(obj){
    let newObj = {} ;
    if(obj!=null){
        let keys = Object.keys(obj) ;
        keys.forEach(key=>{
            newObj[key] = getDefaultValue(obj[key]) ;
        }) ;
    }
    return newObj ;
}
function getDefaultValue(value){
    if(value == null){
        return null ;
    }else{
        let str = Object.prototype.toString.call(value) ;
        return defaultValueMap[str]  ;
    }
}

let defaultValueMap ={
    '[object String]':'',
    '[object Array]':[],
    '[object Number]':'',
    '[object Boolean]':'',
    '[object Date]':''
} ;