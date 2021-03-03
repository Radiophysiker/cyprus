<template>
  <div class="wrapper">
    <v-text-field
      v-model="input"
      size="small"
      height="40px"
      type="number"
      counter="number"
      min="1"
      max="maximumAvailableQuantity"
      solo
      hide-details
      class="input"
    />
    <div v-if="errorMessage" class="error--text">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script >

import { getErrorCountOrder } from '~/utils/common'

export default {
  name: 'OrderInput',
  props: {
    maximumAvailableQuantity: {
      type: Number,
      default: () => -1
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      errorMessage: ''
    }
  },
  computed: {
    input: {
      get () {
        return this.value
      },
      set (value) {
        this.errorMessage = getErrorCountOrder(+value, this.maximumAvailableQuantity)
        if (!this.errorMessage) {
          this.$emit('input', +value)
        }
      }
    }
  },
  watch: {
    value () {
      this.errorMessage = getErrorCountOrder(this.value, this.maximumAvailableQuantity)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 80px;
  text-align: left;
  padding-top: 16px;
  position: relative;
}

.input {
  max-width: 84px;
  display: inline-block;
  text-align: center;
}

.error--text {
  color: crimson;
  font-size: 12px;
  position: absolute;
  left: 0;
  right: 0;
}
</style>

<style lang="scss">
.input {
  input {
    text-align: center;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
</style>
