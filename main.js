let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
//empty array to store the tasks
let arrayOfTasks=[];
// check if theres tasks in local storeage
if(localStorage.getItem("tasks")){
arrayOfTasks=JSON.parse(localStorage.getItem("tasks"))
}

//trigger get data from local storeage function
getDataFromLocastorage();


//Add task
submit.onclick = function(){
  if(submit.value !==""){
    addTaskToarray(input.value);//Add task to array
    input.value="";
  }
};
//click on task element
tasksDiv.addEventListener("click",(e)=>{
  //Delete Button
  if(e.target.classList.contains("del")) {
    //remove task from local storeage
    deleteTaskwith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove()
    }
    //task Element 
    if(e.target.classList.contains("task")){
      //toggle completed for the task
      toggleStatusTaskWith(e.target.getAttribute("data-id"))
      //toggel done class
      e.target.classList.toggle("done")
    }
})
function addTaskToarray(taskText){
  //Task Data
  const task ={
  id:Date.now(),
  title:taskText,
  completed:false,
  };
  //push tasks to array of tasks
  arrayOfTasks.push(task);
  //add tasks to page 
  addElementsToPageFrom(arrayOfTasks);
  //add tasks to local storeage
  addDataToLocalStoragefrom(arrayOfTasks)
  }


function addElementsToPageFrom(arrayOfTasks){
//Empty tasks div
tasksDiv.innerHTML="";
//looping on Arry of tasks 
arrayOfTasks.forEach((task)=>{
  //Create main div 
  let div =document.createElement("div");
   div.className ="task";
   //check if task is done
   if(task.completed=== true){
    div.className ="task done";
   }
   div.setAttribute("data-id",task.id);
   div.appendChild(document.createTextNode(task.title));
   //create Delete button
   let span=document.createElement("span");
   span.className=("del");
   span.appendChild(document.createTextNode("Delete"))
   //append button to main div
   div.appendChild(span);
 //add task div to tasks contain 
 tasksDiv.appendChild(div);

})
}

function addDataToLocalStoragefrom(arrayOfTasks){
  window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))
}

function getDataFromLocastorage(){
  let data = window.localStorage.getItem("tasks");
  if(data){
    let tasks =JSON.parse(data);
    addElementsToPageFrom(tasks)
  }
}

function deleteTaskwith(taskId){
  //for Explain Only
  // for(let i=0; i<arrayOfTasks.length;i++){
  //   console.log(`${arrayOfTasks[i].id}===${taskid}`)
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
  addDataToLocalStoragefrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId){

 for(let i=0; i<arrayOfTasks.length;i++){
    if(arrayOfTasks[i].id ==taskId ){
      arrayOfTasks[i].completed==false?(arrayOfTasks[i].completed=true):arrayOfTasks[i].completed=false
    }
  }
  addDataToLocalStoragefrom(arrayOfTasks);
}
//فى النهايه يمكن عمل زرار حذف الكل بأستخدام الكلير للوكال استوريج واستخدام انهيرت هتمل للتاسك ديف فارغ وشكرا
