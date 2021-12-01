import {ADD_TOMATO,INIT_TOMATO} from '../name'



export const addTomato=(payload:number)=>{ 
    return {
        type:ADD_TOMATO,
        payload
       }
}

export const initTomato=(payload:number)=>{ 
    return {
        type:INIT_TOMATO,
        payload
       }
}
