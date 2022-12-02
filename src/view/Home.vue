<template>
    
    <div class="home_container" v-show="this.loading">
        <!-- view头 -->
        <el-card class="first">
               <span class="h3_class">
               {{judgeTime}}
               </span>
        </el-card>
        <!-- 全国新增 -->
        <div class="home_add_container">
            <div class="home_add_container add1">
                <div class="number">+{{this.chinaTotal.localConfirmAdd}}</div><br>
                <div class="infor one">本土确诊</div>
            </div>
            <div class="home_add_container add2">
                <div class="number" style="color:rgb(199, 62, 129)">+{{this.chinaTotal.localWzzAdd}}</div><br>
                <div class="infor">本土无症状</div>
            </div>
            <div class="home_add_container add3">
                <div class="number" style="color:rgb(186, 34, 36)">+{{this.chinaTotal.confirmAdd}}</div><br>
                <div class="infor">确诊病例</div>
            </div>
            <div class="home_add_container add4">
                <div class="number">{{this.chinaTotal.localConfirm}}</div><br>
                <div class="infor">现有本土确诊</div>
            </div>
            <div class="home_add_container add5">
                <div class="number" style="color:rgb(199, 62, 129)">{{this.chinaTotal.noInfectH5}}</div><br>
                <div class="infor">现有本土无症状</div>
            </div>
            <div class="home_add_container add6">
                <div class="number" style="color:rgb(237, 59, 62)">{{this.chinaTotal.highRiskAreaNum}}</div><br>
                <div class="infor">高风险地区</div>
            </div>

        </div>
        <div class="loading">
            <el-card shadow="hover" body-style="padding-top:0px">
            <table class="table">
            <tbody>
            <tr class="tr-area">
                <td class="td" style="font-weight:600">地区</td>
                <td class="td" style="color:rgb(249, 94, 21)">新增确诊</td>
                <td class="td" style="color:rgb(79, 90, 101)">新增死亡</td>
                <td class="td" style="color:rgb(240, 83, 85)">现有确诊</td>
                <td class="td" style="color:rgb(208, 92, 149)">累计确诊</td>
                <td class="td" style="color:rgb(79, 90, 101)">累计死亡</td>
            </tr>
            <tr v-for="item in areaTree" :key="item.lastUpdateTime" class="tr">
                <td style="color:rgb(83, 125, 239);font-weight: 600;">
                    {{item.name}}
                </td>
                <td>
                    {{item.local_confirm_add}}
                </td>
                <td>
                    {{item.dead_add}}
                </td>
                <td>
                    {{item.nowConfirm}}
                </td>
                <td>
                    {{item.confirm}}
                </td>
                <td>
                    {{item.dead}}
                </td>
            </tr>
            </tbody>

        </table></el-card>
        <div class="tip">
            <span style="color:rgb(128, 115, 115);font-size:8px;">数据来源：各地卫健委每日公开数据</span>        
            <i class="el-icon-warning-outline"></i>
        </div>

        <div ref="echart" style="width: 350px;height: 350px;position: absolute;top: 350px;right: 0px;">

        </div>
        </div>
        


        
    </div>

 </template>
 <script>
    import * as echarts from 'echarts';
    import 'echarts/map/js/china.js';
    import axios from 'axios';
 export default {
    name:'Home',
    data() {
        return {
            timer:undefined,
            NowTime:new Date().toLocaleString(),
            TimeLoad:false,
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
            imgsrc:"./banner.png",
            chinaTotal:{
                localConfirmAdd:undefined,//本土确诊1
                localWzzAdd:undefined,//本土无症状2
                confirmAdd:undefined,//新增确诊病例3
                localConfirm:undefined,//现有本土确诊4
                noInfectH5:undefined,//现有本土无症状5
                highRiskAreaNum:undefined,//高风险地区6
                lastUpdateTime:undefined,//最后更新时间
            },
            areaTree:[
                {

                }
            ],
            dataList:[
            //   {name: '南海诸岛', value: 0},
              {name: '台湾', value: 2170.7},
              {name: '广东', value: 1559.6},
              {name: '香港', value: 2423.78},
              {name: '北京', value: 3048.43},
              {name: '重庆', value: 7556.3},
              {name: '山西', value: 9605},
              {name: '四川', value: 4800.5},
              {name: '云南', value: 4359.3},
              {name: '浙江', value: 3788.7},
              {name: '黑龙江', value: 6860.2},
              {name: '福建', value: 6323.6},
              {name: '内蒙古', value: 10047.2},
              {name: '河南', value: 2444.67},
              {name: '辽宁', value: 8029.3},
              {name: '陕西', value: 5737},
              {name: '山东', value: 4622.1},
              {name: '上海', value: 5917},
              {name: '江苏', value: 4885},
              {name: '海南', value: 2625.71},
              {name: '湖南', value: 3702.35},
              {name: '贵州', value: 2534},
              {name: '新疆', value: 3835.44},
              {name: '湖北', value: 2717.43},
              {name: '吉林', value: 3941},
              {name: '河北', value: 3580},
              {name: '澳门', value: 11346},
              {name: '广西', value: 3983.8},
              {name: '青海', value: 3371.5},
              {name: '安徽', value: 8341},
              {name: '天津', value: 681.79},
              {name: '西藏', value: 925.76},
              {name: '甘肃', value: 2369},
              {name: '江西', value: 748.25},
              {name: '宁夏', value: 63.2}
            ],
            loading:false,
        }
    },
    mounted() {
        console.log(this.areaTree);
        this.getChinaDataNow();
        this.buildMap();
    },
    created(){
        this.timer=setInterval(()=>{
            this.NowTime = new Date().toLocaleString();
            this.TimeLoad=true;
        },1000);
    },
    computed:{
        judgeTime(){
            if(this.timer){
                let date=new Date(this.NowTime);
                this.TimeLoad=true;
                if(date.getHours()>=0&&date.getHours()<=4)return `夜深了！现在是北京时间${this.NowTime}`;
                if(date.getHours()>4&&date.getHours()<=11)return `早上好！现在是北京时间${this.NowTime}`;
                if(date.getHours()>11&&date.getHours()<=14)return `中午好！现在是北京时间${this.NowTime}`;
                if(date.getHours()>14&&date.getHours()<=18)return `下午好！现在是北京时间${this.NowTime}`;
                if(date.getHours()>18&&date.getHours()<=24)return `晚上好！现在是北京时间${this.NowTime}`;
            }
        },

    },
    methods:{
        handleChange(){
            console.log(this.value);
        },            
        getChinaDataNow(){
            axios.request({
                method:'post',
                url:'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf',
                dataType: "json",
                ContentType: "application/x-www-form-urlencoded",
            }).then(res=>{
                this.chinaTotal.localConfirmAdd=res.data.data.diseaseh5Shelf.chinaTotal.localConfirmAdd;
                this.chinaTotal.localWzzAdd=res.data.data.diseaseh5Shelf.chinaTotal.localWzzAdd;
                this.chinaTotal.confirmAdd=res.data.data.diseaseh5Shelf.chinaTotal.confirmAdd;
                this.chinaTotal.localConfirm=res.data.data.diseaseh5Shelf.chinaTotal.localConfirm;
                this.chinaTotal.noInfectH5=res.data.data.diseaseh5Shelf.chinaTotal.noInfectH5;
                this.chinaTotal.highRiskAreaNum=res.data.data.diseaseh5Shelf.chinaTotal.highRiskAreaNum;
                this.chinaTotal.lastUpdateTime=res.data.data.diseaseh5Shelf.lastUpdateTime;
                

                // console.log(res.data.data.diseaseh5Shelf.areaTree[0].children[0].today);
                for (const key in res.data.data.diseaseh5Shelf.areaTree[0].children) {
                    res.data.data.diseaseh5Shelf.areaTree[0].children[key].today.name=res.data.data.diseaseh5Shelf.areaTree[0].children[key].name;
                }
                for (const key in res.data.data.diseaseh5Shelf.areaTree[0].children) {
                    this.areaTree[key]=res.data.data.diseaseh5Shelf.areaTree[0].children[key].today;
                    this.areaTree[key].nowConfirm=res.data.data.diseaseh5Shelf.areaTree[0].children[key].total.nowConfirm;//现有确诊
                    this.areaTree[key].confirm=res.data.data.diseaseh5Shelf.areaTree[0].children[key].total.confirm;//累计确诊
                    if(this.dataList[key].name==this.areaTree[key].name){
                        this.dataList[key].value=this.areaTree[key].nowConfirm;
                    }
                    this.areaTree[key].dead=res.data.data.diseaseh5Shelf.areaTree[0].children[key].total.dead;//累计死亡
                    this.areaTree[key].dead_add=res.data.data.diseaseh5Shelf.areaTree[0].children[key].today.dead_add;//新增死亡

                }
                console.log(this.areaTree);
                console.log(this.dataList);
                // console.log(this.areaTreeold);
                // console.log(this.areaTree);
                this.buildMap();
                this.loading=true;
            })
        },
        buildMap(){
                var myChart = echarts.init(this.$refs.echart);
                console.log(myChart);
                let option = {
                    tooltip: {
                        formatter:function(params,ticket, callback){
                            return params.seriesName+'<br />'+params.name+':'+params.value
                        }//数据格式化
                    },
                    // layoutCenter: ['70%', '50%'],//位置
	                // layoutSize:'65%',//大小
                    visualMap: {
                        min: 1000,
                        max: 10000,
                        left: 'left',
                        top: 'bottom',
                        text: ['高','低'],//取值范围的文字
                        inRange: {
                            color: ['#fff4e6', '#dd2002']//取值范围的颜色
                        },
                        // show:true//图注
                    },
                    geo: {
                        map: 'china',
                        roam: false,//不开启缩放和平移
                        zoom:1.23,//视角缩放比例
                        label: {
                            normal: {
                                show: true,
                                fontSize:'10',//注意：地图省份名字字体如果过大会导致字体重叠
                                color: 'rgba(0,0,0,0.7)'
                            }
                        },
                        itemStyle: {
                            normal:{
                                borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            emphasis:{
                                areaColor: '#F3B329',//鼠标选择区域颜色
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    series : [
                        {
                            name: '现有确诊',
                            type: 'map',
                            geoIndex: 0,
                            data:this.dataList,
                        }
                    ]
                };
                myChart.setOption(option);
        }

    },
    beforeDestroy(){
        //关闭显示时间的计时器
        if (this.timer) {
            clearInterval(this.timer);
        }
        
    }

 }
 </script>
<style lang="less" scoped>
    .home_container{
        background-color: rgb(242, 242, 242);
        height: 750px;
        padding: 0;
        position: relative;
    }
    .loading{
        overflow: hidden;
    }
    .table{
        margin: auto;
        border-collapse: collapse;
        border: none;
    }
    .tr{
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        text-align: center;
    }
    .tr-area{
        height: 50px;
        line-height: 50px;
        
    }
    .td{
        width: 100px;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 1px rgb(245, 245, 245) solid;
    }
    .tip{
        position: absolute;
        top:300px;
        right: 10px;
    }
    .number{
        display: block;
        margin-top: 30px;
        
        font-size: 20px;
        font-weight: bold;
        color: rgb(224, 119, 55);
    }
    .infor{
        font-size: 15px;
        font-weight: bold;
    }
    .home_add_container{
        width: 366px;
        height: 300px;
        float: right;

        .add1{
            box-sizing: border-box;
            border: 1px solid #ccc;
            margin-left: 3px;
            width: 120px;
            height: 120px;
            margin-bottom: 3px;
            background-color: rgb(255, 250, 247);
        }
        .add2{
            width: 120px;
            height: 120px;
            box-sizing: border-box;
            margin-left: 3px;
            border: 1px solid #ccc;
            margin-bottom: 3px;

            background-color: rgb(254, 247, 255);

        }
        .add3{
            width: 120px;
            height: 120px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            margin-bottom: 3px;
            background-color: rgb(254, 244, 244);

        }
        .add4{
            width: 120px;
            height: 120px;
            box-sizing: border-box;
            margin-left: 3px;
            border: 1px solid #ccc;

            background-color: rgb(255, 250, 247);

        }
        .add5{
            width: 120px;
            height: 120px;
            box-sizing: border-box;
            border: 1px solid #ccc;

            margin-left: 3px;
            background-color: rgb(254, 247, 255);

        }
        .add6{
            width: 120px;
            height: 120px;
            border: 1px solid #ccc;
            box-sizing: border-box;

            background-color: rgb(255, 247, 247);

        }
    }
    .h3_class{
        color: rgb(51, 51, 51);
        line-height: 35px;
        text-align: center;
        margin: 0;
        font-weight: 300px;
        font-size: 18px;
        text-align: center;
    }
    .add_list{
        margin-top: 10px;
        margin-left: 10px;
    }
    .first{
        // position: fixed;
        z-index: 9999;
        border: 1px solid #ccc;
        line-height:20px;
        margin-bottom: 5px;
        /deep/.el-card__body, .el-main{
            padding: 0;
        }
    }


</style>