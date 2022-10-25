import React from 'react';
import TaskList from '../TaskList/TaskList';
import {useState} from "react";
import Swal from 'sweetalert2';


function TaskForm(){

	const [inputValues,setInputValues] = useState({task:'',filter:''});
	const [tasks,setTasks] = useState([]);

	const HandleInputFields = (event) => {
		setInputValues({...inputValues, [event.target.name] : event.target.value});
	}

	const HandleSubmitTask = (event) => {
		event.preventDefault();
		const tasksValue = inputValues?.task;
		if(tasksValue == ''){
			alert('Please fill input field');
			return;
		}
		setTasks([...tasks,{task:tasksValue} ]);
		setInputValues({task:''});
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your task has been saved',
            showConfirmButton: false,
            timer: 1500
          })
	}
    const HandleDeleteTask = (event,index) => {
        event.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              const tempTasks = [...tasks]; 
            tempTasks.splice(index,1);
            setTasks(tempTasks);
            }
          })
    }
    const HandleDeleteAllTasks = (event) => {
        event.preventDefault();
        if(tasks.length > 0){
            Swal.fire({
                title: 'Do you want to delete all tasks?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                denyButtonText: `Don't delete`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire('All tasks are deleted successfully!', '', 'success')
                  setTasks([]);
                } else if (result.isDenied) {
                  Swal.fire('Tasks not deleted', '', 'info')
                }
              })
        }
        
    }


    const TaskFilterValue = inputValues.filter ? (inputValues.filter).toLowerCase() : '';
    const filteredTask = tasks.filter(singleTask => singleTask.task.toLowerCase().includes(TaskFilterValue));


	return(
	<div className="container">
        <div className="row">
            <div className="col s12">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">
                            Task List
                        </span>
                        <div className="row">
                            <form id="task-form" onSubmit={HandleSubmitTask}>
                                <div className="input-field col s12">
                                    <input 
                                    type="text" 
                                    name="task" 
                                    id="task"
                                    onChange={HandleInputFields}
                                    value={inputValues.task}
                                    />
                                    <label>new task</label>
                                </div>
                                <button className="waves-effect waves-light btn" type="submit">Add Task</button>
                            </form>
                        </div>
                    </div>
                    <TaskList 
                    tasks={filteredTask}
                    HandleInputFields={HandleInputFields} 
                    HandleDeleteTask={HandleDeleteTask}
                    HandleDeleteAllTasks={HandleDeleteAllTasks}
                    />
                </div>
            </div>
        </div>
    </div>
	);
}

export default TaskForm;