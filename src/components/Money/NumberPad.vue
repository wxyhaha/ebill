<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = '0';

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    if (this.output.length === 16) {return;}
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {return;}
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    if (this.output === '0') {
      return;
    } else {
      const number = parseFloat(this.output);
      this.$emit('update:value', number);
      this.$emit('submit', number);
      this.output = '0';
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }

  .buttons {
    @extend %clearFix;
    background-color: #d9d9df;

    > button {
      font-size: 18px;
      width: 20%;
      height: 64px;
      float: left;
      border: none;
      border-radius: 18px;
      text-shadow: 2px 2px 3px rgba(0, 0, 0, .2);
      box-shadow: -6px -6px 26px rgba(255, 255, 255, .83),
      5px 10px 15px rgba(0, 0, 0, .05),
      15px 20px 35px rgba(0, 0, 0, .1),
      inset -2px -2px 2px rgba(0, 0, 0, .1),
      inset -1px -1px 3px rgba(255, 255, 255, .6),
      inset 2px 2px 8px rgba(255, 255, 255, .2),
      inset 1px 1px 8px rgba(255, 255, 255, .2),
      -6px -6px 26px rgba(255, 255, 255, .8);
      background-color: #e9e9ef;
      margin: 0 2.5%;
      margin-top: 2.5%;
      top: 45%;
      left: 0;
      right: 0;
      border: 0;
      transition: 300ms ease-out;
      cursor: pointer;
        &:active, &:focus {
          box-shadow: inset 2px 2px 16px rgba(255,255,255,.9), inset 8px 8px 9px rgba(0,0,0,.2), 5px 10px 5px rgba(0,0,0,.03), -5px -5px 25px rgba(255,255,255,.1), -2px -2px 9px rgba(100,100,100,.1), inset -2px -2px 9px rgba(255,255,255,1);
          outline: none;
          background-color: #e5e5ef;
          text-shadow: -2px -2px 3px rgba(0,0,0,.2), 2px 2px 3px rgba(255,255,255,1);
          transform: translateY(3px);
        }

      &.ok {
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 45%;
      }


    }
  }
}

</style>