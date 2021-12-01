import * as React from 'react'

import {Button} from "antd"



interface ITomatoActionProps{
    startTomato:()=>void;
    unfinishedTomato:()=>void;
}
class Component extends React.Component<ITomatoActionProps>{

  constructor(props){
      super(props)
  }

   public render(){ 
       return(
           <div className="TomatoAction" id="TomatoAction">
            <Button className="startTomatoButton" onClick={()=>{this.props.startTomato()}}>开始番茄</Button>
           </div>
       )
   }

}

export default Component