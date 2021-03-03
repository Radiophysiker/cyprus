import { GetterTree, Module, MutationTree } from 'vuex'
import Vue from 'vue'
import { Good, Orders } from '~/models/goods'
import { RootState } from '~/store'
export const state = () => ({
  orders: {} as Orders
})
export type BasketState = ReturnType<typeof state>

export const getters: GetterTree<BasketState, RootState> = {
  orders: state => state.orders,
  orderList: (_, getters, rootState) => {
    const orders = getters.orders
    return (Object.keys(orders)).map((id) => {
      return {
        // @ts-ignore
        ...(rootState?.goods?.goods.find((good: Good) => `${good.id}` === id)),
        orderCount: orders[id]
      }
    })
  },
  totalPrice: (_, getters) => {
    return getters.orderList.reduce((st: number, el: any) => st + el.orderCount * el.price, 0).toFixed(2)
  }
}
export const mutations: MutationTree<BasketState> = {
  ADD_GOOD: (state, id: number) => {
    if (id in state.orders) {
      state.orders[id]++
    } else {
      state.orders = Object.assign({}, { ...state.orders, [id]: 1 })
    }
  },
  UPDATE_COUNT_GOODS: (state, payload) => {
    const { id, value } = payload
    state.orders[id] = value
  },
  DELETE_GOOD: (state, id: number) => {
    Vue.delete(state.orders, id)
  }
}

const BasketStore: Module<BasketState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations
}
export default BasketStore
