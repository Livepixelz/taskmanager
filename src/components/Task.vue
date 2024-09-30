<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { CheckCircleIcon, PlayCircleIcon, PauseCircleIcon } from "@heroicons/vue/24/outline";
import { BellAlertIcon } from '@heroicons/vue/16/solid';

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
      return 'text-gray-300 bg-gray-100 shadow-none border-none'
    default:
      return 'pending'
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
  <div class="rounded-lg border border-gray-200 p-4 shadow-md" :class="statusClass">
    <div class="flex justify-between">
      <div>
          <h3 v-if="task.title" class="text-md font-medium text-gray-900">{{ task.title }}</h3>
          <p v-if="task.description" class="text-sm text-gray-500">{{ task.description }}</p>
        <p v-if="task.dueDate" class="text-sm text-gray-500">
          <BellAlertIcon class="h-3 w-3 inline-block" /> {{ task.dueDate }}</p>
        </div>
      <div class="items-start">
        <button @click="toggleTaskStatus" :title="taskStatus">
          <PauseCircleIcon v-if="taskStatus === 'pending'" class="h-8 w-8" />
          <CheckCircleIcon v-if="taskStatus === 'completed'" class="h-8 w-8 text-green-500" />
          <PlayCircleIcon v-if="taskStatus === 'in-progress'" class="h-8 w-8 text-blue-500" />
        </button>
      </div>
      </div>
  </div>
</template>

<style scoped>

</style>