<template>
  <div class="basket">
    <h2 class="title">
      Корзина
    </h2>
    <v-data-table
      v-if="orderList && orderList.length > 0"
      :headers="headers"
      :items="orderList"
      hide-default-footer
      class="table"
    >
      <template #[`item.orderCount`]="{ item }">
        <OrderInput
          :value="item.orderCount"
          :maximum-available-quantity="item.count"
          @input="value => handlerChaneCountOrder(value, item)"
        />
      </template>
      <template #[`item.action`]="{ item }">
        <VBtn text class="text-none" @click="deleteOrder(item.id)">
          Удалить
        </VBtn>
      </template>
      <template #footer>
        <div class="text-right">
          Общая стоимость: {{ totalPrice }}
        </div>
      </template>
    </v-data-table>
    <h3 class="text-center subtitle-1">
      Корзина пуста
    </h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Basket',
  setup () {
    const store = useStore()
    const headers = reactive([
      {
        text: 'Товар',
        align: 'start',
        width: '50%',
        value: 'name'
      },
      {
        text: 'Количество',
        align: 'left',
        width: '20%',
        value: 'orderCount'
      },
      {
        text: 'Цена',
        align: 'left',
        width: '20%',
        value: 'price'
      },
      {
        text: '',
        align: 'start',
        width: '10%',
        value: 'action'
      }
    ])
    const orderList = computed(() => store.getters['basket/orderList'])
    const totalPrice = computed(() => store.getters['basket/totalPrice'])
    const deleteOrder = (id: number) => store.commit('basket/DELETE_GOOD', id)
    const handlerChaneCountOrder = (value: number, item: any) =>
      store.commit('basket/UPDATE_COUNT_GOODS', { id: item?.id, value })
    return {
      deleteOrder,
      headers,
      totalPrice,
      handlerChaneCountOrder,
      orderList
    }
  }
})
</script>

<style scoped>
.table {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
