
import { useContext, useEffect } from 'react';
import './App.css';
import { BrowserContext } from './components/Context/browserContext';
import Home from './components/Home/Home';
import ToDo from './components/Task/ToDo';
import images from './db/images';



const index = Math.floor(Math.random() * images.length);
  console.log(index);
  const img = images[index].image;
  console.log(img);

  

function App() {
  

   const {name, BrowserDispatch} = useContext(BrowserContext);
   
   console.log('apps ',name);

   useEffect(()=>{
    const nameValue = localStorage.getItem('name');
    BrowserDispatch({
      type:'NAME',
      payload:nameValue
    })
   },[])
  //  console.log(img);
  return (
    <div className="App" style={{backgroundImage:`url(${img})`}}>
 
            {name ? <ToDo/> : <Home/>}
            {/* <Home/> */}
    </div>
    
  );
}

export default App;
