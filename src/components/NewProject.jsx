import { useRef } from 'react';
import Input from './Input';
import InvalidProjectDataModal from './InvalidProjectDataModal';

function stringValidationHelper(string){
    const bool = typeof string === "string" && string.length === 0 || string === null || !isNaN(string)
    return bool;
}

function dueDateValidationHelper(date){
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
        
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const bool = selectedDate < currentDate || isNaN(selectedDate);
    return bool;
}

export default function NewProject({onCancel, onAddNewProject}) {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    const invalidDataModal = useRef();

    function handleSave(){
        const newProject = {
            title: title.current.value,
            description: description.current.value,
            dueDate: dueDate.current.value
        }
        
        const invalidTitle = stringValidationHelper(newProject.title);
        const invalidDescription = stringValidationHelper(newProject.description);        
        const invalidDate = dueDateValidationHelper(newProject.dueDate);

        if(invalidTitle || invalidDescription || invalidDate){
            invalidDataModal.current.open();
            return;
        }

        onAddNewProject(newProject);
    }

  return (
    <>
        <InvalidProjectDataModal ref={invalidDataModal}/>
        <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
            <li>
                <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button>
            </li>
            <li>
                <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                    onClick={handleSave}
                >
                    Save
                </button>
            </li>
        </menu>
        <div>
            <Input ref={title} label="Title"/>
            <Input ref={description} label="Description" textarea/>
            <Input ref={dueDate} label="Due Date" type="date"/>
        </div>
    </div>
    </>
  )
}
