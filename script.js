  const taskInput   = document.getElementById("taskInput");
      const addBtn      = document.getElementById("addBtn");
      const todoList     = document.getElementById("todoList");
      const progressList = document.getElementById("progressList");
      const doneList     = document.getElementById("doneList");
 
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 
      renderTasks();
 
      
      taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
      });
 
      addBtn.addEventListener("click", addTask);
 
      function addTask() {
        const text = taskInput.value.trim();
 
       
        if (!text) {
          taskInput.classList.remove("shake");
          void taskInput.offsetWidth; 
          taskInput.classList.add("shake");
          taskInput.addEventListener("animationend", () => {
            taskInput.classList.remove("shake");
          }, { once: true });
          return;
        }
 
        const newTask = { text, status: "todo" };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = "";
      }
 
      function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
 
      function renderTasks() {
        todoList.innerHTML     = "";
        progressList.innerHTML = "";
        doneList.innerHTML     = "";
 
        tasks.forEach((task, index) => {
          const li = document.createElement("li");
 
          
          const span = document.createElement("span");
          span.className   = "task-text";
          span.textContent = task.text;
          li.appendChild(span);
 
         
          const btnGroup = document.createElement("div");
          btnGroup.className = "btn-group";
 
          const prevBtn = document.createElement("button");
          prevBtn.textContent = "⬅️";
          prevBtn.className   = "status-btn";
          prevBtn.disabled    = task.status === "todo";
          prevBtn.addEventListener("click", () => {
            if (task.status === "done")     task.status = "progress";
            else if (task.status === "progress") task.status = "todo";
            saveTasks();
            renderTasks();
          });
 
          const nextBtn = document.createElement("button");
          nextBtn.textContent = "➡️";
          nextBtn.className   = "status-btn";
          nextBtn.disabled    = task.status === "done";
          nextBtn.addEventListener("click", () => {
            if (task.status === "todo")     task.status = "progress";
            else if (task.status === "progress") task.status = "done";
            saveTasks();
            renderTasks();
          });
 
          const delBtn = document.createElement("button");
          delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
          delBtn.className   = "delete-btn";
          delBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
          });
 
          btnGroup.appendChild(prevBtn);
          btnGroup.appendChild(nextBtn);
          btnGroup.appendChild(delBtn);
          li.appendChild(btnGroup);
 
          if (task.status === "todo")          todoList.appendChild(li);
          else if (task.status === "progress") progressList.appendChild(li);
          else if (task.status === "done")     doneList.appendChild(li);
        });
      }