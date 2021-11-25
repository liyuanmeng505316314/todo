import * as React from 'react';
import {Checkbox,Icon} from 'antd'



interface ITodoItemProps{
    id:number;
    description:string;
    completed:boolean;
    editing:boolean;
    update:(id:number,params:any)=>void;
    toEditing:(id:number)=>void;
}
interface ITOdoItemState {
    editText:string;
}


class Component extends React.Component<ITodoItemProps,ITOdoItemState>{
    constructor(props){
        super(props)
        this.state={
            editText:this.props.description
        }
    }
    update=(params:any)=>{
       this.props.update(this.props.id,params)
    }
    toEditing=()=>{
         this.props.toEditing(this.props.id)
         console.log('编辑')
    }
    onKeyUp=(e)=>{
        if(e.keyCode===13 && this.state.editText!==''){
           this.update({description:this.state.editText})
        }
    }
    public render(){
          const Editing= (
             <div className="editing">
                 <input type="text"  
                     value={this.state.editText}  
                     onChange={e=>this.setState({editText:e.target.value})}
                     onKeyUp={this.onKeyUp}
                 />
                 <div className="iconWrapper">
                     <Icon type="enter"/>
                     <Icon type="delete" theme="filled"
                     onClick={e=>this.update({delete:true})}
                     />
                 </div>
             </div>
          )
          const Text=(<span onDoubleClick={this.toEditing}> {this.props.description} </span>)
        return(
            <div className="TodoItem" id="TodoItem">
            <Checkbox checked={this.props.completed} 
                    onChange={e=>this.update({completed:e.target.checked})}
            />
            {this.props.editing?Editing:Text}
            </div>
        )
    }
   




}

export default Component
