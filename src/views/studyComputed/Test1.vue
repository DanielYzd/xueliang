<template>
  <div>
    1111
    <div>{{ pageData.name }}</div>
    <Input v-model="pageData.name" />
    <Select v-if="pageData.sex && pageData.sex.sex1" v-model="pageData.sex.sex1"></Select>
    <div>{{ sex2 }}</div>
    <Input
      v-model="sex2"
      v-bind:class="{ requireBoder: sex2Required }"
      v-if="pageData.sex && pageData.sex.sex2"
      :disabled="pageData.sex.sex2.disabled"
    />
    <DatePicker value-format="yyyy-MM-dd" v-model="pageData.date" type="date" placeholder="选择日期"></DatePicker>
    <Button type="primary" @click="changeName">改变name值</Button>
    <Input v-model="name" />
  </div>
</template>
<script>
import { Input, Select, DatePicker } from 'element-ui'
export default {
  components: {
    Input,
    Select,
    DatePicker
  },
  created() {
    setTimeout(() => {
      this.pageData = {
        name: 'daniel',
        yearsold: '18',
        sex: {
          sex1: '男',
          sex2: {
            value: '女',
            require: true,
            disabled: false
          }
        },
        date: '1991-05-14'
      }
    }, 3000)
  },
  data() {
    return {
      pageData: {},
      sex3: ''
    }
  },
  computed: {
    name() {
      return this.pageData.name
    },
    // sex2() {
    //   return this.pageData.sex && this.pageData.sex.sex2 ? this.pageData.sex.sex2 : ''
    // }
    //赋值实现双向绑定
    sex2: {
      get: function() {
        return this.pageData.sex && this.pageData.sex.sex2 && this.pageData.sex.sex2.value ? this.pageData.sex.sex2.value : ''
      },
      set: function(val) {
        this.pageData.sex.sex2.value = val
      }
    },
    sex2Required() {
      return this.pageData.sex && this.pageData.sex.sex2 ? this.pageData.sex.sex2.require : false
    }
  },
  watch: {
    sex2(newVal, oldVal) {
      console.log(newVal)
      console.log(oldVal)
      if (newVal.length > 10) {
        this.pageData.sex.sex2.disabled = true
      }
      if (newVal.length > 10) {
        this.pageData.sex.sex2.require = false
      }
    },
    //两次的值一样？？？说明监听不到具体的字段值
    pageData: {
      handler(newVal, oldVal) {
        console.log(newVal)
        console.log(oldVal)
      },
      deep: true
    },
    //深度监听对象里面的date
    'pageData.date': {
      handler(newVal, oldVal) {
        console.log(newVal)
        console.log(oldVal)
      },
      deep: true
    }
  },
  methods: {
    changeName() {
      this.pageData.name = 'hahahaha'
      console.log(this.name)
    }
  }
}
</script>
<style scoped>
.requireBoder {
  width: 150px;
  border: 1px solid red;
  display: flex;
  align-items: center;
}
.requireBoder:before {
  content: '*';
  color: red;
  margin-right: 10px;
}
.requireBoder:after {
  content: 'haha';
  color: blue;
}
</style>
