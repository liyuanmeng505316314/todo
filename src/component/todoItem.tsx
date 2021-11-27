import * as React from 'react';
import {Checkbox,Icon} from 'antd'
import './todoItem.scss'
import classNames from 'classnames'

// 接下来的是一个组件有的东西， description描述，completed是否完成，editing，是否编辑
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
        // 这个前面是两个JSX元素，用于那个选择的
          const Editing= (
             <div className="editing">
                 <input className="input" type="text"  
                     value={this.state.editText}  
                     onChange={e=>this.setState({editText:e.target.value})}
                     onKeyUp={this.onKeyUp}
                 />
                 <div className="iconWrapper">
                     <Icon className="icon" type="enter"/>
                     <Icon className="icon" type="delete" theme="filled"
                     onClick={ e=>this.update({deleted:true})}
                     />
                 </div>
             </div>
          )
          const Text=(<span className="text" onDoubleClick={this.toEditing}> {this.props.description} </span>)
          const todoItemClass=classNames({
            completed:this.props.completed,         
            editing:this.props.editing,
            TodoItem:true,
          })
        return(
            <div className={todoItemClass} id="TodoItem">
            {/*  勾选框，表示是否已完成 */}
            <Checkbox className="checkbox" checked={this.props.completed} 
                    onChange={e=>this.update({completed:e.target.checked})}
            />
            {/* 下面是编辑框或者文本框 */}
            {this.props.editing?Editing:Text}
            </div>
        )
    }

}

export default Component

