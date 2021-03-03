import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '~/store'
import { fetchGoodsApi, fetchGoodsCategoriesApi } from '~/api/good'
import { Good, GoodCategory } from '~/models/goods'
import { statusRequest } from '~/models/common'
import { randomInteger } from '~/utils/common'

export const state = () => ({
  goods: [] as Good[],
  rate: randomInteger(),
  loading: statusRequest.initial,
  category: {} as GoodCategory
})
export type GoodsState = ReturnType<typeof state>

export const getters: GetterTree<GoodsState, RootState> = {
  goods: state => state.goods.map(good => ({
    ...good,
    name: state.category[good.idCategory].goods[good.id].T
  })),
  loading: state => state.loading,
  goodsByCategories: state => state.goods.reduce((st, el) => {
    const idCategory = `${el.idCategory}`
    if (idCategory in st) {
      // @ts-ignore
      st[idCategory].goods.push(el)
    } else {
      // @ts-ignore
      st[idCategory] = {
        name: state.category[idCategory]?.name,
        goods: [el]
      }
    }
    return st
  }, {})
}

export const mutations: MutationTree<GoodsState> = {
  UPDATE_GOODS: (state, newGoods: Good[]) => (state.goods = newGoods.map(good => ({
    ...good,
    price: +((good.price * state.rate).toFixed(2)),
    name: state.category[good.idCategory].goods[good.id].N
  }))),
  UPDATE_RATE: (state) => { state.rate = randomInteger() },
  UPDATE_LOADING: (state, status: statusRequest) => (state.loading = status),
  UPDATE_CATEGORY: (state, newCategory: GoodCategory) => (state.category = Object.assign({}, newCategory))
}

export const actions: ActionTree<GoodsState, RootState> = {
  async fetchGoods (store): Promise<void> {
    const goods = await fetchGoodsApi()
    store.commit('UPDATE_RATE')
    store.commit('UPDATE_GOODS', goods)
  },
  async fetchData (store): Promise<void> {
    store.commit('UPDATE_LOADING', statusRequest.pending)
    try {
      const category = await fetchGoodsCategoriesApi()
      store.commit('UPDATE_CATEGORY', category)
      const goods = await fetchGoodsApi()
      store.commit('UPDATE_GOODS', goods)
      store.commit('UPDATE_LOADING', statusRequest.success)
    } catch (e) {
      store.commit('UPDATE_LOADING', statusRequest.error)
    }
  }

}

const GoodsStore: Module<GoodsState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
export default GoodsStore
