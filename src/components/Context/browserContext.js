import React, { useContext,    useEffect,    useReducer,    useState } from 'react'
import { createContext } from 'react'
import { BrowserReducer } from '../Reducer/BrowserReducer';

    export const BrowserContext = createContext();

    
//     const BrowserContextProvider = ({children})=>{
        
//         const [name, setName] = useState('');
//         useEffect(()=>{
//             const nameValue = localStorage.getItem('name');
//             setName(nameValue);
//         },[])
//         return(
//             <BrowserContext.Provider value={{name,setName}}>
//                 {children}
//             </BrowserContext.Provider>
//         )
//     }
  
// const useBroserContext =()=> useContext(BrowserContext);

// export{useBroserContext,BrowserContextProvider}

const initialValue = {
    name:null,
    time:'',
    message:'',
    task:null,
}

const BrowserContextProvider = ({children})=>{

    const [{name,time,message,task}, BrowserDispatch] = useReducer(BrowserReducer,initialValue);

    return(
        <BrowserContext.Provider value={{name,time,message,task,BrowserDispatch}}>
            {children}
        </BrowserContext.Provider>
    )

}

export default BrowserContextProvider;