<template>
  <div class="home">
    <router-link to="/operation-summary">
      <Button type="primary">运维汇总</Button>
    </router-link>
  </div>
</template>

<script>
import { Button } from 'element-ui'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Button
  }
}
</script>
