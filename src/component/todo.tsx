import * as React from 'react';
import './todo.scss'
import TodoInputPart from './todoInputPart'
import axios from '../config/axios'
import TodoItem from './todoItem'

interface ITodoState{
    todos:any[];
}

class Component extends React.Component<any,ITodoState>{
    constructor(props){
        super(props)    
        this.state= {
            todos:[]
        }
    }
        
    addTodo=async (params:any)=>{
        const {todos} =this.state
       try{
         const response= await axios.post('todos',params)
         this.setState({todos:[response.data.resource,...todos]})
         console.log(response.data)
       }catch(e){
         console.log('fail')
       }
    }
    getTodo = async () => { 
        try{
            const response= await axios.get('todos')
            this.setState({todos:response.data.resources})
        }catch(e){
           throw new Error(e)
        }
    }
    updateTodo= async (id:number,params:any)=>{
        const {todos} =this.state
        try{
            const  response= await axios.put(`todos/${id}`,params)
            const newTodos=todos.map(t=>{
                if(id===t.id){
                    return response.data.resource
                }else{
                    return t
                }
            })
            this.setState({todos:newTodos})
          }catch(e){
            throw new Error(e)
          }
    }
    componentDidMount(){
        this.getTodo()
    }
   

    render(){
        return(
            <div id="Todos">
            <div className='todo1' id='todo1'>番茄时钟区</div>
            <TodoInputPart addTodo={(params)=>this.addTodo(params)} />
            <div className='todo3' id='todo3'>3</div>
            <div className='todo4' id='todo4'>4</div>
            <div>{ this.state.todos.map(t=>{  
                    return <TodoItem key={t.id} {...t} 
                    update={this.updateTodo}
                    />  
                  }
                 ) 
                }  
            </div>
            </div>
        )
    }


}

export default Component