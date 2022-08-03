<template>
  <div class="of-ergraph-group">
    <div class="ergraph-group-header">{{ entity.name }}</div>
    <ul class="ergraph-group-list">
      <li v-for="property in entity.properties"
          :key="property.propertyId">
        <div class="ergraph-group-tips">{{ property.propertyType }}</div>
        <div class="ergraph-group-text">{{ property.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import './index.scss'

export default {
  name: 'Entity',
  inject: ['getGraph', 'getNode'],
  data () {
    return {
    }
  },
  computed: {
    entity () {
      const { data = {} } = this.getNode()
      return data
    }
  },
  mounted () {
  },
  methods: {

  }
};
</script>