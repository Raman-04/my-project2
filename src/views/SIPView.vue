<template>
  <div app>
    <v-container >
      <v-row
      align="center">
      <v-card
      class="pa-10"
      height="1400"
      width="800"
      elevation="20"
      >
      <v-row><v-col >
        <h1>SIP</h1>
        <v-card-subtitle>Calculate how much you need to save or how much you will accumulate with your SIP</v-card-subtitle>
        <v-row class="d-flex justify-space-between">
          <h4 class="pt-5 pl-4">Inflation adjusted</h4>
          <v-switch
      v-model="switch1"
      @click="sliderSubmit"
      
    ></v-switch>
        </v-row>
        <br>
        
  <v-card class="rounded-xl"   elevation="10">
                <v-card-title>
                  <v-row>
                    <v-col>
                       <span class="text-h6 font-weight-light">Monthly Investment</span>
                      <v-text-field v-model="monthlyInvestment" type="number" label="Number"  class="blue" solo flat background-color="grey lighten-4"  @input="sliderSubmit"  ></v-text-field>
                               <v-slider  max="100000" min="1000" step="1" v-model="monthlyInvestment" @change="sliderSubmit"></v-slider>
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
                      <span class="text-h6 font-weight-light">Expected return rate (p.a)</span>
                      <v-text-field v-model="rate" type="number" label="Number"  class="blue" solo flat background-color="grey lighten-4" ></v-text-field>
                               <v-slider  max="150" min="0" step="1" v-model="rate" @change="sliderSubmit"></v-slider>
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
                      <span class="text-h6 font-weight-light ">time</span>
                      <v-text-field v-model="time" type="number" label="Number"  class="blue" solo flat background-color="grey lighten-4" ></v-text-field>
                               <v-slider  max="70" min="0" step="1" v-model="time" @change="sliderSubmit"></v-slider>
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
                <v-card-title >
                 <v-col>
                   <v-row class="d-flex justify-space-between pt-3">
                    <span class="text-h6 font-weight-light ">Invested amount</span>
                    <span class="text-h6 font-weight-light ">₹{{totalInvestment}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pt-3">
                    <span class="text-h6 font-weight-light ">Expected returns</span>
                    <span class="text-h6 font-weight-light ">₹{{expectedRate}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pt-3 pb-6">
                    <span class="text-h6 font-weight-light ">Total return</span>
                    <span class="text-h6 font-weight-light ">₹{{maturity}}</span>
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
      switch1:false,
      monthlyInvestment:1000,
      rate:12,
      time:15,
      totalInvestment:0,
      expectedRate:0,
      maturity:0,
      options, 
        chartData: {
        labels: ['Invested amount','Expected returns'],
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
        if(this.switch1===true){
          let monthTime=this.time*12;
        let sipRate=(this.rate-6)/12/100;
        this.totalInvestment=this.monthlyInvestment*monthTime;
        this.maturity=(this.monthlyInvestment*[(Math.pow((1+sipRate),monthTime)-1)/sipRate]*[1+sipRate]);
        this.expectedRate=(this.maturity - this.totalInvestment);
        this.chartData.datasets[0].data.splice(0, 1, this.totalInvestment);
        this.chartData.datasets[0].data.splice(1, 1, this.expectedRate);
        this.$refs.skills_chart.update();
        }else{
          let monthTime=this.time*12;
        let sipRate=(this.rate/12)/100;
        this.totalInvestment=this.monthlyInvestment*monthTime;
        this.maturity=(this.monthlyInvestment*[(Math.pow((1+sipRate),monthTime)-1)/sipRate]*[1+sipRate]);
        this.expectedRate=(this.maturity - this.totalInvestment);
        this.chartData.datasets[0].data.splice(0, 1, this.totalInvestment);
        this.chartData.datasets[0].data.splice(1, 1, this.expectedRate);
        this.$refs.skills_chart.update();
        }
        
        
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
  color: rgb(230, 199, 199) !important;
}
#chart {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #1a8dda;
  margin-top: 80px;
}
</style>