

import * as React from 'react'
import axios from 'src/config/axios'
import TomatoAction from './TomatoAction'
import { connect } from 'react-redux'
import {addTomato,initTomato,updateTomato} from 'src/redux/actions/tomatoes'
import './Tomatoes.scss'    

interface ITomatoesProps{
    addTomato:(payload:any)=>any;
    updateTomato:(payload:any)=>any;
    initTomato:(payload:any[])=>any;
    tomatoes:any[];
}

class Component extends React.Component<ITomatoesProps,any>{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.getTomatoes()
    }
    
    get unfinishedTomato (){
         return this.props.tomatoes.filter(t=>!t.description && !t.ended_at)[0]
    }

    getTomatoes=async()=>{
        try{
            const response =await axios.get('tomatoes')
            this.props.initTomato(response.data.resources) 
            console.log(this.unfinishedTomato)
        }catch(e){
           throw new Error(e)
        }
    }

    startTomato= async ()=>{
        try{
       const response =await axios.post('tomatoes',{duration:1500000})
       this.props.addTomato(response.data.resource)
        }catch(e){
           throw new Error(e)
        }
     }

   public render(){
       return(
           <div className="Tomatoes" id="Tomatoes">
               <TomatoAction
                  startTomato={this.startTomato}
                  unfinishedTomato={this.unfinishedTomato}
                  updateTomato={this.props.updateTomato}
                  />
           </div>
       )
   }    
}

const mapStateToProps=(state:any,ownProps:any)=>({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps={
    addTomato,
    updateTomato,
    initTomato
}

export default connect( mapStateToProps,mapDispatchToProps)(Component)