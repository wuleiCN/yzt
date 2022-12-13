<template>
  <div>
    <Company v-if="type === 0 || type === 1" />
    <Project v-else />
  </div>
</template>
<script>
import Company from './antiepidemic.vue'
import Project from './antiepidemip.vue'
export default {
  components: {
    Company,
    Project
  },
  data() {
    return {
      type: JSON.parse(sessionStorage.getItem('result')).userType
    }
  }
}
</script>
