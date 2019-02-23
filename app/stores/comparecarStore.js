export default {
    namespaced: true,
    state: {
        //当前正在加入对比的车
        arr : []
    },
    mutations: {
        addCar(state , {carinfo}){
            state.arr.push(carinfo);
        },
        delCar(state , {id}){
            state.arr = state.arr.filter(item=>item.id != id);
        }
    } 
}