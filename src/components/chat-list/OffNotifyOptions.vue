<template>
  <RadioGroup v-model:value="value" @change="onChange">
    <Radio :style="radioStyle" :value="1">Option A</Radio>
    <Radio :style="radioStyle" :value="2">Option A</Radio>
    <Radio :style="radioStyle" :value="3">Option A</Radio>
  </RadioGroup>
</template>

<script>
import { Radio, RadioGroup } from 'ant-design-vue'

export default {
  components: {
    Radio,
    RadioGroup
  },
  data() {
    return {
      value: 1,
      radioStyle: { display: 'block', height: '30px', lineHeight: '30px' }
    }
  },
  methods: {
    onChange(e) {
      console.log(this.value)
    }
  }
}
</script>

<style>
</style>