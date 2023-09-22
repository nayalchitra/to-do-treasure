import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid';
import './ToDoList.css';

export default function ToDoList() {

    const [todo, setTodo] = useState('');
    const [allTodoList, setAlltodoList] = useState([]);


    useEffect(()=>{
        const storedTodo = localStorage.getItem('todo');
        setAlltodoList(JSON.parse(storedTodo));
    },[])

    const handleTodoChange = (e)=>{
        setTodo(e.target.value);
    }
    const showToDoList = (e)=>{
        if(e.key === 'Enter' && e.target.value.length > 0){
            console.log(allTodoList)
            setAlltodoList([
                ...allTodoList,
                {
                    _id:uuid(),
                    todo,
                    isCompleted:false
                }
            ])
            setTodo('');

            localStorage.setItem('todo', JSON.stringify(allTodoList));
        }
    }

    const handeleTodoCheckChange=(id)=>{
        const updateList = allTodoList.map(todo=>todo._id === id ? {...todo, isCompleted:!todo.isCompleted}:todo)
        setAlltodoList(updateList);
        localStorage.setItem('todo',JSON.stringify(updateList));
    }
    const handleCancelButton=(id)=>{
        const updateList = allTodoList.filter(todo => todo._id !== id);
        setAlltodoList(updateList);
        localStorage.setItem('todo', JSON.stringify(updateList));
    }

  return (
    <div className='todo-container'>
        <div className="todo-input">
            <input type="text" onChange={handleTodoChange} value={todo} onKeyPress={showToDoList} className="input-todo" />
        </div>
       <div className='list-container'>
       {
            allTodoList && allTodoList.map(({todo, _id, isCompleted})=>{
                return (
                    <div key={_id} style={{textAlign:'center',justifyContent:'space-around',alignItems:'center'}}>
                        <label className={isCompleted ? 'strike-through' : 'todo-label'}>
                            <input type='checkbox' onChange={()=>handeleTodoCheckChange(_id) } checked={isCompleted}/>
                            {todo}
                        </label>
                        <button className='cancel-btn' style={{marginLeft:'10px'}} onClick={()=>handleCancelButton(_id)}>Cancel</button>
                    </div>
                )
            })
        }

       </div>
    </div>
  )
}
