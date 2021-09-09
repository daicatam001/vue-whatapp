<template>
  <RadioGroup v-model:value="value" @change="onChange">
    <Radio
      :style="radioStyle"
      :value="op.value"
      v-for="op of options"
      :key="op.value"
      >{{ op.label }}</Radio
    >
  </RadioGroup>
</template>

<script>
import { Radio, RadioGroup } from 'ant-design-vue'

export default {
  components: {
    Radio,
    RadioGroup
  },
  props: ['change', 'options', 'init'],
  data() {
    return {
      value: this.init,
      radioStyle: { display: 'block', height: '30px', lineHeight: '30px' }
    }
  },
  methods: {
    onChange(e) {
      this.change(e)
    }
  }
}
</script>

<style>
</style>