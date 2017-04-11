export function getUserEditFormSchemaApi(){
    let formSchema = [
        {
            type:'select',
            label:'服务类型',
            name:'serviceType',
            defaultValue:'',
            rule:{required:true,validator:'customValidateServiceType'},
            options:[
                {name:'选择',value:''},
                {name:'F类型-显示邮箱',value:'F'},
                {name:'M类型-隐藏邮箱',value:'M'},
                {name:'T类型-显示邮箱',value:'T'}
            ],
        },
        {
            type:'text',
            label:'用户名',
            name:'username',
            defaultValue:'',
            rule:{required:true,validator:'validateUsername'},
        },
        {
            type:'email',
            label:'邮箱',
            name:'email',
            defaultValue:'',
            rule:{required:true,email:true} 
        },
        {
            type:'date',
            label:'生日',
            name:'birthday',
            defaultValue:'',
            rule:{required:true,date:true} 
        },
         {
            type:'text',
            label:'年龄',
            name:'age',
            defaultValue:'',
            rule:{integer:true} 
        },
        {
            type:'complex',/**复杂类型 */
            label:'年龄范围',
            divline:true, /**分割线 */
            fields:[{
              type:'text',
              name:'age1',
              width:'48%',
              defaultValue:'',
              rule:{integer:true}   
            },
            {
              type:'text',
              name:'age2',
              width:'48%',
              defaultValue:'',
              rule:{integer:true}   
            }],
        },
        {
            type:'complex',/**复杂类型 */
            label:'通用券',
            //divline:true, /**分割线 */
            fields:[{
              type:'text',
              name:'range2',
              width:'24%',
              defaultValue:'',
              rule:{integer:true}   
            },
            {
              type:'select',
              name:'range3',
              width:'40%',
              defaultValue:'',
              options:[
                {name:'选择',value:''},
                {name:'苹果',value:'1'},
                {name:'橘子',value:'2'},
                {name:'橙子',value:'3'},
                {name:'香蕉',value:'4'}
              ],
              rule:{required:true}   
            },
            {
              type:'text',
              name:'range4',
              width:'32%',
              defaultValue:'',
              //rule:{integer:true,validator:'validateRange1'}
              rule:{integer:true}     
            }],
        },
        {
            type:'radio',
            label:'性别',
            name:'sex',
            defaultValue:'',
            rule:{required:true},
            options:[
              {name:'男',value:'1'},
              {name:'女',value:'2'}
            ]
        },
        {
            type:'checkbox',
            label:'喜欢的水果',
            name:'fruits',
            defaultValue:['2'],
            rule:{required:true},
            options:[
                {name:'苹果',value:'1'},
                {name:'橘子',value:'2'},
                {name:'橙子',value:'3'},
                {name:'香蕉',value:'4'}
            ]
        },
        {
            type:'textarea',
            label:'描述',
            name:'descr',
            defaultValue:'',
            rule:{minLength:2}
        },
        ] ;

      return new Promise(function(resolve,reject){
        //   for(let i= 0 ; i< 20 ; i++){
        //       let tmp = (i+1) ;
        //       let obj = {
        //         type:'text',
        //         label:'用户名'+tmp,
        //         name:'username'+tmp,
        //         defaultValue:'yicj'+tmp,
        //         rule:{required:true,validator:'validateUsername'},
        //     }
        //     formSchema.splice(0,0,obj) ;
        //   }
          setTimeout(function(){
              resolve(formSchema) ;
          },200) ;

      }) ;
}



export default { 
    getUserListTableSchema(){
        let tableFields = [
            {label:'姓名',name:'username'},
            {label:'专业',name:'dept'},
            {label:'邮箱',name:'email'},
            {label:'地址',name:'addr'},
        ] ;
        return new Promise(function(resolve,reject){
            resolve(tableFields) ;
        }) ;
    },
    queryUserList(){
        let list = [
            {username:'张三',dept:'计算机',email:'xx@qq.com',addr:'天津'},
            {username:'李四',dept:'物理',email:'xx@qq.com',addr:'北京'}
        ]
        return new Promise(function(resolve,reject){
            resolve(list) ;
        }) ;
    },
    queryUserById(id,callback){
        let retData = {
            flag:true,
            formData:{
                username:'ttt',
                serviceType:'M',
                birthday:'2017-02-19',
                age:'xx',
                email:'xxxx'
                //email:'test'
            }
        } ;
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve(retData) ;
            },1000) ;
        }) ;
    }
}