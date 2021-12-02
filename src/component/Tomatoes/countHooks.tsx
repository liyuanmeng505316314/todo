import  React,{useEffect,useState,FunctionComponent} from 'react'

interface ICountDownHookProps{
    timer:number;
    onFinish:()=>void;
}

let timeId:NodeJS.Timeout

const Component:FunctionComponent<ICountDownHookProps> =(props)=>{

   const [countDown,setCountDown]=useState(props.timer)
   const minus= Math.floor(countDown/60000)
   const second=Math.floor(countDown/1000)%60
   const time =`  ${minus<10? `0${minus}` :minus}:  ${second<10? `0${second}` :second}  `

  useEffect(()=>{
        document.title=`${time}`
        timeId=setInterval(()=>{
        setCountDown(countDown-1000)
        if(countDown<0){
            props.onFinish()
            clearInterval(timeId)
            document.title=`已完成`
        }
   },1000)
   return function cleanup(){
    clearInterval(timeId)
   }
  })

   return(
    <div className="cuntDown">
        {time}
    </div>
 )
}


export default  Component

 