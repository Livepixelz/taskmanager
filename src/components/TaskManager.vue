<script setup lang="ts">
import { ref } from 'vue';
import TaskList from "./TaskList.vue";
import { useTaskStore } from "../store/useTaskStore.ts"

const store = useTaskStore();

const title = ref('');
const description = ref('');
const dueDate = ref('');

const handleSubmit = () => {
  store.addTask(title.value, description.value, dueDate.value);
  title.value = '';
  description.value = '';
  dueDate.value = '';
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 p-8">
    <input type="text" placeholder="Add a task" v-model="title" />
    <input type="text" placeholder="Description" v-model="description" />
    <input type="date" placeholder="Due date" v-model="dueDate" />
    <button type="submit">Add</button>
  </form>
  <TaskList :tasks="store.sortedTasks" />
</template>

<style scoped>

</style>