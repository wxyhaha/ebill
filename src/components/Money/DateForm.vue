<template>
  <div class="wrapper">
    <input :type="type || 'text'" :value="dayFormat(value)" @input="onValueChanged($event.target.value)" >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class DateForm extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop() type?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
  dayFormat(isoString: string){
    return  dayjs(isoString).format('YYYY-MM-DD')
  }
}
</script>

<style lang="scss" scoped>
input{
  height: 40px;
  width: 135px;
  background-color:#EBECF0;
  border-radius: 16*20px;
  border:none;
  box-shadow:  inset 2px 2px 5px #BABECC, inset -5px -5px 10px #fff;
}
</style>