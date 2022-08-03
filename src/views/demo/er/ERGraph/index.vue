<template>
  <div ref="ergraphWrapper"
       class="of-ergraph">
    <div id="ergraph-container"
         class="ergraph-container"></div>
    <div id="ergraph-minimap"
         class="ergraph-minimap"></div>
  </div>
</template>

<script>
import './index.scss'
import { Graph } from '@antv/x6'
import '@antv/x6-vue-shape'
import Entity from './entity'

export default {
  name: 'ERGraph',
  components: {},
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    option: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      graph: null,
      defaultConfig: {
        width: 100,
        height: 100,
        /** 无限画布设置 */
        scroller: {
          enabled: true,
          pageVisible: false,
          pageBreak: false,
          pannable: true
        },
        /** 画布网格 */
        grid: {
          visible: true,
          size: 20,
          type: 'dot',
          args: [
            {
              color: '#888'
            }
          ]
        },
        /** 全局连线配置 */
        connecting: {
          connector: {
            name: 'rounded'
          },
          router: {
            name: 'er',
            args: {
              direction: 'H'
            }
          }
        },
        /** 对齐线 */
        snapline: {
          enabled: true
        },
        /** 滚轮缩放 */
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: false,
          factor: 1.1,
        },
        keyboard: {
          enabled: true
        },
        clipboard: {
          enabled: true
        }
      }
    }
  },
  watch: {
    data: {
      handler (n) {
        this.updateGraph(n)
      },
      deep: true
    }
  },
  beforeMount () {
    this.resizeGraph()
    window.addEventListener('resize', this.resizeGraph)
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const container = document.getElementById('ergraph-container')
      const minimap = document.getElementById('ergraph-minimap')

      this.graph = new Graph({
        container,
        minimap: {
          enabled: true,
          container: minimap,
          minScale: 0.5,
          maxScale: 2
        },
        ...this.defaultConfig,
        ...this.option
      })
      this.resizeGraph()
      this.updateGraph(this.data)
    },
    resizeGraph () {
      const wrapper = this.$refs.ergraphWrapper
      if (wrapper) {
        const { clientWidth, clientHeight } = wrapper
        if (this.graph) {
          this.graph.resize(clientWidth, clientHeight)
        }
      }
    },
    updateGraph (data) {
      const cells = []
      const { nodes = [], edges = [] } = data
      nodes.map(entity => {
        const { entityId, x, y, width, height } = entity
        const node = {
          x,
          y,
          width,
          height,
          id: entityId,
          shape: 'vue-shape',
          component: {
            template: `<Entity></Entity>`,
            components: {
              Entity
            }
          },
          data: entity
        }
        cells.push(this.graph.createNode(node))
      })
      edges.map(relation => {
        const { relationId, sourceEntityId, targetEntityId } = relation
        const edge = {
          id: relationId,
          source: sourceEntityId,
          target: targetEntityId,
          label: relationId,
          data: relation
        }
        cells.push(this.graph.createEdge(edge))
      })
      this.graph.resetCells(cells)
    }
  }
}
</script>
