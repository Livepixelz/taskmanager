<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
interface Task {
  title: string;
  description?: string;
  dueDate?: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface Props {
  task: Task;
}
const props = defineProps<Props>()

const taskStatus = ref(props.task.status)

const statusClass = computed(() => {
  switch (taskStatus.value) {
    case 'pending':
      return 'pending'
    case 'in-progress':
      return 'in-progress'
    case 'completed':
      return 'completed'
    default:
      return 'pending'
  }
})

const buttonText = computed(() => {
  switch (taskStatus.value) {
    case 'pending':
      return 'Mark as in-progress'
    case 'in-progress':
      return 'Mark as completed'
    case 'completed':
      return 'Mark as pending'
    default:
      return 'Mark as pending'
  }
})

const toggleTaskStatus = () => {
  if (taskStatus.value === 'pending') {
    taskStatus.value = 'in-progress'
  } else if (taskStatus.value === 'in-progress') {
    taskStatus.value = 'completed'
  } else if (taskStatus.value === 'completed') {
    taskStatus.value = 'pending'
  }
}
</script>

<template>
  <div v-if="task" class="task-card">
    <h3 v-if="task.title">{{ task.title }}</h3>
    <p v-if="task.description">{{ task.description }}</p>
    <div class="status">
      Status: <span :class="statusClass">{{ task.status }}</span>
    </div>
    <button @click="toggleTaskStatus">{{ buttonText }}</button>
  </div>
</template>

<style scoped>

</style>