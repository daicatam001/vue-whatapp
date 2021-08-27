<template>
  <div class="ui-avatar">
    <img v-if="!!src" :src="src" :alt="alt" :style="imageStyle" />
    <template v-else>
      <div class="default" :style="imageStyle">
        <div class="text">{{ text }}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false
    }
  },
  computed: {
    imageStyle() {
      if (this.size) {
        return {
          width: this.size,
          height: this.size
        }
      }
      return null
    }
  }
})
</script>

<style scoped lang="scss">
img {
  width: 45px;
  height: 45px;
}
.default {
  background-color: #e5e4e8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  .text {
    font-weight: 700;
    font-size: 18px;
    color: #0078d4;
  }
}
</style>