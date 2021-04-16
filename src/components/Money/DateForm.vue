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
input[type=date]::-webkit-datetime-edit-text {
  -webkit-appearance: none;
  display: none;
}
input[type=date]::-webkit-datetime-edit-month-field{
  -webkit-appearance: none;
  display: none;
}
input[type=date]::-webkit-datetime-edit-day-field {
  -webkit-appearance: none;
  display: none;
}
input[type=date]::-webkit-datetime-edit-year-field {
  -webkit-appearance: none;
  display: none;
}
input{
  width: 50px;
  border:none;
  background: #f5f5f5;
}
</style>