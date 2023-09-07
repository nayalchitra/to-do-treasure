
import './App.css';
import Home from './components/Home/Home';
import images from './db/images';


function App() {
  const index = Math.floor(Math.random() * images.length);
  console.log(index);
  const img = images[index].image;
  console.log(img);
  return (
    <div className="App" style={{backgroundImage:`url("${img}")`}}>
     
      <browserContextProvider>
           <Home/>
      </browserContextProvider>
      
    </div>
    
  );
}

export default App;
