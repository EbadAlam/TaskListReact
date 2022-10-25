import logo from './logo.svg';
import './App.css';
import TaskForm from './Components/TaskForm/TaskForm';
function App() {
  return (
    <div className="container">
        <div className="row">
            <div className="col s12">
                <TaskForm />
            </div>
        </div>
    </div>
  );
}

export default App;
