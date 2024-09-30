<script setup lang="ts">
// Implements a list of tasks
import { defineProps } from 'vue';
import { type Task, useTaskStore } from '../store/useTaskStore.ts'
import TaskCard from './TaskCard.vue';

interface Props {
  tasks: Task[];
}
const props = defineProps<Props>()

const store = useTaskStore();
const handleChangeFilter = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  store.setTasksFilter(target.value as string);
}
const handleChangeSort = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  store.setTasksSort(target.value as string);
}
const handleReset = (event: Event) => {
  event.preventDefault();
  store.setTasksFilter('');
}
</script>

<template>
  <div class="flex flex-col gap-4 p-8 grow">
    <div class="flex flex-row gap-4 justify-between">
      <div>
        <label for="filter">Filter tasks by:</label>
      <select id="filter" @change="handleChangeFilter" :value="store.taskFilter" class="border border-gray-400 rounded-md p-2 mr-2">
        <option value="">None</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <a href="#" class="text-blue-500 hover:underline" @click="handleReset">Reset filter</a>
        </div>
      <div>
        <label for="sort">Sort by Due Date: </label>
        <select id="sort" @change="handleChangeSort" class="border border-gray-400 rounded-md p-2 mr-2">
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
    <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center grow">
      <p class="text-gray-500 uppercase">No tasks found</p>
    </div>
    <div v-for="task in tasks" :key="task.title">
      <TaskCard :key="task.id" :task="task" />
    </div>
  </div>
</template>

<style scoped>

</style>