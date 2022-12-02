<template>
    <div>
      <el-container>
        <el-aside width="200px">
            <common-aside></common-aside>
        </el-aside>
        <el-container>
          <el-main>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>    
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
import CommonAside from './CommonAside.vue';

  export default {
    name: 'MainView',
    components: 
    {
        CommonAside,
    },

  }
  </script>
  
  
  <style>
    html body{
        padding: 0;
        margin: 0;
     }

    .el-header {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
    
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    
    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      padding: 0;
      /* line-height: 160px; */
    }
    
    body > .el-container {
      margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
  </style>
  