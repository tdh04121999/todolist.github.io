// let data = [];

const dataToDoList = 'dataToDoList';

const saveData = (data) => {
    localStorage.setItem(dataToDoList, JSON.stringify(data));
};

const loadData = () => {
    let data;
    data = JSON.parse(localStorage.getItem(dataToDoList));
    data = data? data : [];
    return data;
    // if(data == null ){
    //     return [];
    // }else{
    //     return data;
    // }
};

const addTask = (newTask) => {
    let data = loadData();
    // data = [...data, newTask]; 
    data.push(newTask)
    saveData(data);
};

const createTaskItem = (taskName, taskStatus, index) => {
    return `<li class="task_item" taskIndex=${index} taskStatus=${taskStatus}>
    <span onclick="markTaskComplete(${index}) " class="task_name task">${taskName}</span>
    <div class="task_option">
      <button class="edit" onclick="pushEditTask(${index})">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </button >
      <button class="delete" onclick = "deleteTask(this, ${index})">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  </li>`;
}

const deleteTask = (value, index) => {
  let data;
  let deleteConfirm = confirm('Delete task?');
  if (deleteConfirm == true ){
    data = loadData();
    data.splice(index, 1);
    // value.closest('.task_item').remove();
    saveData(data)
    renderTask();
  } else {
    return false;
  }
};

const pushEditTask = (index) =>{
  let data;
  data = loadData();
  const task = document.getElementById('your_task');
  const add = document.getElementById('add');
  task.value = data[index].taskName;
  task.setAttribute('index', index)
  add.innerText = 'EDIT TASK';
};

const editTask = (taskName, index) => {
  const add = document.getElementById('add');
  let data = loadData();
  data[index].taskName = taskName;
  add.innerText = "ADD TASK";
  saveData(data);
};

const markTaskComplete = (index) => {
    let data;
    data = loadData();
    data[index].taskStatus = data[index].taskStatus == true ? false : true;
    saveData(data);
    renderTask();
    console.log(data[index].taskStatus)
};

const renderTask = () => {
    let data, listTask, task_complete, count_completed;
    count_completed = 0;
    task_complete = document.getElementById('task_complete')
    data = loadData();
    const ulListTask = document.getElementById('list_task');
    listTask = data.map((value, index) => {
        if((value.taskStatus) == true ) count_completed ++;
        return createTaskItem(value.taskName, value.taskStatus, index);
    })
     if ( count_completed > 0 ){
      task_complete.innerText =  `Yeah, ${count_completed} task completed!`;
    } else{
      task_complete.innerText = `Good luck!`;
    }

    ulListTask.innerHTML = listTask.join(' ');
};

renderTask();

const formAddTask = document.forms.and_task;
formAddTask.addEventListener('submit', (e) => {
    const task = document.getElementById('your_task');
    const index = task.getAttribute('index');

    if(task.value.length < 2){
      alert('Enter yor task!');
      return false;
    }

    if(index){
       editTask(task.value, index);
       task.removeAttribute('index');
    }else{
      let newTask  = {
        taskName : task.value,
        taskStatus : false
      };
      addTask(newTask);
    }
 
    renderTask(); 
    task = ' ';
    e.preventDefault();
});

document.addEventListener('keyup', (e) => {
  if(e.which == 27){
    const task = document.getElementById('your_task');
    const add = document.getElementById('add');
    task.value = '';
    task.removeAttribute('index');
    add.innerText = "ADD TASK";
  }
});
