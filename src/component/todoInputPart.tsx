import * as React from 'react';
import {Icon, Input } from "antd";

interface ITodoInputState{
    description:string;
}
interface ITodoInputProps{
    addTodo:(params:any)=>void;
}

class Component extends React.Component<ITodoInputProps,ITodoInputState>{
        
    constructor(props){
        super(props)
        this.state={
            description:''
        }
    }
    
    onKeyUp=(e)=>{
        if(e.keyCode===13 && this.state.description!==''){
            this.addTodo()
           
        }
    }
    addTodo=()=>{
        this.props.addTodo({description:this.state.description})
        this.setState({description:''})
    }

    public  render(){

        const {description} =this.state; 
        const suffix=description?<Icon  type="enter" onClick={this.addTodo} /> : <span/>;

        return(
            
            <div className='todo2' id='todo2'>
                <div className='input'> 
                <Input
                placeholder="添加新任务"
                suffix={suffix}
                value={description}
                // onChange={e=>console.log(e.target.value)}
                onChange={e=>this.setState({description:e.target.value})}
                onKeyUp={this.onKeyUp}
                />
                </div>
                </div>
          

        )
    }


}

export default Component