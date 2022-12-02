<template>
    <div class="find_container">
        <el-card class="second">
            <div style="height:35px;line-height: 19px;margin-bottom: 15px;">
                <div class="deadline">
                    <span class="deadline span">截至{{listDeadline}}</span>
                </div>
            <span class="h3_class">全国高风险区名单</span>
            <el-cascader
                v-model="value"
                :options="options"
                @change="handleChange"
                filterable
                >
                </el-cascader>
                <el-button icon="el-icon-search" circle class="search_button"></el-button>
            </div>
             <el-table 
            :stripe="true"
            align="center"
            v-loading="loading"
            
            element-loading-text="正在获取全国疫情信息..."
            height="1000px"
            style="width:800px;"
            :data="tableData"
            :border="true"
            class="data_list"          
            >

                <el-table-column label="市，区/县，乡"
                align="center"
                width="400"
                style="line-height:normal">

                        <template slot-scope="scope">
                            <div class="area_name">
                                <span>{{scope.row.area_name}}</span>
                            </div>
                            <div v-for="(item,index) in scope.row.communitys" :key="item" :label="item" :index="index">{{scope.row.communitys[index]}}</div>
                        </template>
                    
                </el-table-column>
                <el-table-column prop="warningType1"
                label="地区性质"
                align="center"
                width="400"></el-table-column>
                
            </el-table> 
            
            
        </el-card>
    </div>
 </template>
 <script>
        import getCurrentCityName from '../api/getUserLocation.js'
        import CryptoJS from "crypto-js";
        import axios from 'axios';
 export default {
    name:'Find',
    
    data() {
        return {
            NowCity:'',
            value: ['','',''],
            options:[
            
                {
                    value:"北京市",
                    label:"北京市"
                },
                {
                    value:"天津市",
                    label:"天津市"
                },
                {
                    value:"河北省",
                    label:"河北省",
                    children:[
                        {
                            value:"石家庄市",
                            label:"石家庄市"
                        },
                        {
                            value:"唐山市",
                            label:"唐山市"
                        },
                        {
                            value:"秦皇岛市",
                            label:"秦皇岛市"
                        },
                        {
                            value:"邯郸市",
                            label:"邯郸市"
                        }
                    ]
                },
                {
                    value:"山西省",
                    label:"山西省"
                },
                {
                    value:"内蒙古自治区",
                    label:"内蒙古自治区"
                },
                {
                    value:"辽宁省",
                    label:"辽宁省"
                },
                {
                    value:"黑龙江省",
                    label:"黑龙江省"
                },
                {
                    value:"上海市",
                    label:"上海市"
                },
                {
                    value:"浙江省",
                    label:"浙江省"
                },
                {
                    value:"安徽省",
                    label:"安徽省"
                }
            ],
            tableData: [
                    // {
                    //     area_name:"",
                    //     communitys:[]
                    // },  
                        
            ],
            listDeadline:"",//名单的截止日期
            loading:true,//名单加载中。。。
            warningType1:"高风险",
        }
    },
    methods:{
        handleChange(){
            console.log(this.value);
        },            
        getbmfwLiudiao() {
                var e = ((new Date).getTime() / 1e3).toFixed(), a = "23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA",
                    i = "123456789abcdefg", s = "zdww";
                let params = {
                    appId: "NcApplication",
                    flag: "11",
                    key: "3C502C97ABDA40D0A60FBEE50FAAD1DA",
                    nonceHeader: i,
                    paasHeader: s,
                    signatureHeader: CryptoJS.SHA256(e + a + i + e).toString(CryptoJS.enc.Hex).toUpperCase(),
                    timestampHeader: e,
                }
                var o = CryptoJS.SHA256(params.timestampHeader + "fTN2pfuisxTavbTuYVSsNJHetwq5bJvCQkjjtiLM2dCratiA" + params.timestampHeader).toString(CryptoJS.enc.Hex).toUpperCase();
                axios.request({
                    method: 'post',
                    url: 'http://bmfw.www.gov.cn/bjww/interface/interfaceJson',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    crossDomain: !0 === !document.all,
                    data: params,
                    params: params,
                    headers: {
                        "x-wif-nonce": "QkjjtiLM2dCratiA",
                        "x-wif-paasid": "smt-application",
                        "x-wif-signature": o,
                        "x-wif-timestamp": params.timestampHeader
                    }
                }).then(res => {
                        this.loading=false;
                        this.successTip();
                        
                        this.tableData=res.data.data.highlist
                        // console.log(this.tableData);
                        this.listDeadline=res.data.data.end_update_time;
                        for (const index in this.tableData) {
                            this.tableData[index].warningType1="高风险";
                            // console.log(this.tableData[index].communitys);
                            for (const index2 in this.tableData[index].communitys) {

                                this.tableData[index][index2]=this.tableData[index].communitys[index2];
                            }
                            console.log(this.tableData);
                        }
                        // console.log(this.tableData);
                }).catch(error=>{
                    this.errorTip();
                })


        },
       
        getCurrentDafaultCity(){
            getCurrentCityName().then((city)=>{
                console.log(city);
                this.NowCity=city;
            })
        },
        errorTip(){
            // ajax请求失败
            this.loading=false;
            this.$message({
                message:'服务器忙或网络慢，请等待或重开',
                type:'error'
            })
        },
        successTip(){
            // 获取数据成功
            this.loading=false;
            this.$message({
                message:'获取数据成功！',
                type:'success'
            })
        }
    },
    mounted(){
        // this.getTree();
        // this.getCurrentDafaultCity();
        this.getbmfwLiudiao();
    },
 }
 </script>
<style lang="less" scoped>

    .h3_class{
        color: rgb(51, 51, 51);
        line-height: 35px;
        text-align: center;
        margin: 0;
        font-weight: 300px;
        font-size: 18px;
        text-align: center;
    }
    .area_name{
        color: rgb(24,82,141);
        line-height: 35px;
        text-align: center;
        margin: 0;
        font-weight: 600px;
        font-size: 18px;
        text-align: center;
    }
    .el-cascader{
        position:absolute;
        right: 70px;
    }
    .second{
        border: 1px solid #ccc;
        margin-top:10px;
        position: relative;
        width: 1200px;
        margin:auto;
        background-color: rgb(238, 238, 238);
        
    }
    .deadline{
        position: absolute;
        left: 10px;
        top:20px;
        .span{
            font-size: 12px;
            color: rgb(0, 0, 0);
            width: 200px;
            text-align: left;
        }
    }
    .search_button{
        position: absolute;
        right: 20px;
    }
    .data_list{
        line-height: 23px;
        margin: auto;
    }
</style>