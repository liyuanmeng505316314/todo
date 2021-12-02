import * as React from 'react';
interface ICountDownProps{
    timer:number;
    onFinish:()=>void;
}
interface ICountDownState{
    countDown:number;
}

// 该组件使用的是类组件，同时没有用hook，所以逻辑没有那么清晰，同时代码量会更多，故抛弃该代码，并不使用他

let timeId:NodeJS.Timeout;
class Component extends React.Component<ICountDownProps,ICountDownState>{

    constructor(props){
        super(props)
        this.state={
            countDown:this.props.timer
        }
    }

    componentDidMount(){
        timeId=setInterval(()=>{
             const time=this.state.countDown
             this.setState({countDown:time-1000})
             if(time<0){
                 this.props.onFinish()
                 clearInterval(timeId)
             }
        },1000)
    }

    componentWillUnmount(){
        clearInterval(timeId)
    }

    public render(){       
        const minus= Math.floor(this.state.countDown/60000)
        const second=Math.floor(this.state.countDown/1000)%60
        const time =`  ${minus<10? `0${minus}` :minus}:  ${second<10? `0${second}` :second}  `
        return(
           <div className="cuntDown">
               {time}
           </div>
        )
    }
}

export default Component