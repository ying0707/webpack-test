/**
 * 配置规则
 * path: 匹配路径
 * component: 匹配组件
 * indexRoute: 重定向 MatchCell
 * rediret: 重定向匹配路径
 * state: Location状态   注: 按需要内部可以添加任意多个值对
 * mark:  是否写入到浏览历史中 注: 此浏览记录只服务于业务并非bowserHistory
 * childRoutes: 子路由
 *checkAuthority: 需不需要做用户认证  默认为  true
 *
 export const routerConfig = [{
  path: '/',
  component: 'App',
  indexRoute: {
    redirect: '/cart',
    state: {
      mark: '首页',
      checkAuthority: false
    }
  },
  childRoutes: [{
    path: '/tacos',
    component: "Tacos",
    childRoutes: [{
      path: '/tacos/bus',
      component: 'Bus'
    }, {
      path: '/tacos/cart',
      component: 'Cart'
    }]
  }, {
    path: '/sandwiches',
    component: 'Sandwiches'
  }, {
    path: '/cart',
    component: "Cart",
    state: {
      mark: '首页'
    }
  }]
}]
 */

export const routerConfig = {
  routes: [
    {
      path: '/',
      component: 'App',
      indexRoute: { redirect: '/themis-home' },
      childRoutes: [
        {
          path: '/worker-manager',
          component: 'workerManager',
          state: {
            mark: '0',
          },
        }, {
          path: '/',
          component: 'testc',
          // childRoutes: [
          //   {
          //     path: '/worker-manager1',
          //     component: 'workerManager2',
          //     childRoutes: [
          //       {
          //         path: '/worker-manager3',
          //         component: 'workerManager',
          //       },
          //       {
          //         path: '/worker-manager4',
          //         component: 'workerManager1',
          //       },
          //     ],
          //   }, {
          //     path: '/worker-manager2',
          //     component: 'workerManager2',

          //   },
          // ],
        },
      ],
    },
    {
      path: '*',
      component: 'exception/404',
      state: {
        checkAuthority: false,
      },
    },
  ],
  initializationTabs: [
    {
      pathname: '/worker-manager',
      state: {
        mark: '0',
      },
    },
  ],
};
