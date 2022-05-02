import React, { useState, useEffect } from 'react';
    
function Task({ task, index, completeTask, removeTask }) {
    return (
        <div
            className="task"
            style={{ marginLeft:100,display:'flex', justifyContent:'space-between',textAlign:'center',width:600, marginBottom:15,textDecoration: task.completed ? "line-through" : "" }}
        > 
        <div>
        <input style={{marginRight:7}} type='checkbox' id={index} onClick={() => completeTask(index)} className='cnt1' />
        
        {task.title}
        </div> 
        
        <div style={{marginLeft:10}}><button onClick={() => removeTask(index)} className='btn2'>x</button></div>
        
        </div>

    
    );
}

function CreateTask({ addTask }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input1"
                value={value}
                placeholder="Enter a task"
                onChange={e => setValue(e.target.value)}
            />
            
            <input type='submit' value='ADD TASK' className='button1'/>
        </form>
    );
}

function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([]);

    useEffect(() => { setTasksRemaining(tasks.filter(task => task.completed).length) },[tasks]);
    
    const todoTask = async() => {
        const api_call = await fetch(`https://jsonplaceholder.typicode.com/users/1/todos`);
        const data = await api_call.json(); 
        var arr = JSON.stringify(data);
        var defdata = JSON.parse(arr);
        console.log(defdata);
        return defdata;
        }
        
        useEffect(()=>{todoTask().then((e)=>setTasks(e))},[])
    
    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed === true?newTasks[index].completed = false:newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div style={{marginTop:100,marginLeft:500,padding:20}} className="todo-container">
        <div style={{marginLeft:350}} className="header">THINGS TO DO :</div><hr />
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
                    />
                ))}
            </div><hr/>
        
            <div style={{marginLeft:350,marginTop:10,marginBottom:10}}>DONE : {tasksRemaining}</div>
            <div style={{marginLeft:250}} className="create-task">
                <CreateTask addTask={addTask} />
            </div>
        </div>
    );
}

export default Todo;