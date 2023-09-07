import React from 'react'
import { createContext } from 'react'


    const initialState={
        name:''
    }
    export const browserContext = createContext(initialState);
    

    
     const browserContextProvider = ({children})=>{
       
        return(
            <browserContext.Provider>
                {children}
            </browserContext.Provider>
        )
    }
export default browserContextProvider;