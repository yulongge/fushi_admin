/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'dztzData',
      component: () => import('@/views/analysis/dztz'),
      name: 'DztzData',
      meta: { title: 'dztzData', noCache: true }
    },
    {
      path: 'ybcszData',
      component: () => import('@/views/analysis/ybcsz'),
      name: 'YbcszData',
      meta: { title: 'ybcszData', noCache: true }
    },
    {
      path: 'cschyData',
      component: () => import('@/views/analysis/cschy'),
      name: 'CschyData',
      meta: { title: 'cschyData', noCache: true }
    },
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'keyboardChart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: 'lineChart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'mixChart', noCache: true }
    }
  ]
}

export default chartsRouter
