import * as React from 'react';
import { Input,Icon ,Button} from 'antd';
import axios from 'src/config/axios'




interface ISignUpState{
    account:string,
    password:string,
    passwordConformation:string,
}
class Component extends React.Component<any,ISignUpState>{

     constructor(props){
         super(props)
         this.state={
             account:"",
             password:"",
             passwordConformation:""
         }
     }
    
     onChangeAccount=(e)=>{
         
       
         this.setState(this.state,{ account:e.target.value })
     }
     onChangePassword=(e)=>{
      
        this.setState(this.state,{ password:e.target.value })
    }
    onChangePasswordConformation=(e)=>{
      
        this.setState(this.state,{ passwordConformation:e.target.value })
    }
    submit=async()=>{
        const { account ,password,passwordConformation}  =this.state;
    try{
      await axios.post(url:'sign_up/user',data:{
          account,
          password,
          password_Confirmation:passwordConformation,
      })
      console.log('成功')
    }catch(e){
       throw new Error(e)
    }
    }

    render(){
        const { account ,password,passwordConformation}  =this.state;
              return(
                  <div className="SignUp">
                      <Input
                      id='username'
                      placeholder="请输入您的用户名"
                      prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)'}} />}
                      value={account}
                      onChange={this.onChangeAccount}
                      />
                      <Input.Password
                      id='password'
                       value={password} 
                       placeholder="请输入密码"
                       onChange={this.onChangePassword}
                        />
                      <Input.Password
                      id='confirm'
                       value={passwordConformation}
                       onChange={this.onChangePasswordConformation}
                        placeholder="请确认密码"
                         />
                         <Button onClick={this.submit}>注册</Button>
                  </div>
        
              )
    }

}
export default Component