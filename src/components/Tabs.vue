<template>
  <div class="tabs-wrapper">
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value" class="tabs-item" :class="liClass(item)" @click="select(item)">
      {{ item.text }}
    </li>
  </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string; value: string }

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item: DataSourceItem) {
    return {
      selected: item.value === this.value, [this.classPrefix + '-tabs-item']: this.classPrefix
    };
  }

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs-wrapper{
.tabs {
  background: #ffffff;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 28px;
  &-item {
    color: #5b6dcd;
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected{
      background: #5b6dcd;
      color: #ffffff;
    }
  }
}
}
</style>