import React,{Component} from 'react' ;

export default function FormOperContainer({children}){
    return(
        <div className="row">
            <div className="col-sm-offset-2 col-sm-10">
               {children}
            </div>
        </div>
    ) ;
}

