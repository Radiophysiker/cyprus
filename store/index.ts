import { ActionTree, GetterTree, ModuleTree, MutationTree, Store } from 'vuex'
import { InjectionKey, useStore as baseUseStore } from '@nuxtjs/composition-api'
import basket from '~/store/basket'
import goods from '~/store/goods'
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const state = () => ({})

export type RootState = ReturnType<typeof state>
export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}

export const modules: ModuleTree<RootState> = {
  basket,
  goods
}

export const store = new Store({
  strict: false,
  state,
  getters,
  mutations,
  actions,
  modules
})
