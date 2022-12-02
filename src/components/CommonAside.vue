 <template>
    <div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <img src="../assets/virus.jpg" class="pic_virus">
            <h3 class="h3_class">疫情查询系统</h3>

        <el-menu-item v-for="item in menuData" :key="item.path" :index="item.name" @click="ClickMenu(item)" >
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        </el-menu>
    </div>
     
 </template>
 <script>
 export default {
    name:'CommonAside',
    data() {
        return {
            menuData:[
                {
                    path: '/home',
                    name: 'Home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/find',
                    name: 'Find',
                    label: '疫情风险等级',
                    icon: 's-promotion',
                    url: 'Find/Find',
                },
            ]
        }
    },
    methods:{
        ClickMenu(i){
            if(i.path!=this.$route.path)
            {
                if(!(this.$route.path==='/'&&item.path==='/Home')){
                    this.$router.push(i.path)//直接跳转item.path对应的路由
                }
            }

        }
    }
 }
 </script>
<style lang="less" scoped>
    .pic_virus{
        display: block;
        width: 60px;
        height: 60px;
        margin:20px auto 
    }
    .h3_class{
        color:#fff;
        height: 20px;
        line-height: 25px;
        font-size: 16px;
        text-align: center;
        font-weight: 400;
        margin-bottom: 20px;
    }
    .el-menu-vertical-demo{
        padding-left: 0;
        text-align: left;
        height: 100vh;
        border: 0;
    }
</style>