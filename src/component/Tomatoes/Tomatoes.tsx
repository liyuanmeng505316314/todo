

import * as React from 'react'
import TomatoAction from './TomatoAction'
import { connect } from 'react-redux'
import {addTomato} from 'src/redux/actions'
import './Tomatoes.scss'    


class Component extends React.Component{
   public render(){
       return(
           <div className="Tomatoes" id="Tomatoes">
               <TomatoAction/>
           </div>
       )
   }    


   
}

const mapStateToProps=(state:any,ownProps:any)=>({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps={
    addTomato
}

export default connect( mapStateToProps,mapDispatchToProps)(Component)