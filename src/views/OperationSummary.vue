<template>
  <div class="operation">
    <div class="top">
      <div class="left">
        <Card>
          <div slot="header">
            <span>本月故障恢复率</span>
          </div>
          <Recovery></Recovery>
        </Card>
      </div>
      <div class="middle">
        <Card>
          <div slot="header">
            <span>在线率</span>
          </div>
          <Onrate></Onrate>
        </Card>
      </div>
      <div class="right">
        <Card>
          <div slot="header">
            <span>告警类型占比</span>
          </div>
          <div></div>
        </Card>
      </div>
    </div>
    <div class="bottom">
      <Card>
        <div slot="header">
          <span>本月运维人员KPI考核</span>
        </div>
        <Table :dataSource="tableData" :options="options" :columns="columns"></Table>
      </Card>
    </div>
  </div>
</template>

<script>
import { Card } from 'element-ui'
import Recovery from '../components/OperationSummary/Recovery'
import Onrate from '../components/OperationSummary/Onrate'
import Table from '../components/Common/Table'
export default {
  components: {
    Card,
    Recovery,
    Onrate,
    Table
  },
  data() {
    return {
      tableData: [
        { ry: 'A', fs: '+5', zb: '85%', jsl: '90%', zgds: '20', wcgds: '18', hfl: '17' },
        { ry: 'B', fs: '+5', zb: '57%', jsl: '65%', zgds: '20', wcgds: '18', hfl: '17' },
        { ry: 'C', fs: '+5', zb: '48%', jsl: '61%', zgds: '20', wcgds: '18', hfl: '17' },
        { ry: 'D', fs: '+5', zb: '56%', jsl: '56%', zgds: '20', wcgds: '18', hfl: '17' },
        { ry: 'E', fs: '+5', zb: '75%', jsl: '96%', zgds: '20', wcgds: '18', hfl: '17' },
        { ry: 'F', fs: '+5', zb: '87%', jsl: '100%', zgds: '20', wcgds: '18', hfl: '17' }
      ],
      options: {
        loading: true
      },
      columns: [
        { prop: 'ry', label: '人员' },
        { prop: 'fs', label: '本月KPI分数' },
        { prop: 'zb', label: '工单故障恢复占比' },
        { prop: 'jsl', label: '工单完成及时率' },
        { prop: 'zgds', label: '总工单数' },
        { prop: 'wcgds', label: '及时完成工单数' },
        { prop: 'hfl', label: '故障恢复数' }
      ]
    }
  },
  created() {
    setTimeout(() => {
      this.options.loading = false
    }, 3000)
  }
}
</script>
<style lang="less" scoped>
.operation {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  .el-card {
    height: 100%;
    /deep/ .el-card__body {
      // padding: 0px;
      box-sizing: border-box;
      height: calc(100% - 60px);
    }
  }
  .top {
    flex: 1;
    display: flex;

    .left {
      flex: 1.5;
      margin-right: 10px;
    }
    .middle {
      flex: 1;
      margin-right: 10px;
    }
    .right {
      flex: 1.5;
    }
  }
  .bottom {
    margin-top: 10px;
    flex: 1.3;
  }
}
</style>
