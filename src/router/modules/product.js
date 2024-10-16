import Layout from '@/layout'

const ProductRouter = {
  path: '/product',
  component: Layout,
  redirect: '/product/dztzMonitor',
  name: 'Product',
  meta: {
    title: '设备',
    icon: 'table'
  },
  children: [
    {
      path: 'dztzMonitor',
      component: () => import('@/views/product/dztzMonitor'),
      name: 'dztzMonitor',
      meta: { title: 'dztzMonitor' }
    },
    {
      path: 'cschyMonitor',
      component: () => import('@/views/product/dztzMonitor'),
      name: 'cschyMonitor',
      meta: { title: 'cschyMonitor' }
    }
  ]
}
export default ProductRouter
