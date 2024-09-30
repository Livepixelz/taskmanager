import type { Meta, StoryObj } from '@storybook/vue3';

import TaskList from './TaskList.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Example/TaskList',
    component: TaskList,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        tasks: {
            control: 'object',
            description: 'The list of tasks to display',
        },
    }
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
    args: {
        tasks: [
            {
                title: 'Task 1',
                description: 'This is a task',
                status: 'pending',
            },
            {
                title: 'Task 1',
                description: 'This is a task',
                status: 'pending',
            },
            {
                title: 'Task 1',
                description: 'This is a task',
                status: 'pending',
            },
            {
                title: 'Task 1',
                description: 'This is a task',
                status: 'pending',
            },
        ]
    },
};

export const Empty: Story = {
    args: {
        tasks: [
        ]
    },
};
