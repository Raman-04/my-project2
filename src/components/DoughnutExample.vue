<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props:['chartData'],
  methods: {
    update() {
      this.$data._chart.update()
    }
  },
  mounted () {
    this.renderChart(this.chartData)
  }
};
</script>