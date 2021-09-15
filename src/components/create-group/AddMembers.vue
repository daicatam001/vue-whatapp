<template>
  <div class="add-members">
    <PanelTitle :title="$t('addMembers')" @back="closeAddMembers" />
    <div class="input-members">
      <div class="input-wrapper">
        <input
          type="text"
          :placeholder="$t('inputContact')"
          v-model.trim="text"
          @input="doSearch"
          ref="input"
        />
      </div>
    </div>
    <div class="phone-book-wrapper">
      <div class="phone-book-list scroll-element">
        <div v-for="phonebook of phoneBookAlphabet" :key="phonebook.id">
          <HeadingCard
            v-if="phonebook.type === CHAT_CARD_TYPE.HEADING"
            :title="phonebook.title"
          />
          <PhoneBookCard
            v-else-if="phonebook.type === CHAT_CARD_TYPE.PHONE_BOOK"
            :first_name="phonebook.first_name"
            :custom_json="phonebook.custom_json"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CHAT_CARD_TYPE } from '@/core/constants'
export default {
  computed: {
    phoneBookAlphabet() {
      return this.$store.getters['phoneBook/phoneBookAlphabet']
    }
  },
  data() {
    return {
      CHAT_CARD_TYPE: CHAT_CARD_TYPE,
      text: ''
    }
  },
  mounted(){
    setTimeout(()=>{
      this.$refs.input.focus()
    })
  },
  methods: {
    closeAddMembers() {
      this.$store.dispatch('phoneBook/setQuery', '')
      this.$store.dispatch('ui/toggleShowAddMembers', false)
    },
    doSearch() {
      this.$store.dispatch('phoneBook/setQuery', this.text)
    }
  }
}
</script>

<style scoped lang="scss">
.add-members {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.input-members {
  padding-left: 34px;
  padding-top: 26px;
  padding-bottom: 12px;
  margin: 0 !important;
  background-color: white;
  .input-wrapper {
    border-bottom: 1px solid #d9d9d9;
    padding-top: 5px;
    input {
      width: 100%;
      border: 0;
      outline: 0;
      padding: 2px 0;
    }
  }
}
.phone-book-wrapper {
  flex-grow: 1;
  position: relative;
  .phone-book-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
<style>
.phone-book-list .phone-book-inner {
  border-top: 1px solid #f2f2f2;
}
</style>