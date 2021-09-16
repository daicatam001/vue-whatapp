<template>
  <div class="create-group">
    <PanelTitle :title="$t('newGroup')" @back="backToAddMembers" />
  </div>
  
</template>

<script>
export default {
  methods: {
    backToAddMembers() {
      this.$store.dispatch('ui/toggleShowCreateGroup', false)
      this.$store.dispatch('ui/toggleShowAddMembers', true)
    }
  }
}
</script>

<style>
</style>