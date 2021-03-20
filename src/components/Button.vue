<template>
  <button class="button" @click="$emit('click',$event)">
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script>

<style lang="scss" scoped>
.button {
  border: none;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }

  svg {
    width: 48px;
    height: 48px;
    color: #999999;
    background: #f5f5f5;
  }
}
</style>