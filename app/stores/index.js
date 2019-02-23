import routerStore from "./routerStore";
import carpicStore from "./carpicStore";
import findcarStore from "./findcarStore";
import comparecarStore from "./comparecarStore";
import saleStore from "./saleStore";
import meStore from "./meStore";

export default {
    modules : {
        //路由的store
        routerStore,
        //图集的store
        carpicStore,
        //车辆大表的store
        findcarStore,
        //对比车辆的store
        comparecarStore,
        //卖车的store
        saleStore,
        //登录人的store
        meStore
    }
}