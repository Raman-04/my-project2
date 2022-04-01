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
        <h1>INFLATION</h1>
        <v-card-subtitle>Calculate how much your products will cost in the coming years with inflation</v-card-subtitle>
        <br>
         <v-card-actions>
         </v-card-actions>
  <v-card class="rounded-xl"   elevation="10">
                <v-card-title>
                 
                  <v-row>
                    <v-col>
                       <span class="text-h6 font-weight-light">Current Value</span>
                      <v-text-field v-model="currentValue" type="number" label="Number"  class="blue" solo flat background-color="grey lighten-4" @input="sliderSubmit" ></v-text-field>
                               
                    </v-col>
                  </v-row>     
                </v-card-title>                          <v-card-actions class="mt-n7"></v-card-actions>
              </v-card>
              <br>
              <v-card class="rounded-xl "   elevation="10">
                <v-card-title>
                  
                  <v-row>
                    <v-col>
                      <span class="text-h6 font-weight-light">Inflation rate(p.a)</span>
                      <v-text-field v-model="inflationRate" type="number" label="Number"  class="blue" solo flat background-color="grey lighten-4" @input="sliderSubmit" ></v-text-field>
                
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
                      <v-text-field v-model="timePeriod" type="number" label="Number"  class="blue" solo flat background-color="grey lighten-4" @input="sliderSubmit" ></v-text-field>
                               
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
                    <span class="text-h6 font-weight-light ">Inflation Amount</span>
                    <span class="text-h6 font-weight-light ">₹{{futureValue}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pt-3 pb-6">
                    <span class="text-h6 font-weight-light ">Future Fund Need</span>
                    <span class="text-h6 font-weight-light ">₹{{inflationAmount}}</span>
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
      inflationAmount:0,
      futureValue:0,
      options, 
        chartData: {
        labels: ['Current Value','Inflation Amount'],
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
        this.inflationAmount=this.currentValue*[Math.pow((1+(this.inflationRate/100)),this.timePeriod)];
         this.futureValue=  Number( this.inflationAmount)-Number(this.currentValue);
        this.chartData.datasets[0].data.splice(0, 1, this.currentValue);
        this.chartData.datasets[0].data.splice(1, 1, this.inflationAmount);
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
  color: rgb(165, 53, 53) !important;
}

</style>
