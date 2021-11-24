import * as React from 'react';
import './todo.scss'
import TodoInputPart from './todoInputPart'
import axios from '../config/axios'

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
       try{
         const response= await axios.post('todos',params)
         console.log(response.data)
       }catch(e){
         console.log('fail')
       }
    }
    getTodo = async () => { 
        try{
            const response= await axios.get('todos')
            this.setState({todos:response.data.resource})
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
            <main>
                {
                    this.state.todos.map(t=>{
                        return <div key={t.id}>{t.description}</div>
                    }) 
                }
            </main>
            <div className='todo3' id='todo3'>3</div>
            <div className='todo4' id='todo4'>4</div>
            </div>
        )
    }


}

export default Component