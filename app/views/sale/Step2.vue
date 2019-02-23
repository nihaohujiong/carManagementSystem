<template>
    <div>
        <input type="file" ref="file" @change="changeHandler" hidden multiple>
        <Button @click="choosePic">按我选择图片</Button>
        
        <div style="height:10px;"></div>

        <div class="uppicbox" ref="uppicbox">
            <Picgrid v-for="(item,index) in files" :file="item" :key="index"></Picgrid>
        </div>
    </div>
</template>

<script>
    import Picgrid from "./Picgrid";
    export default {
        data(){
            return {
                //待上传的所有的图片的数组
                files : []
            }
        },
        mounted() {
            this.$refs.uppicbox.addEventListener("dragenter", function(e){ 
                e.preventDefault(); 
            }, false);  

            this.$refs.uppicbox.addEventListener("dragover", function(e){ 
                e.preventDefault(); 
            }, false); 


            var self = this;
            this.$refs.uppicbox.addEventListener("drop", function(e){ 
                e.preventDefault(); 
                self.files.push(...e.dataTransfer.files)
                
            }, false);

            $(this.$refs.uppicbox).sortable();
          
        },
        methods : {
            //当input框改变的时候做的事情
            changeHandler(){
                var files = this.$refs.file.files;
                //往数组中push一项file文件
                for(let i = 0 ; i < files.length ; i++){
                    this.files.push(files[i]);
                }
            },
            //点击选择图片按钮做的事情
            choosePic(){
                //模拟触发inputtype=file框的点击事件
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click",false,false);
                this.$refs.file.dispatchEvent(evt);
            },
            dropHandler(){
                alert(1);
            }
        },
        components : {
            Picgrid
        }
    }
</script>

<style lang="less">
    .uppicbox{
        min-height:120px;
        border:1px dotted #333;
        overflow: hidden;
        padding:10px;
        padding-bottom:0;

        .uppicbox.draging{
            border-color:red;
        }
    }
</style>