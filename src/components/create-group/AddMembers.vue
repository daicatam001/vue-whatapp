<template>
  <div class="add-members">
    <PanelTitle :title="$t('addMembers')" @back="closeAddMembers" />
    <div class="members-block">
      <div class="user-tag-list">
        <UserTag
          :title="member.first_name"
          v-for="member of addingMembers"
          :key="member.id"
          @remove="removeMember(member.id)"
        />
      </div>
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
        <template v-if="!!phoneBookAlphabet.length">
          <div v-for="phoneBook of phoneBookAlphabet" :key="phoneBook.id">
            <HeadingCard
              v-if="phoneBook.type === CHAT_CARD_TYPE.HEADING"
              :title="phoneBook.title"
            />
            <PhoneBookCard
              @click="addMember(phoneBook)"
              v-else-if="phoneBook.type === CHAT_CARD_TYPE.PHONE_BOOK"
              :first_name="phoneBook.first_name"
              :custom_json="phoneBook.custom_json"
            />
          </div>
        </template>
        <div v-else class="no-found-contact">
          {{ $t('noFoundContact') }}
        </div>
      </div>
    </div>
    <div class="action-wrapper">
      <button class="next" v-if="!!addingMembers.length" @click="toCreateGroup">
        <ArrowForward />
      </button>
    </div>
  </div>
</template>

<script>
import { CHAT_CARD_TYPE } from '@/core/constants'
export default {
  computed: {
    phoneBookAlphabet() {
      return this.$store.getters['phoneBook/phoneBookAlphabet']
    },
    addingMembers() {
      return this.$store.getters['phoneBook/addingMembers']
    }
  },
  data() {
    return {
      CHAT_CARD_TYPE: CHAT_CARD_TYPE,
      text: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.input.focus()
    })
  },
  methods: {
    addMember(member) {
      this.$store.dispatch('phoneBook/insertAddingMember', member)
      this.text = ''
      this.$store.dispatch('phoneBook/setQuery', '')
      this.$refs.input.focus()
    },
    removeMember(memberId) {
      this.$store.dispatch('phoneBook/removeAddingMember', memberId)
    },
    closeAddMembers() {
      this.text = ''
      this.$store.dispatch('phoneBook/offAddMembers')
      this.$store.dispatch('ui/toggleShowAddMembers', false)
    },
    toCreateGroup() {
      this.$store.dispatch('ui/toggleShowAddMembers', false)
      this.$store.dispatch('ui/toggleShowCreateGroup', true)
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

.members-block {
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
  background-color: #fff;
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
.user-tag-list {
  .user-tag {
    margin-right: 6px;
    margin-bottom: 6px;
  }
}
.no-found-contact {
  padding: 72px 50px;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
}
.action-wrapper {
  padding-bottom: 32px;
  margin-top: 28px;
  text-align: center;
}
button.next {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  transition: box-shadow 0.08s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  background-color: #09e85e;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  border: 0;
  outline: 0;
}
</style>
<style>
.phone-book-list .phone-book-inner {
  border-top: 1px solid #f2f2f2;
}
</style>