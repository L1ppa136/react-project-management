import React from 'react';
import Button from "./Button";

export default function ProjectsSideBar({selectedProjectId, onProjectSelect, onStartAddProject, projects}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
        <div>
            <Button onClick={onStartAddProject}>+ Add Project</Button>
        </div>
        <ul className="mt-8">
            {projects.map(project => <li key={`#${project.id}`}><button onClick={() => onProjectSelect(project.id)} className={`py-1 w-full text-left px-2 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800 + ${selectedProjectId === project.id ? "bg-stone-800 text-stone-200" : ""}`}>{project.title}</button></li>)}   
        </ul>
    </aside>
  )
}
