/**从后台formSchema定义中获取到formData的结构 */
export function isComplexFieldSchema(fieldSchema){
    if(fieldSchema.type === 'complex'){
        return true ;
    }
    return false ; 
}


export function getFieldObjByFieldSchema(fieldSchema){
    let isComplexSchemaFlag = isComplexFieldSchema(fieldSchema) ;
    let {name,defaultValue,fields} = fieldSchema ;
    if(isComplexSchemaFlag){
        let obj = {} ;
        for(let field of fields){
            obj[field['name']] = field['defaultValue'] ; 
        }
        return obj ;
    }else{
        return {[name]:defaultValue} ;
    }
}

export function shallowCopyObj(shallowObj){//浅复制对象
    let retObj = {} ;
    if(shallowObj != null && isObject(shallowObj)){
        let keys = Object.keys(shallowObj) ;
        for(let key of keys){
            if(key!=null && key.length > 0){
                let value = shallowObj[key] ;
                if(isArray(value)){
                    value = [...value] ;
                }
                retObj[key] = value ;
            }
        }
    }
    return retObj ;
}



function _replacer(key,value){
    //console.info( 'key : ' , key) ;
    if(typeof value === 'function' ){
        return `function ${value.name} () {...}` ;
    }
    if(value == null){
        return value + '' ;
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
export function isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]' ;
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
export function getDefaultValue(value){
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