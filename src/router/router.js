import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/Home.vue'
import Employees from '@/components/Employee/Employees.vue';
import AddEmployee from '@/components/Employee/AddEmployee.vue';
import EmployeeDetail from '@/components/Employee/EmployeeDetail.vue';
import UpdateEmployee from '@/components/Employee/UpdateEmployee.vue';

import Departments from '@/components/Department/Departments.vue';
import DeptDetail from '@/components/Department/DepartmentDetail.vue';
import AddDept from '@/components/Department/AddDepartment.vue';
import UpdateDept from '@/components/Department/UpdateDepartment.vue';


import Projects from '@/components/Project/Projects.vue';
import ProjectDetail from '@/components/Project/ProjectDetail.vue';
import AddProject from '@/components/Project/AddProject.vue';
import UpdateProject from '@/components/Project/UpdateProject.vue';

import Undercon from '@/components/About/Undercon.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/employees',
            name: 'Employees',
            component: Employees
        },
        {
            path: '/employees/add-employee',
            name: 'AddEmployee',
            component: AddEmployee
        },
        {
            path: '/employees/:id',
            name: 'Detail',
            component: EmployeeDetail,
            props: true,
        },
        {
            path: '/employees/:id/edit-emp',
            name: 'Edit',
            component: UpdateEmployee,
        },
        
        {
            path: '/departments',
            name: 'Department',
            component: Departments
        },
        {
            path: '/departments/add-department',
            name: 'AddDept',
            component: AddDept
        },
        {
            path: '/departments/:id',
            name: 'DeptDetail',
            component: DeptDetail,
            props: true,
        },
        {
            path: '/departments/:id/edit-dept',
            name: 'UpdateDept',
            component: UpdateDept,
        },
        {
            path: '/projects',
            name: 'Projects',
            component: Projects
        },
        {
            path: '/projects/add-project',
            name: 'AddProject',
            component: AddProject
        },
        {
            path: '/projects/:id',
            name: 'ProjectDetail',
            component: ProjectDetail,
            props: true,
        },
        {
            path: '/projects/:id/edit-project',
            name: 'UpdateProject',
            component: UpdateProject,
        },
        {   path: '/no',
            name: 'no',
            component: Undercon,
        }
    ]
});

export default router;