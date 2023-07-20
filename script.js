function handleAddTask(event) {
      document.getElementById("add-taskDiv").removeAttribute("hidden"); // show addTaskForm
      document.getElementById("tasks-div").setAttribute("hidden", "hidden"); // hide checkboxes
      btnAddTask.style.visibility = 'hidden';
  }

  let counterAdd= 1;

  function handleAddSubTask (event) {    
    const btnId = event.target.id;
    if (btnId === "btn-add-subTask") {
        console.log("added SubTask");
        let new_input = `<div id='div-${counterAdd}'><input type='text' class='added-subTask' id='txt-${counterAdd}'></div>`; //create input text
        document.getElementById("new_chq").innerHTML += (new_input); // add input text
        counterAdd++;
    }
  }

  function onSubmitHandler (event) {
    
    event.preventDefault();

    let mainTask = document.getElementById("text-mainTask");
    let subTasks = document.getElementsByClassName("added-subTask");
    console.log("subTasks",subTasks);

    let subs = Array.prototype.slice.call( subTasks );
    subs = subs.map(subTask => subTask.value);

    //mainTask.value==="" || 
    if (mainTask.value==="" || isEmpty(subs)){
        alert("fields can't be empty");
    }
    else 
    {
                console.log("subs",subs);
                let task = {mainTask:mainTask.value, subTasks:subs}; // create task object
                console.log("task",task);

                let tasks = JSON.parse(localStorage.getItem("tasksList"));
            
                tasks.push(task);
            
                allTasks = localStorage.setItem("tasksList", JSON.stringify(tasks)); // push new task into localStrange array

                mainTask.value = "";
                let counter=1;
                subs.forEach(subtask => { // clear input texts
                    let div = document.getElementById(`div-${counter}`);
                    div.parentNode.removeChild(div);
                    counter++;
                }); 

                btnAddTask.style.visibility = 'visible';
                counterAdd=1;
                document.getElementById("add-taskDiv").setAttribute("hidden", "hidden"); // hide addTaskForm
                document.getElementById("tasks-div").removeAttribute("hidden"); //show tasks

                printTasks();
    }
  }
  
function isEmpty(subs) {
    console.log("isTrue");
    console.log("subs",subs);

    for(let subTask of subs){
        if (subTask===""){
            return true
        }
        return false
    }
}

  function printTasks () {

    let countPrint=0;

    document.getElementById("tasks-div").innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasksList"));
    console.log(tasks);
    if(tasks===null) {
        localStorage.setItem("tasksList", JSON.stringify([]))
        return
    }

    // display each task
    tasks.forEach(element => { 
        if (countPrint<tasks.length) {
            console.log("countPrint:"+countPrint);
            console.table(tasks);
        
            let printMain = `<h1> <input type="checkbox" class="checkboxes" id="checkbox-${idCount}"> ${tasks[countPrint].mainTask} </h1> `;
            document.getElementById("tasks-div").innerHTML += (printMain);
            console.log("countPrint:",countPrint);
            // display each sub-task
            tasks[countPrint].subTasks.forEach (element => {
                console.table(tasks[countPrint].subTasks);
                console.log("countId:"+countPrint);
                idCount++;
                let printSub = `<h4><input type="checkbox" class="small-checkboxes" id="checkbox-${idCount}"> ${element} </h4> `;
                document.getElementById("tasks-div").innerHTML += (printSub);
                console.log("countPrint:",countPrint);
                
            }); 
            countPrint++;
            idCount++;
        }
    }); 
  }

  function handleCancel (event) {
    document.getElementById("add-taskDiv").setAttribute("hidden", "hidden"); // hide addTaskForm
    document.getElementById("tasks-div").removeAttribute("hidden"); //show tasks
  }

  let idCount=0;

  printTasks();

  const btnAddTask = document.getElementById("btn-add-task");
  const btnAddSubTask = document.getElementById("btn-add-subTask");
  const btnCancel = document.getElementById("btn-cancel");


  btnAddTask.addEventListener("click", handleAddTask);
  btnAddSubTask.addEventListener("click", handleAddSubTask);
  btnCancel.addEventListener("click", handleCancel);

  document.getElementById("add-task-form").onsubmit = onSubmitHandler;



  