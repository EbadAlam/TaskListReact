import React from 'react';



function TaskList(props){
    const {HandleInputFields,tasks,HandleDeleteTask,HandleDeleteAllTasks} = props;
	return(
	   <div className="card-action">
            <h5 id="task-title">Tasks</h5>
            <div className="input-field col s12">
                <input 
                type="text" 
                name="filter" 
                id="filter"
                onChange={HandleInputFields}
                />
                <label>Filter Task</label>
            </div>
                {tasks.length > 0 ? 
                <ul className="collection">
                        {tasks.map((singleTask,index) => {
                        return (
                            <li key={index} className="collection-item">{singleTask.task}
                                <a className="delete-item secondary-content" onClick={(event) => HandleDeleteTask(event,index)}>
                                    <i className="fa fa-remove"></i>
                                </a>
                            </li>
                        )
                        })}
                </ul>
            :
            <h5>No Tasks Found!</h5>}
            <a className="clear-tasks btn black" onClick={(event) => HandleDeleteAllTasks(event)}>Clear Task</a>
        </div>
        )
}

export default TaskList;