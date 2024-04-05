import { Get, Injectable, Post } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v1, v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        {
            id: '1',
            title: 'make a toDo aPP',
            description: 'make a API using NESTJS',
            status: TaskStatus.DONE
        }
    ]


    getAllTasks() {
        return this.tasks
    }


    createTask(title: string, description: string) {
        const newTask = {
            id: v4(),
            title: title,
            description: description,
            status: TaskStatus.PENDING
        }
        this.tasks.push(newTask)
        return this.tasks
    }


    updateTask(id: string, updateField: UpdateTaskDto) {
        const tasks = this.getTaskById(id)
        const newTask = Object.assign(tasks, updateField)
        this.tasks = this.tasks.map((task) => task.id === id ? newTask : task)
        return this.tasks
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }
    //////////////////////
    getTaskById(id: string) {
        return this.tasks.find(task => task.id === id)
    }
}
