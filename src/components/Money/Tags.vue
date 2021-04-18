<template>
  <div class="tags">
    <div class="new">
        <router-link class="editTag"  :to="`/labels`">
          <Icon name="edit"/>
        </router-link>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)" :class="{selected:selectedTags.indexOf(tag)>=0}">
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {TagHelper} from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      line-height: $h;
      height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;

      &.selected {
        background: #5b6dcd;
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    >.editTag {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      width: 26px;
      height: 26px;
      background: #5b6dcd;
      color: white;
      svg{
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>