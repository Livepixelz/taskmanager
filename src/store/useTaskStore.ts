import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate: string | Date;
    status: 'pending' | 'in-progress' | 'completed';
}

// Define the Pinia store
export const useTaskStore = defineStore('taskStore', () => {
    // State: List of tasks
    const tasks = ref<Task[]>([]);

    const taskFilter = ref<'pending' | 'in-progress' | 'completed'| ''>('');

    const taskSort = ref<'' | 'asc' | 'desc'>('');

    const filteredTasks = computed(() => {
        if (taskFilter.value === '') {
            console.log('No filter');
            return tasks.value;
        }
        return tasks.value.filter(task => task.status === taskFilter.value);
    });

    const sortedTasks = computed(() => {
        const sorted = [...filteredTasks.value]; // Clone array for sorting
        if (taskSort.value === 'asc') {
            return sorted.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        }
        if (taskSort.value === 'desc') {
            return sorted.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
        }
        return sorted; // Return unsorted if no sorting selected
    });

    // Actions
    const addTask = (title: string, description: string, dueDate: string) => {
        const date = new Date(dueDate as string);
        if (isNaN(date.getTime())) {
            console.log('Invalid date');
            return;
        }
        const newTask: Task = {
            id: Date.now(), // Use a simple timestamp as an ID
            title,
            description,
            dueDate: date,
            status: 'pending',
        };
        tasks.value.push(newTask);
    };

    const removeTask = (id: number) => {
        tasks.value = tasks.value.filter(task => task.id !== id);
    };

    const toggleTaskStatus = (id: number) => {
        const task = tasks.value.find(task => task.id === id);
        if (task) {
            let status= '';
            if (task.status === 'pending') {
                status = 'in-progress';
            } else if (task.status === 'in-progress') {
                status = 'completed';
            } else {
                status = 'pending';
            }
            task.status = status as 'pending' | 'in-progress' | 'completed';
        }
    };

    const updateTask = (id: number, editedTask: Partial<Task>) => {
        const task = tasks.value.find(task => task.id === id);
        if (task) {
            task.title = editedTask.title ?? task.title;
            task.description = editedTask.description ?? task.description;
            if (editedTask.status) {
                task.status = editedTask.status;
            }
        }
    };

    const setTasksFilter = (filter: string) => {
        taskFilter.value = filter as 'pending' | 'in-progress' | 'completed' | '';
    };

    const setTasksSort = (filter: string) => {
        taskSort.value = filter as 'asc' | 'desc' | '';
    };

    return {
        tasks,
        filteredTasks,
        sortedTasks,
        addTask,
        removeTask,
        toggleTaskStatus,
        updateTask,
        setTasksFilter,
        setTasksSort
    };
});
