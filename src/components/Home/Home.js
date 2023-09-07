
import './Home.css'

export default function Home() {

    

  return (
    <div className='home-container'>
        <h1>To-Do-Treasure</h1>
         <div className='user-details'>
            <span className='main-heading'>Hello, What's your name</span>
            <form>
                <input className='input'/>
            </form>
         </div>
    </div>
  )
}
