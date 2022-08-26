import { set } from 'express/lib/response';
import React, {useState} from 'react';

function Login() {
    const [user, setUser] = useState(null)
    const signUp = ()=>{

    }
    return ( 
        <div>
            <label>Enter username:</label>
            <input placeholder="username" onChange={(event)=>{setUser({...user, username: event.target.value})} } />
            <button onClick={(event)=>{signUp()}}>submit</button>    
        </div>
     );
}

export default Login;