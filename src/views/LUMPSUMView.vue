<template>
  <div>
    <v-container>
      <v-row align="center">
        <v-card class="pa-10" height="1000" width="800" elevation="20">
          <v-row
            ><v-col>
              <h1>LUMPSUM</h1>
              <v-card-subtitle
                >Calculate returns for lumpsum investments to achieve your
                financial goals</v-card-subtitle>
              <h4 class="pt-5 pl-4">Inflation adjusted</h4>
              <v-switch
              v-model="switch1"
               @click="sliderSubmit"
              ></v-switch>
              <br />
              <v-card class="rounded-xl" elevation="20">
                <v-card-title>
                  <v-row>
                    <v-col>
                      <span class="text-h6 font-weight-light"
                        >Total investment</span>
                      
                      <v-text-field
                        v-model="investment" type="number" label="Number"  class="white" soloflat  background-color="blue"  @input="sliderSubmit" 
                      ></v-text-field>
                      <v-slider  max="10000000" min="1000" step="1" v-model="investment" @change="sliderSubmit"></v-slider>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-actions class="mt-n7"></v-card-actions>
              </v-card>
              <br />
              <v-card class="rounded-xl" elevation="20">
                <v-card-title>
                  <v-row>
                    <v-col>
                      <span class="text-h6 font-weight-light"
                        >Expected return rate (p.a)</span
                      >
                      <v-text-field
                        v-model="rate"   type="number" label="Number" class="white"  soloflat background-color="blue"  @input="sliderSubmit" 
                      ></v-text-field>
                      <v-slider  max="150" min="0" step="1" v-model="rate" @change="sliderSubmit"></v-slider>
                     
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-actions class="mt-n7"></v-card-actions>
              </v-card>
              <br />
              <v-card class="rounded-xl" elevation="20">
                <v-card-title>
                  <v-row>
                    <v-col>
                      <span class="text-h6 font-weight-light">time</span>
                      <v-text-field
                        v-model="time" type="number" label="Number" class="white" solo flat  background-color="blue"  @input="sliderSubmit" ></v-text-field>
                        <v-slider  max="100" min="0" step="1" v-model="time" @change="sliderSubmit"></v-slider>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-actions class="mt-n7"></v-card-actions>
              </v-card>
            </v-col>
            <v-col>
              <v-card color="white" class="rounded-xl mx-4 pa-10" flat>
                <div id="chart">
                  <div class="Chart">
                    <DoughnutExample ref="skills_chart" :chart-data="chartData">
                    </DoughnutExample>
                  </div>
                </div>
              </v-card>
              <v-card class="rounded-xl" elevation="10">
                <v-card-title>
                  <v-col>
                    <v-row class="d-flex justify-space-between pt-3">
                      <span class="text-h6 font-weight-light"
                        >Invested amount</span>
                      <span class="text-h6 font-weight-light"
                        >₹{{ investment }}</span>
                    </v-row>
                    <v-row class="d-flex justify-space-between pt-3">
                      <span class="text-h6 font-weight-light"
                        >Expected returns</span>
                      <span class="text-h6 font-weight-light"
                        >₹{{ expectedReturn }}</span>
                    </v-row>
                    <v-row class="d-flex justify-space-between pt-3 pb-6">
                      <span class="text-h6 font-weight-light">Total value</span>
                      <span class="text-h6 font-weight-light"
                        >₹{{ totalValue }}</span>
                    </v-row>
                  </v-col>
                </v-card-title>
                <v-card-actions class="mt-n7"></v-card-actions>
              </v-card> </v-col
          ></v-row>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DoughnutExample from "@/components/DoughnutExample.vue";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateRotate: false,
  }
}

export default {
  name: "sipView",
  components: { DoughnutExample },
  data: () => ({
    switch1: false,
    investment: 10000,
    rate: 12,
    time: 15,
    totalValue: 0,
    expectedReturn: 0,
    options,
    chartData: {
      labels: ["Invested amount", "Expected returns"],
      datasets: [
        {
          backgroundColor: ["blue", "red"],
          data: [5, 5],
        },
      ],
    },
  }),
  computed: {
    currentDataSet() {
      return this.chartData.datasets[0].data;
    },
  },
  mounted: function mounted() {
    this.sliderSubmit();
  },
  methods: {
    sliderSubmit() {
      if (this.switch1 === true) {
        let lumprate = (this.rate - 6) / 100;
        this.totalValue = this.investment * [Math.pow(1 + lumprate, this.time)];
        this.expectedReturn = this.totalValue - this.investment;
        this.chartData.datasets[0].data.splice(0, 1, this.investment);
        this.chartData.datasets[0].data.splice(1, 1, this.expectedReturn);
        this.$refs.skills_chart.update();
      } else {
        let lumprate = (this.rate ) / 100;
        this.totalValue = this.investment * [Math.pow(1 + lumprate, this.time)];
        this.expectedReturn = this.totalValue - this.investment;
        this.chartData.datasets[0].data.splice(0, 1, this.investment);
        this.chartData.datasets[0].data.splice(1, 1, this.expectedReturn);
        this.$refs.skills_chart.update();
      }
    },
    updateChart() {
      this.$refs.skills_chart.update();
    },
    updateAmount(amount, index) {
      this.chartData.datasets[0].data.splice(index, 1, amount);
      this.updateChart();
    },
    updateName(text, index) {
      this.chartData.labels.splice(index, 1, text);
      this.updateChart();
    },
  },
}
</script>

<style>
.text-green input {
  color: rgb(180, 18, 94) !important;
}
</style>
