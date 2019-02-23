<template>
    <div>
        <Row>
            <Col :span="3">
                品牌
            </Col>
            <Col :span="21">
                <Tabs value="name1">
                    <TabPane label="A" name="name1">
                        <a href="">奥迪</a>
                        <a href="">奥拓</a>
                        <a href="">阿拉丁神灯</a>
                    </TabPane>
                    <TabPane label="B" name="name2">
                        <a href="">奔驰</a>
                        <a href="">宝马</a>
                        <a href="">宾利</a>
                        <a href="">比亚迪</a>
                        <a href="">保时捷</a>
                        <a href="">宝骏</a>
                    </TabPane>
                    <TabPane label="C" name="name3">
                        <a href="">长安</a>
                    </TabPane>
                    <TabPane label="D" name="name3">标签三的内容</TabPane>
                    <TabPane label="E" name="name3">标签三的内容</TabPane>
                </Tabs>
                <div style="height:12px;"></div>
            </Col>
        </Row>
        <Row>
            <Col :span="3">
                车系
            </Col>
            <Col :span="21">
                <a href="">全部</a>
                <a href="">Q3</a>
                <a href="">Q5</a>
                <a href="">Q7</a>
                <a href="">Q8</a>
                <a href="">A3</a>
                <a href="">A4</a>
                <a href="">A5</a>
                <a href="">A6</a>
                <a href="">A8</a>
                <a href="">A8L</a>
                <a href="">TT</a>
            </Col>
        </Row>
        
        <Row v-for="item in filterControls" :key="item.english">
            <Col :span="3">
                {{item.chinese}}
            </Col>
            <Col :span="21">
                <Fuxuankuang v-if="item.type == 'Fuxuankuang'" :options="item.options" :english="item.english"></Fuxuankuang>
                <Huadongtiao v-if="item.type == 'Huadongtiao'" :english="item.english" :min="item.min" :max="item.max" :conversion="item.conversion"></Huadongtiao>
                <Riqifanwei  v-if="item.type == 'Riqifanwei'" :english="item.english"></Riqifanwei>
            </Col>
        </Row>
        <div style="height:20px;clear:both;"></div>
        <Row>
            <Col :span="24">
                <Tag closable v-for="item in filters" :key="item.k" @on-close="closeHandler(item.k)">
                    {{getK(item.k)}} ：{{getV(item.k , item.v)}}
                </Tag>
            </Col>
        </Row>
    </div>
</template>

<script>
    import moment from "moment";
    import Fuxuankuang from "./filtercontrols/Fuxuankuang";
    import Huadongtiao from "./filtercontrols/Huadongtiao";
    import Riqifanwei from "./filtercontrols/Riqifanwei";
    export default {
        computed : {
            //全局已经有的筛选条件
            filters(){
                return this.$store.state.findcarStore.filters;
            }
        },
        //数据
        data(){
            return {
                //所有的筛选控件
                filterControls : [
                    {
                        "chinese" : "颜色",
                        "english" : "color",
                        "type" : "Fuxuankuang",
                        "options" : ["红","黄","绿","蓝","黑","白","灰","银灰","咖啡"]
                    },
                    {
                        "chinese" : "发动机",
                        "english" : "engine",
                        "type" : "Fuxuankuang",
                        "options" : ["1.0L","1.2L","1.6T","2.0L","2.0T","3.0L","4.0L"]
                    },
                    {
                        "chinese" : "排放标准",
                        "english" : "exhaust",
                        "type" : "Fuxuankuang",
                        "options" : ["国一","国二","国三","国四","国五"]
                    },
                    {
                        "chinese" : "变速箱",
                        "english" : "gearbox",
                        "type" : "Fuxuankuang",
                        "options" : ["手动","自动","手自一体"]
                    },
                    {
                        "chinese" : "燃料",
                        "english" : "fuel",
                        "type" : "Fuxuankuang",
                        "options" : ["汽油","柴油","纯电动","油电混合"]
                    },
                    {
                        "chinese" : "售价（万元）",
                        "english" : "price",
                        "type" : "Huadongtiao",
                        "min" : 0,
                        "max" : 120,
                        "conversion" : 1
                    },
                    {
                        "chinese" : "公里数（万公里）",
                        "english" : "km",
                        "type" : "Huadongtiao",
                        "min" : 0,
                        "max" : 2000000,        //真值
                        "conversion" : 10000    //将10000当做1
                    },
                    {
                        "chinese" : "购买日期",
                        "english" : "buydate",
                        "type" : "Riqifanwei"
                    }
                ]
            }
        },
        //组件
        components : {
            Fuxuankuang,
            Huadongtiao,
            Riqifanwei
        },
        methods : {
            //英语名字换中文
            getK(k){
                return this.filterControls.filter(item=>item.english == k)[0].chinese;
            },
            //规整一下v
            getV(k , v){
                //看类型
                var type = this.filterControls.filter(item=>item.english == k)[0].type;

                //区别
                if(type == "Fuxuankuang"){
                    return v.replace(/v/g , " 或 ");
                }else if(type == "Riqifanwei"){
                    return v.split("to").map(item=>{
                        return moment(Number(item)).format("YYYY年MM月DD日");
                    }).join(" 到 ");
                }
                //几个特例
                if(k == "price"){
                    return v.split("to").map(item=>item + "万元").join(" 到 ");
                }else if(k == "km"){
                    return v.split("to").map(item=>item / 10000 + "万公里").join(" 到 ");
                }
            },
            closeHandler(k){
                this.$store.dispatch("findcarStore/delFilter", {k})
            }
        }
    }
</script>

<style scoped lang="less">
    .ivu-row{
        height:30px;
    }
    a{
        line-height: 30px;
        margin-right:10px;
    }
</style>