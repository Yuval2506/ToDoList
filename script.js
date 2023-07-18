function handleAddTask(event) {
      const btnId = event.target.id;
      console.log("clicked");
      document.getElementById("add-taskDiv").removeAttribute("hidden"); // show addTaskForm
      document.getElementById("tasks-div").setAttribute("hidden", "hidden"); // hide checkboxes
      btnAddTask.style.visibility = 'hidden';
  }

  let counter= 1;

  function handleAddSubTask (event) {
    const btnId = event.target.id;
    if (btnId === "btn-add-subTask") {
        console.log("added SubTask");
        var new_input = `<div id='div-${counter}'><input type='text' class='added-subTask' id='txt-${counter}'></div>`; //create input text
        document.getElementById("new_chq").innerHTML += (new_input); // add input text
        counter++;
    }
  }

  function onSubmitHandler (event) {
    
    event.preventDefault();

    let mainTask = document.getElementById("text-mainTask");
    let subTask = document.getElementById("text-subTask");
    let subTasks = document.getElementsByClassName("added-subTask");
    
    var subsString = [];
    subsString = subsString.push(subTask.value);
    var subs = Array.prototype.slice.call( subTasks )
    subsString = subs.map(element => { return element.value})
    console.log(subsString);
    var task = {mainTask:mainTask.value, subTasks:subsString}; // create task object
    console.log(task);

    var tasks = JSON.parse(localStorage.getItem("tasksList"));
    console.log(tasks);
    tasks.push(task);
    console.log(tasks);
    allTasks = localStorage.setItem("tasksList", JSON.stringify(tasks)); // push new task into localStrange array

    mainTask.value = "";
    subTask.value="";
    subs.forEach(element => {
        element.value="";
    }); // clear input texts

    btnAddTask.style.visibility = 'visible';
    document.getElementById("add-taskDiv").setAttribute("hidden", "hidden"); // hide addTaskForm
    document.getElementById("tasks-div").removeAttribute("hidden"); //show tasks

    printTasks();
  }

  function printTasks () {

    var countPrint=0;
    var tasks = JSON.parse(localStorage.getItem("tasksList"));

    console.log("Print tasks:"+tasks);

    /*tasks.forEach(element => {
        var printMain = `<h1>${tasks[counter].mainTask}</h1>`;
        //var printSub = `<h1>${subTask.value}</h1>`;
    
        document.getElementById("tasks-div").innerHTML += (printMain);
        //document.getElementById("tasks-div").innerHTML += (printSub);
    });*/
  }

  var allTasks=[];
  allTasks = localStorage.setItem("tasksList", JSON.stringify(allTasks));


  const btnAddTask = document.getElementById("btn-add-task");
  const btnAddSubTask = document.getElementById("btn-add-subTask");

  btnAddTask.addEventListener("click", handleAddTask);
  btnAddSubTask.addEventListener("click", handleAddSubTask);
  document.getElementById("add-task-form").onsubmit = onSubmitHandler;



  