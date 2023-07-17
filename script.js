function handleClick(event) {
    const btnId = event.target.id;
    if (btnId === "btn-add-task") {
      console.log("clicked");
      
    } 
  }

  let counter= 1;

  function handleAddSubTask (event) {
    const btnId = event.target.id;
    if (btnId === "btn-add-subTask") {
        console.log("added SubTask");
        var new_input = `<input type='text' class='added-subTask' id=btn-${counter}>`;
        document.getElementById("new_chq").innerHTML += (new_input)
        counter++;
        

    }
  }

  

  const btnAddTask = document.getElementById("btn-add-task");
  const btnAddSubTask = document.getElementById("btn-add-subTask");

  btnAddTask.addEventListener("click", handleClick);
  btnAddSubTask.addEventListener("click", handleAddSubTask);


  