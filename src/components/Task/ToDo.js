import React, { Fragment, useContext, useEffect, useState } from 'react'
import { BrowserContext } from '../Context/browserContext';
import './ToDo.css';
import {quotes}  from '../../db/quotes';
import ToDoList from '../todoList/ToDoList';



const index = Math.floor(Math.random()* quotes.length);
const quote = quotes[index].quote;
const author = quotes[index].author;


export default function ToDo() {


  const {time,message,name,task, BrowserDispatch} = useContext(BrowserContext);

  const [isChecked, setIsChecked] = useState(false);
  const [showTodo, setShowTodo] = useState(false);

  useEffect(()=>{
    const isChecked = localStorage.getItem('checkedStatus');
    isChecked === "true" ? setIsChecked(true) : setIsChecked(false);

  },[])
  useEffect(()=>{
    const task = localStorage.getItem('task');
    BrowserDispatch({
      type:'TASK',
      payload:task
    })

    if(new Date().getDate() !== Number(localStorage.getItem('time'))){
        localStorage.removeItem('task');
        localStorage.removeItem('todo');
        localStorage.removeItem('time');
        localStorage.removeItem('checkedStatus');
    }

  },[])

  useEffect(()=>{
    getCurrentTime()
    // console.log('current date ', localStorage.getItem('time'));
  },[time])

  const getCurrentTime = ()=>{

    const today = new Date();
    const hours = today.getHours();
    const minutes  = today.getMinutes();

    const hour = hours < 10 ? `0${hours}` : hours;
    const minute = minutes < 10 ? `0${minutes}`: minutes;
    const time = `${hour} : ${minute}` ;

    setTimeout(
      getCurrentTime
    ,1000);

    

      BrowserDispatch({
      type:'TIME',
      payload:time
    })

    BrowserDispatch({
      type:'MESSAGE',
      payload:hours
    })

  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log('submit', task)

  }

  const handleTaskChange = (e)=>{
    if(e.key ==='Enter' && e.target.value.length > 0){
      console.log(e.target.value)
      BrowserDispatch({
          type:'TASK',
          payload:e.target.value
        })

        localStorage.setItem('task',e.target.value);
        localStorage.setItem('time', new Date().getDate());
    }
  }

  const handleCompleteTaskChange = (e)=>{
   
    setIsChecked(isChecked=>!isChecked);
    

    localStorage.setItem('checkedStatus',!isChecked);
  }

  const removeTask = (e)=>{
      setIsChecked(false);
      BrowserDispatch({
        type:'CLEAR'
      })
      localStorage.removeItem('task');
      localStorage.removeItem('checkedStatus')
  }

  const handleShowTodoList = (e)=>{
      setShowTodo(!showTodo);
  }

  return (
    <div className='heading-container'>
      <span className='heading-1'>{time}</span>
      <span className='heading-2'>{message} , {name}</span>
      
      {
        name !== null && task ===null ? (
          <Fragment>
            <span className='heading-3'>What is your main focus for today?</span>
            <form onSubmit={handleSubmit}>
              <input className='input' type='text' onKeyPress={handleTaskChange} required/>

            </form>
          </Fragment>
        ) : (
          <div className='heading-5'>
            <p className='heading-4'>Your tasks are : </p>

            <div className='task-conatiner'>

            <input type='checkbox' id='task' onChange={handleCompleteTaskChange} checked={isChecked}/>
            <label className={`${isChecked ? 'strike-through' : ''}`} htmlFor='task'>{task}</label>
            <button className='button' onClick={removeTask}>X</button>
            </div>

          

          </div>

          
      
        )
      }
      
      
      <div className='quotes-container'>

        <span className='quote'>{quote} - <cite>{author}</cite></span>
      </div>

      {
        showTodo && <ToDoList/> 
      }
      <div className='btn-container'>
        <button className='btn' onClick={handleShowTodoList}>ToDo</button>
      </div>
    </div>
  )
}
