

module.exports = (isDev)=>{
    return {
        preserveWhitepace:true,
        //开发环境需要，正式环境不需要
        extractCSS:!isDev,
        //将class名称替换（略）
        cssModules:{},
        //根据环境变量是否热加载
         hotReload:isDev
    }
};



