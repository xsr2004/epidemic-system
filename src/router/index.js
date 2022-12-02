import VueRouter from "vue-router";
import MainView from "../components/MainView";
import Home from "../view/Home.vue";
import Find from "../view/Find.vue";
export default new VueRouter({
    routes:[
        {
            path:'/',
            component:MainView,
            redirect:'/Home',//重定向，当路径为#，直接跳转为redirect
            children:[
                {
                    path:'Home',
                    name:'Home',
                    component:Home,
                },
                {
                    path:'Find',
                    name:'Find',
                    component:Find,
                },
            ]
        }

    ]
})