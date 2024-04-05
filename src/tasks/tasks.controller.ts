import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './task.entity';
import path from 'path';

@Controller('tasks')
export class TasksController {
    constructor(
        private taskService: TasksService
    ) { }

    @Get()
    getAllTasks() {
        return this.taskService.getAllTasks()
    }

    @Post()
    createTask(@Body() newTask: CreateTaskDto) {
        return this.taskService.createTask(newTask.title, newTask.description)
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        this.taskService.deleteTask(id)
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() updateField: UpdateTaskDto) {
        return this.taskService.updateTask(id, updateField)
    }
}
