<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <div class="wrapper">
      <div class="createAt">
        <DateForm type="date" :value.sync="record.createAt"/>
      </div>
      <div class="notes">
        <FormItem field-name="备注" placeholder="点击输入备注..." :value.sync="record.notes"/>
      </div>
    </div>
    <Tags @update:value="record.tags=$event"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import DateForm from '@/components/Money/DateForm.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';


@Component({
  components: {DateForm, Tabs, Tags, FormItem, NumberPad}
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0, createAt: new Date().toISOString()
  };

  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    this.record.notes = '';
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.wrapper{
  display: flex;

  >.notes {
    padding: 12px 0;
    width:400px;
  }

  >.createAt {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 4px;
}
}
</style>
