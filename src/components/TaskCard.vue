<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { CheckCircleIcon, PlayCircleIcon, PauseCircleIcon } from "@heroicons/vue/24/outline";
import { BellAlertIcon } from '@heroicons/vue/16/solid';

import { type Task, useTaskStore } from "../store/useTaskStore.ts"

const { toggleTaskStatus } = useTaskStore()
interface Props {
  task: Task;
}
const props = defineProps<Props>()

const taskStatus = computed(() =>props.task.status)

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
        <button @click="() => toggleTaskStatus(task.id)" :title="taskStatus">
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