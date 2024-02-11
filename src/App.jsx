import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import Project from "./components/Project";
import {useState} from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text){
    setProjectsState(prevState=>{
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    })
  }

  function handleDeleteTask(id){
    setProjectsState(prevState=>{
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      };
    });
  }

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  function handleAddProject(projectData)
  {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: projectId,
        projects:[...prevState.projects, newProject]
      };
    });
  }
  
  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    });
  }

  function handleCancel(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }

  function handleProjectDelete(){
    setProjectsState(prevState=>{

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
      }
    });
  }

  let content;

  if(projectsState.selectedProjectId === null){
    content = <NewProject onCancel={handleCancel} onAddNewProject={handleAddProject}/>;
  }else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }else{
    content = <Project tasks={projectsState.tasks} onDeleteTask={handleDeleteTask} onAddTask={handleAddTask} onDelete={handleProjectDelete} project={projectsState.projects.find(project => project.id === projectsState.selectedProjectId)}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar selectedProjectId={projectsState.selectedProjectId} onProjectSelect={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projectsState.projects}/>
      {content}
    </main>
  );
}

export default App;
