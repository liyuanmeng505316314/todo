import * as React from 'react';
import {Button} from 'antd'
import { useHistory } from 'react-router-dom';


const Component=()=>{

    const history=useHistory()

    const login=()=>{
        console.log('登录成功，回到首页')
        history.push('/')
    };

    return(
        <div>
            <Button onClick={login}>
                登录
            </Button>
        </div>       
    )
    }


export default Component