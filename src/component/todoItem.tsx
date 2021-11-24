import * as React from 'react';
import {Checkbox} from 'antd'



interface ITodoItemProps{
    id:number;
    description:string;
    completed:boolean;
    editing:boolean;
    update:(id:number,params:any)=>void;
    toEditing:(id:number)=>void;
}



class Component extends React.Component<ITodoItemProps>{
    constructor(props){
        super(props)
    }
    update=(params:any)=>{
       this.props.update(this.props.id,params)
    }
    toEditing=()=>{
         this.props.toEditing(this.props.id)
    }
    public render(){
        return(
            <div className="TodoItem" id="TodoItem">
            <Checkbox checked={this.props.completed} 
                    onChange={e=>this.update({completed:e.target.checked})}
            />
            {
              this.props.editing?
              <input type ="text" value={this.props.description}/>:
              <span onDoubleClick={this.toEditing}> {this.props.description} </span>
            }
            </div>
        )
    }
   




}

export default Component