
import './Home.css'
import { BrowserContext } from '../Context/browserContext'
import { useContext } from 'react';


export default function Home() {

  const {name, BrowserDispatch} = useContext(BrowserContext);

  const handleSubmit=(e)=>{
    e.preventDefault();
    
  }
  const handleName = (e)=>{
      
      console.log(e.target.value)
      if(e.key === 'Enter' && e.target.value.length > 0){
        console.log('enter');
        BrowserDispatch({
          type:'NAME',
          payload:e.target.value
        });
        localStorage.setItem('name',e.target.value);
      }
      else{
        // alert('please enter some name');
      }
  }


   
  return (
    <div className='home-container'>
        <h1 className='main-heading'>To-Do-Treasure</h1>
         <div className='user-details'>
            <span className='heading-1'>Hello, What's your name?</span>
            <form onSubmit={handleSubmit}>
                <input className='input'onKeyPress={handleName}/>
            </form>
         </div>
    </div>
  )
}
