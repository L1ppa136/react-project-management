import {useState} from 'react'

export default function NewTask({onAdd}) {
    const [enteredTask, setEnteredTask] = useState("");

    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function handleClick(){
        if(enteredTask.trim() === ""){
            return;
        }
        setEnteredTask("");
        onAdd(enteredTask);
    }

  return (
    <div className="flex items-center gap-4">
        <input value={enteredTask} onChange={handleChange} type="text" className="bg-stone-200 w-[15rem] px-2 py-1 rounded-sm"/>
        <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
    </div>
  )
}
