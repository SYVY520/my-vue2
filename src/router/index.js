import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/home/package/Login";
import header from "@/home/views/header";
import center from "@/home/center/center";
import course from "@/home/views/course";
import course1 from "@/home/student/course/course1";
import course2 from "@/home/student/course/course2";
import homework1 from "@/home/student/homework/homework1";
import homework2 from "@/home/student/homework/homework2";
import homework3 from "@/home/student/homework/homework3";
import homework4 from "@/home/student/homework/homework4";
import task1 from "@/home/student/task/task1";
import task2 from "@/home/student/task/task2";
import task3 from "@/home/student/task/task3";
import task4 from "@/home/student/task/task4";
import details0 from "@/home/student/homework/details/details0";
import details1 from "@/home/student/homework/details/details1";
import details2 from "@/home/student/task/details/details2";
import details3 from "@/home/student/task/details/details3";
import homework9 from "@/home/views/homework9";
import task from "@/home/views/task";
import list1 from "@/home/teacher/list/list1";
import listheader from "@/home/teacher/views/listheader";
import list2 from "@/home/teacher/list/list2";
import list3 from "@/home/teacher/list/list3";
import list4 from "@/home/teacher/list/list4";
import tctask from "@/home/teacher/views/tctask";
import tchomework from "@/home/teacher/views/tchomework";
import tcdetails from "@/home/teacher/views/tcdetails";
import tcdetails0 from "@/home/teacher/views/tcdetails0";
import administrator from "@/home/administrator/administrator";
import courseAdmin from "@/home/administrator/courseAdmin";
import courseAdmin1 from "@/home/administrator/courseAdmin1";
import student1 from "@/home/administrator/student1";
import student from "@/home/administrator/student";
import teacher1 from "@/home/administrator/teacher1";
import teacher from "@/home/administrator/teacher";
import adminHeader from "@/home/administrator/adminHeader";
import modifyCourse from "@/home/administrator/modifyCourse";
import modifyPeople from "@/home/administrator/modifyPeople";
import list5 from "@/home/teacher/list/list5";
import tcdetails1 from "@/home/teacher/views/tcdetails1";
import tj from "@/home/student/tj.vue";
import tctj from "@/home/teacher/list/tctj.vue";
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/course1/:id',
        name: 'home',
        component: header,
        props: true,
        children: [
            {
                path: '/course1/:id',
                name: 'course',
                component: course,
                props: true,
                children: [
                    {
                        path: '/course1/:id',
                        name: 'course1',
                        component: course1,
                        props: true,
                    },
                    {
                        path: '/course2/:id',
                        name: 'course2',
                        component: course2,
                        props: true,
                    },
                ]
            },
            {
                path: '/center/:id',
                name: 'center',
                component: center,
                props: true,
            },
            {
                path: '/homework1/:id',
                name: 'homework',
                component: homework9,
                props: true,
                children: [
                    {
                        path: '/homework1/:id',
                        name: 'homework1',
                        component: homework1,
                        props: true,
                    },
                    {
                        path: '/homework2/:id',
                        name: 'homework2',
                        component: homework2,
                        props: true,
                    },
                ]
            },
            {
                path: '/homework3/:id',
                name: 'homeworks',
                component: homework9,
                props: true,
                children: [
                    {
                        path: '/homework3/:id',
                        name: 'homework3',
                        component: homework3,
                        props: true,
                    },
                    {
                        path: '/homework4/:id',
                        name: 'homework4',
                        component: homework4,
                        props: true,
                    },
                ]
            },
            {
                path: '/task1/:id',
                name: 'task',
                component: task,
                props: true,
                children: [
                    {
                        path: '/task1/:id',
                        name: 'task1',
                        component: task1,
                        props: true,
                    },
                    {
                        path: '/task2/:id',
                        name: 'task2',
                        component: task2,
                        props: true,
                    },
                ]
            },
            {
                path: '/task3/:id',
                name: 'tasks',
                component: task,
                props: true,
                children: [
                    {
                        path: '/task3/:id',
                        name: 'task3',
                        component: task3,
                        props: true,
                    },
                    {
                        path: '/task4/:id',
                        name: 'task4',
                        component: task4,
                        props: true,
                    },
                ]
            },
            {
                path: '/details0/:id',
                name: 'details0',
                component: details0,
                props: true,
            },
            {
                path: '/details1/:id',
                name: 'details1',
                component: details1,
                props: true,
            },
            {
                path: '/details2/:id',
                name: 'details2',
                component: details2,
                props: true,
            },
            {
                path: '/details3/:id',
                name: 'details3',
                component: details3,
                props: true,
            },
            {
                path: '/tctask/:id',
                name: 'tctask',
                component: tctask,
                props: true,
            },
            {
                path: '/tchomework/:id',
                name: 'tchomework',
                component: tchomework,
                props: true,
            },
            {
                path: '/tcdetails/:id',
                name: 'tcdetails',
                component: tcdetails,
                props: true,
            },
            {
                path: '/tcdetails0/:id',
                name: 'tcdetails0',
                component: tcdetails0,
                props: true,
            },
            {
                path: '/tcdetails1/:id',
                name: 'tcdetails1',
                component: tcdetails1,
                props: true,
            },
            {
                path: '/list1/:id',
                name: 'listheader',
                component: listheader,
                props: true,
                children: [
                    {
                        path: '/list1/:id',
                        name: 'list1',
                        component: list1,
                        props: true,
                    },
                    {
                        path: '/list2/:id',
                        name: 'list2',
                        component: list2,
                        props: true,
                    },
                    {
                        path: '/list5/:id',
                        name: 'list5',
                        component: list5,
                        props: true,
                    },
                ]
            },
            {
                path: '/list3/:id',
                name: 'listheaders',
                component: listheader,
                props: true,
                children: [
                    {
                        path: '/list3/:id',
                        name: 'list3',
                        component: list3,
                        props: true,
                    },
                    {
                        path: '/list4/:id',
                        name: 'list4',
                        component: list4,
                        props: true,
                    },
                ]
            },
            {
                path: '/courseAdmin/:id',
                name: 'administrator',
                component: administrator,
                props: true,
                children:[
                    {
                        path: '/courseAdmin/:id',
                        name: 'adminHeader',
                        component: adminHeader,
                        props: true,
                        children: [
                            {
                                path: '/courseAdmin/:id',
                                name: 'courseAdmin',
                                component: courseAdmin,
                                props: true,
                            },
                            {
                                path: '/courseAdmin1/:id',
                                name: 'courseAdmin1',
                                component: courseAdmin1,
                                props: true,
                            },
                            {
                                path: '/student/:id',
                                name: 'student',
                                component: student,
                                props: true,
                            },
                            {
                                path: '/student1/:id',
                                name: 'student1',
                                component: student1,
                                props: true,
                            },
                            {
                                path: '/teacher/:id',
                                name: 'teacher',
                                component: teacher,
                                props: true,
                            },
                            {
                                path: '/teacher1/:id',
                                name: 'teacher1',
                                component: teacher1,
                                props: true,
                            },
                        ]
                    }
                ]
            },
            {
                path: '/modifyCourse/:id',
                name: 'modifyCourse',
                component: modifyCourse,
                props: true,
            },
            {
                path: '/modifyPeople/:id',
                name: 'modifyPeople',
                component: modifyPeople,
                props: true,
            },
            {
                path: '/tj/:id',
                name: 'tj',
                component: tj,
                props: true,
            },
            {
                path: '/tctj/:id',
                name: 'tctj',
                component: tctj,
                props: true,
            },
        ]
    }]
const router = new VueRouter({
    routes
})
export default router
