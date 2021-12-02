import * as React from 'react'
import axios  from 'src/config/axios'
import CountDown from './countDown'
import {Button,Input} from "antd"

interface ITomatoActionState{
    description:string;
}

interface ITomatoActionProps{
    startTomato:()=>void;
    unfinishedTomato:any;
}
class Component extends React.Component<ITomatoActionProps, ITomatoActionState>{

  constructor(props){
      super(props)
      this.state={
          description:' '
      }
  }

   onKeyUp=(e)=>{
    if(e.keyCode===13 && this.state.description!==''){
        this.addDescription()

    }
   }
   addDescription= async ()=>{
       try{
     const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,{description:this.state.description,ended_at:new Date()})
     this.setState({description:''})
     console.log(response)
      }catch(e){
          throw new Error(e)
      }
   }

   public render(){
       let html =<div>1</div>
       if(this.props.unfinishedTomato===undefined){
           html=<Button className="startTomatoButton" onClick={()=>{this.props.startTomato()}}>  开始番茄</Button>
       }else{
        const startedAt =Date.parse(this.props.unfinishedTomato.started_at)
        const duration=this.props.unfinishedTomato.duration
        const timeNow=new Date().getTime()
          if(timeNow-startedAt>duration){
              html=   <div>
                  <Input value={this.state.description}
                         placeholder="请输入你刚刚完成的任务"
                         onChange={e=>this.setState({description:e.target.value})}
                         onKeyUp={e=>this.onKeyUp(e)}
                 />
                 </div>
          } else if(timeNow-startedAt<=duration){
              html =<CountDown/>
          }
       }
       
       return(
           <div className="TomatoAction" id="TomatoAction">
             {html}
        
         
           </div>
       )
   }

}

export default Component