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
    get unDeletedTodos(){
        return this.state.todos.filter(t=>!t.deleted)
    }
    get unCompletedTodos(){
        return this.unDeletedTodos.filter(t=>!t.completed)
    }
    get CompletedTodos(){
        return this.unDeletedTodos.filter(t=>t.completed)
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
            const todos=response.data.resources.map(t=>Object.assign({},t,{editing:false}))
            this.setState({todos})
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

   toEditing=(id:number)=>{
      const {todos}=this.state
      const newTodos = todos.map(t=>{
           if(id===t.id){
               return Object.assign({},t,{editing:true})
           } else {
            return Object.assign({},t,{editing:false})
           }
       })
    this.setState({todos:newTodos})
   }

    render(){
        return(
            <div id="Todos">
            <div className='todo1' id='todo1'>番茄时钟区</div>
            {/* todoInput里面的div，类名是todo2 */}
            <TodoInputPart addTodo={(params)=>this.addTodo(params)} /> 
            {/* todoList里面的div，类名是todoList，同时有组件todoItem */}
            <div className="todoList">
                { this.unCompletedTodos.map(t=>{  
                    return <TodoItem key={t.id} {...t} 
                    update={this.updateTodo}
                    toEditing={this.toEditing}
                    />  
                  }) 
                }  
               {  this.CompletedTodos.map(t=>{  
                    return <TodoItem key={t.id} {...t} 
                    update={this.updateTodo}
                    toEditing={this.toEditing}
                    />  
                  }) 
                }  
            </div>
            </div>
        )
    }


}

export default Component