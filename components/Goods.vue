<template>
  <v-expansion-panels
    v-model="panel"
    multiple
  >
    <v-col
      v-for="(value, name) in category"
      :key="name"
      lg="6"
    >
      <v-expansion-panel>
        <v-expansion-panel-header class="header pa-3">
          {{ value.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="ma-0">
          <v-row class="ma-0 table">
            <v-col
              v-for="(good) in value.goods"
              :key="good.id"
              lg="6"
              class="item pa-0"
              @click="add(good.id)"
            >
              <div>{{ good.name }}</div>
              <Price :value="good.price" />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-col>
  </v-expansion-panels>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import { mapMutations } from 'vuex'

export default defineComponent({
  name: 'Goods',
  setup () {
    const store = useStore()
    const category = computed(() => store.getters['goods/goodsByCategories'])
    // открываем все панели
    const panel = ref([...Array(Object.keys(category.value).length)].map((_, i) => i))
    return {
      panel,
      category
    }
  },
  methods: {
    ...mapMutations({
      add: 'basket/ADD_GOOD'
    })
  }
})
</script>

<style lang="scss" scoped>
.panel {
  width: 49%;
  margin-right: 1%;
  margin-bottom: 1%;
  vertical-align: top;
  display: inline-block;
}

.panels {
  display: flex;
  align-items: flex-start;
}

.table {
  border: 1px solid slategray;
  border-bottom: none;
}

.item {
  display: flex;
  cursor: pointer;
  justify-content: space-between;

  &:nth-child(2n+1) {
    border-right: 1px solid slategray;
  }

  &:nth-child(-n+2) {
    border-bottom: 1px solid slategray;
  }

  * {
    padding: 12px;
  }
}
</style>

<style lang="scss">
.v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
