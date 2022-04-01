<template>
  <div >
    <v-container >
      <v-row
      align="center">
      <v-card
      class="pa-10"
      height="1000"
      width="800"
      elevation="20"
      >
      <v-row><v-col >
        <h1>DEFLATION</h1>
        <v-card-subtitle>Calculate how much you money will cost in the coming years with deflation - effect of inflation</v-card-subtitle>
        <br>
  <v-card class="rounded-xl"   elevation="10">
                <v-card-title>
                 
                  <v-row>
                    <v-col>
                       <span class="text-h6 font-weight-light">Current Value</span>
                      <v-text-field v-model="currentValue" type="number" label="Number"  class="text-green pt-3" solo flat background-color="blue" @input="sliderSubmit" ></v-text-field>
                               
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
                      <span class="text-h6 font-weight-light">Inflation rate(p.a)</span>
                      <v-text-field v-model="inflationRate" type="number" label="Number"  class="text-green pt-3" solo flat background-color="blue" @input="sliderSubmit"></v-text-field>
                               
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
                      <v-text-field v-model="timePeriod" type="number" label="Number"  class="text-green pt-3" solo flat background-color="blue" @input="sliderSubmit" ></v-text-field>
                              
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
        :chart-data="chartData"
      >
      </DoughnutExample>

    </div>
  </div>
       </v-card>
      
        <v-card class="rounded-xl"   elevation="10">
                <v-card-title>
                 <v-col>
                   <v-row class="d-flex justify-space-between pt-3">
                    <span class="text-h6 font-weight-light ">Current Value</span>
                    <span class="text-h6 font-weight-light ">₹{{currentValue}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pt-3">
                    <span class="text-h6 font-weight-light ">Deflation Amount</span>
                    <span class="text-h6 font-weight-light ">₹{{deflationAmount}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pt-3 pb-6">
                    <span class="text-h6 font-weight-light ">Future worth</span>
                    <span class="text-h6 font-weight-light ">₹{{futureWorth}}</span>
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
      currentValue:1000,
      inflationRate:6,
      timePeriod:15,
      deflationAmount:0,
      futureWorth:0,
      options, 
        chartData: {
        labels: ['Future Worth','Deflated Amount'],
        datasets: [
          {
            backgroundColor: [
              "blue",
              "red"
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
        this.futureWorth=this.currentValue*[Math.pow((1-(this.inflationRate/100)),this.timePeriod)];
        this.deflationAmount=this.futureWorth-this.currentValue;
        this.chartData.datasets[0].data.splice(0, 1, this.futureWorth);
        this.chartData.datasets[0].data.splice(1, 1, this.deflationAmount);
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
  color: rgb(207, 24, 177) !important;
}

</style>


