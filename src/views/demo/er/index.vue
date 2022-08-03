<template>
  <div class="demo-wrapper">
    <ERGraph :data="graphData"
             :option="graphOption"></ERGraph>
  </div>
</template>

<script>
import ERGraph from './ERGraph'
import { getGraphData } from '@/api/graph'

export default {
  name: 'DemoER',
  components: {
    ERGraph
  },
  data () {
    return {
      graphData: {},
      graphOption: {}
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const res = await getGraphData()
      const { mockEntityData: nodes, mockRelationData: edges } = res
      this.graphData = { nodes, edges }
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-wrapper {
  width: 100%;
  height: 100%;
}
</style>