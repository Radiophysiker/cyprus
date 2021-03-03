<template>
  <v-row>
    <v-col cols="12">
      <LoadingPage
        v-if="loading < 2"
      />
      <template v-if="loading === 2">
        <Goods />
        <Basket />
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">

import {
  defineComponent,
  computed,
  useStore,
  onBeforeUnmount
} from '@nuxtjs/composition-api'

export interface Welcome {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  name: 'MainPage',
  setup () {
    const store = useStore()
    let timerId: ReturnType<typeof setInterval>
    // при создании страницы получаем данные
    store.dispatch('goods/fetchData').then(() => {
      // после первоначального получения данных перезапрашиваем товары
      timerId = setInterval(() => store.dispatch('goods/fetchGoods'), 15000)
    })
    onBeforeUnmount(() => {
      // очищаем setInterval
      clearInterval(timerId)
    })
    const loading = computed(() => store.getters['goods/loading'])
    const orderList = computed(() => store.getters['basket/orderList'])
    return {
      orderList,
      loading
    }
  }
})
</script>
