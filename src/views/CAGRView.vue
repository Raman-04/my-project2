<template>
  <div >
    <v-container >
      <v-row
      align="center">
      <v-card
      class="pa-10"
      height="1200"
      width="800"
      elevation="10"
      >
      <v-row><v-col >
        <br>
  <v-card class="rounded-xl"   elevation="10">
                <v-card-title>
                  <v-row>
                    <v-col>
                       <span class="text-h6 font-weight-light">Current Value</span>
                      <v-text-field v-model="investedAmount" type="number" label="Number"  class="text-green pt-3" solo flat background-color="blue" @input="sliderSubmit" ></v-text-field> 
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-actions class="mt-n7"></v-card-actions>
              </v-card>
              <br>
              <v-card class="rounded-xl "   elevation="10">
                <v-card-title>
                  
                  <v-row>
                    <v-col>
                      <span class="text-h6 font-weight-light">TotalReturns</span>
                      <v-text-field v-model="TotalReturns" type="number" label="Number"  class="text-green pt-3" solo flat background-color="blue"  @input="sliderSubmit" ></v-text-field>     
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-actions class="mt-n7"></v-card-actions>
              </v-card>
              <br>
              <v-card class="rounded-xl"   elevation="10">
                <v-card-title>
                  <v-row>
                    <v-col>
                      <span class="text-h6 font-weight-light ">Time period(years)</span>
                      <v-text-field v-model="timePeriod" type="number" label="Number"  class="text-green pt-3" solo flat background-color="blue"   @input="sliderSubmit" ></v-text-field>       
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
      <DoughnutExample
        ref="skills_chart"
        :chart-data="chartData">
      </DoughnutExample>
    </div>
  </div>
                </v-card>
        <v-card class="rounded-xl"   elevation="10">
                <v-card-title>
                 <v-col>
                   <v-row class="d-flex justify-space-between pt-3">
                    <span class="text-h6 font-weight-light ">Invested Amount</span>
                    <span class="text-h6 font-weight-light ">₹{{investedAmount}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pt-3">
                    <span class="text-h6 font-weight-light ">Return Earned</span>
                    <span class="text-h6 font-weight-light ">₹{{returnEarned}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pt-3 pb-6">
                    <span class="text-h6 font-weight-light ">Total Returns</span>
                    <span class="text-h6 font-weight-light ">₹{{TotalReturns}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pb-3">
                    <span class="text-h6 font-weight-light ">CAGR</span>
                    <span class="text-h6 font-weight-light ">{{cagr}}%</span>
                  </v-row>
                 </v-col>    
                </v-card-title>
                <v-card-actions class="mt-n7"></v-card-actions>
              </v-card>
       </v-col></v-row>
      </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DoughnutExample from '@/components/DoughnutExample.vue'

const options = {
  responsive: true, 
  maintainAspectRatio: false, 
  animation: {
    animateRotate: false
  }
}
 export default {
   
   name:'SipView',
   components: { DoughnutExample },
    data: () => ({
      investedAmount:1000,
      TotalReturns:1500,
      timePeriod:10,
      returnEarned:0,
      cagr:0,
      options, 
        chartData: {
        labels: ['Invested Amount','ReturnEarned'],
        datasets: [
          {
            backgroundColor: [
              "blue",
              "RED"
            ],
            data: [10,10]
          }
        ]
      }
    }),
    computed: {
    currentDataSet () {
      return this.chartData.datasets[0].data
    },
    
  },
  mounted: function mounted () {
    this.sliderSubmit()
},
    methods:{
      sliderSubmit(){
        this.returnEarned=this.TotalReturns-this.investedAmount;
        this.cagr=(Math.pow((this.TotalReturns/this.investedAmount),1/this.timePeriod)-1)*100;
        this.chartData.datasets[0].data.splice(0, 1, this.investedAmount);
        this.chartData.datasets[0].data.splice(1, 1, this.returnEarned);
        this.$refs.skills_chart.update();
      },
       updateChart () {
      this.$refs.skills_chart.update();
    },
    updateAmount (amount, index) {
      this.chartData.datasets[0].data.splice(index, 1, amount)
      this.updateChart();
    },
    updateName (text, index) {
      this.chartData.labels.splice(index, 1, text)
      this.updateChart();
    },
    },

 }
</script>

<style>
.text-green input{
  color: rgb(21, 207, 46) !important;
}

</style>