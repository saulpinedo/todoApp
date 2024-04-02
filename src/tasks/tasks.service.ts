import { Get, Injectable, Post } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {

    private tasks: Task[] = [
        {
            id: 1,
            title: 'make a toDo aPP',
            description: 'make a API using NESTJS',
            status: TaskStatus.DONE
        }
    ]

    @Get()
    getAllTasks() {
        return this.tasks
    }

    @Post()
    createTask(title: string, description: string) {
        const newTask = {
            id: 1,
            title: title,
            description: description,
            status: TaskStatus.PENDING
        }
        this.tasks.push(newTask)
        return this.tasks
    }

    @Post()
    updateTask() { }

    @Post()
    deleteTask() { }
}
