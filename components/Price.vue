<template>
  <div :class="['price', currentClass]">
    {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from '@nuxtjs/composition-api'
enum ICurrentClass {
  increase = 'increase',
  decrease = 'decrease',
  initial = 'initial'
}
export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const { value } = toRefs(props)
    const currentClass = ref<ICurrentClass>(ICurrentClass.initial)
    watch(value, (newValue, oldValue) => {
      if (newValue > oldValue) {
        currentClass.value = ICurrentClass.increase
      } else if (newValue < oldValue) {
        currentClass.value = ICurrentClass.decrease
      } else {
        currentClass.value = ICurrentClass.initial
      }
    })
    return {
      currentClass
    }
  }
})
</script>

<style scoped>
.price {
  flex: 0 0 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid slategray;
}

.increase {
  background: lightcoral;
}

.decrease {
  background: chartreuse;
}
</style>
