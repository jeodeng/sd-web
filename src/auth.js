import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'
import storage from '@/utils/storage'

router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  const user = storage.get('user');

  if (hasToken && user) {
    await store.dispatch('userInfoGet', hasToken);
    if (to.path === '/register') next('/home');
  } else {
    /* has no token*/
    store.dispatch('userInfoReset');

    // if (whiteList.indexOf(to.path) !== -1) {
    //   next()
    // } else {
    //   next(`/login?redirect=${to.path}`)
    // }
  }

  next();
})
