import { Get, Injectable, Post } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v1, v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {

    constructor(
        private prisma: PrismaService
    ) { }

    private tasks: Task[] = [
        {
            id: '1',
            title: 'make a toDo aPP',
            description: 'make a API using NESTJS',
            status: TaskStatus.DONE
        }
    ]

    getAllTasks() {
        return this.prisma.task.findMany()
        //return this.tasks
    }

    createTask(title: string, description: string) {
        try {
            return this.prisma.task.create({
                data: {
                    id: v4(),
                    title: title,
                    description: description,
                    status: TaskStatus.PENDING

                }
            })
        } catch (error) {
            console.error('Error creating Task', error)
        }

        // const newTask = {
        //     id: v4(),
        //     title: title,
        //     description: description,
        //     status: TaskStatus.PENDING
        // }
        // this.tasks.push(newTask)
        // return this.tasks
    }

    updateTask(id: string, updateField: UpdateTaskDto) {
        return this.prisma.task.update({
            where: {
                id: id
            },
            data: updateField
        })
        //const tasks = this.getTaskById(id)
        //const newTask = Object.assign(tasks, updateField)
        //this.tasks = this.tasks.map((task) => task.id === id ? newTask : task)
        //return this.task
    }

    async deleteTask(id: string) {
        try {
            await this.prisma.task.delete({
                where: { id: id }
            });
            return this.prisma.task.findMany();
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
        }
        //this.tasks = this.tasks.filter(task => task.id !== id)
    }
    //////////////////////
    getTaskById(id: string) {
        return this.prisma.task.findUnique({
            where: {
                id
            }
        });
        //return this.tasks.find(task => task.id === id)
    }
}
