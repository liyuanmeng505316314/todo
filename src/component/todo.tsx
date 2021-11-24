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
         this.setState({todos:[response.data.resources,...todos]})
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
                    return response.data.resources
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
            <TodoInputPart addTodo={(params)=>this.addTodo(params)} />
            <div className='todo3' id='todo3'>3</div>
            <div className='todo4' id='todo4'>4</div>
            <div>{ this.state.todos.map(t=>{  
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