<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">
        <Icon name="delete"></Icon>
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">
        <Icon name="clear"></Icon>
      </button>
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
    if (this.output === '0' || this.output === '0.') {
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
$color-white: #FFF;
.numberPad {
  .output {
    @extend %clearFix;
    border: 0;
    outline: 0;
    border-radius: 16*20px;
    padding: 9px 16px;
    background-color:#EBECF0;
    text-shadow: 1px 1px 0 $color-white;
    font-size: 36px;
    font-family: Consolas, monospace;
    text-align: right;
    height: 72px;
    margin-right: 8px;
    box-shadow:  inset 2px 2px 5px #BABECC, inset -5px -5px 10px $color-white;
    width: 100%;
  }

  .buttons {
    @extend %clearFix;
    background: #f5f5f5;

    > button {
      font-size: 18px;
      background: #f3f0f1;
      width: 20%;
      height: 64px;
      float: left;
      border-radius: 32px;
      box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8), 6px 6px 10px rgba(0, 0, 0, 0.2);
      margin: 8px 2.5%;
      top: 45%;
      left: 0;
      right: 0;
      border: 0;
      transition: 300ms ease-out;
      cursor: pointer;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      &:active {
        box-shadow: inset 2px 2px 16px rgba(255,255,255,.9),
        inset 8px 8px 9px rgba(0,0,0,.2), 5px 10px 5px rgba(0,0,0,.03),
        -5px -5px 25px rgba(255,255,255,.1), -2px -2px 9px rgba(100,100,100,.1),
        inset -2px -2px 9px rgba(255,255,255,1);
        outline: none;
        background-color: #e5e5ef;
        text-shadow: -2px -2px 3px rgba(0,0,0,.2), 2px 2px 3px rgba(255,255,255,1);
        transform: translateY(3px);
      }
      &.ok {
        height: 64*2+16px;
        float: right;
      }

      &.zero {
        width: 45%;
      }
      > svg{
        height: 24px;
        width: 24px;
      }
    }
  }
}

</style>