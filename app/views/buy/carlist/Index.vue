<template>
    <div>
        <MyFilterBox></MyFilterBox>
        <div style="height:10px;clear:both;"></div>
        <MyTable></MyTable>

      
        <CompareBtn></CompareBtn>
    </div>
</template>

<script>
    import MyTable from "./MyTable";
    import MyFilterBox from "./MyFilterBox";
    import CompareBtn from "../../../components/CompareBtn";
    
    export default {
      
        //组件创建之前
        beforeCreate() {
            this.$store.dispatch("findcarStore/fetchCar");
        },
        components : {
            MyTable,
            MyFilterBox,
            CompareBtn
        }
    }
</script>

<style scoped>

</style>