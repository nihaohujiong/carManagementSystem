<template>
    <div>
        <div  :class="{'picgrid':true , 'done' : percent == 100}" :style="{'width':picgridW + 'px','height':picgridH + 'px','background-image':`url(${picbase64})`,'background-size':'cover','background-position':'center center'}">
            <div class="progress">
                <span :style="{'width':percent + '%'}"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : ["file"],
        data(){
            return {
                picgridW : 140,
                picgridH : 180,
                percent : 0,
                picbase64 : "",
                picbase64DONE : false
           }
        },
        created() {
            var self = this;
            //创建预览图
            var fr = new FileReader();
            fr.readAsDataURL(this.file);
            //读取预览图片的成功
            fr.onload = function(event){
                self.picbase64 = event.srcElement.result;
                self.picbase64DONE = true;
            }

            //创建虚拟表单
            var form = new FormData();
            form.append("tupian" , this.file);
            
            
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    
                }
            }
            //上传进度
            xhr.upload.onprogress = function(e){
                self.percent = (e.loaded / e.total) * 100;
            }

            xhr.open("POST" , "/api/uppic" , true);
            xhr.send(form);
        }
    }
</script>


<style scoped lang="less">
    .picgrid{
        position: relative;
        border:1px solid #eee;
        float: left;
        margin-right:10px;
        margin-bottom:10px;

        &.done::before{
            opacity: 0;
        }

        &::before{
            content:"";
            position: absolute;
            width:100%;
            height: 100%;
            background:skyblue;
            opacity: 0.8;
            transition:all 0.6s ease 0s
        }
        .progress{
            position: absolute;
            width:120px;
            height:12px;
            top:50%;
            left:50%;
            margin-top:-6px;
            margin-left:-60px;
            background:black;
            opacity: 0.8;

            span{
                display: block;
                width:30px;
                height:12px;
                background:white;
                transition:all 0.4s ease 0s;
            }
        }

        &.done .progress{
            display: none;
        }
    }
   
</style>