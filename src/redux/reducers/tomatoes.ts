import {ADD_TOMATO,INIT_TOMATO} from '../name'


export default (state:any[]=[],action:any):any=>{

    switch(action.type){


     case ADD_TOMATO    : return [ action.payload,...state];
     case INIT_TOMATO    : return [ ...action.payload];
     default    : return state;    
     
 }
}