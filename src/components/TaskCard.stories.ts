import type { Meta, StoryObj } from '@storybook/vue3';

import TaskCard from './TaskCard.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Example/Task',
    component: TaskCard,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        task: {
            control: 'object',
            description: 'The task object to display on the card.',
        },
    }
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Pending: Story = {
    args: {
        task: {
            title: 'Task 1',
            description: 'This is a task',
            status: 'pending',
        }
    },
};

export const InProgress: Story = {
    args: {
        task :{
            title: 'Task 2',
            description: 'This is a task',
            status: 'in-progress',
        }
    },
};

export const Completed: Story = {
    args: {
        task: {
            title: 'Task 3',
            description: 'This is a task',
            status: 'completed',
        }
    },
};

export const DueDate: Story = {
    args: {
        task: {
            title: 'Task with a due date',
            description: 'This is a task',
            dueDate: '2024-10-03',
            status: 'pending',
        }
    },
};

export const NoDescription: Story = {
    args: {
        task: {
            title: 'Task 3 title only',
            status: 'pending',
        }
    },
};
