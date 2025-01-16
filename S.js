const taskForm = document.getElementById('taskForm');
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');

        let tasks = [];
        let taskToEdit = null;

      
        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${task.name}</span>
                    <div>
                        <button class="edit" onclick="editTask(${task.id})">Edit</button>
                        <button onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }

        
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskName = taskInput.value.trim();

            if (taskName) {
                if (taskToEdit) {
                    taskToEdit.name = taskName;
                    taskToEdit = null;
                } else {
                    tasks.push({ id: Date.now(), name: taskName });
                }

                taskInput.value = '';
                renderTasks();
            }
        });

        
        function editTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                taskInput.value = task.name;
                taskToEdit = task;
            }
        }

        
        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
        }

        renderTasks();
