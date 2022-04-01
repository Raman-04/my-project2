<template>
  <div >
    <v-container >
      <v-row
      align="center">
      <v-card
      class="pa-10"
      height="1500"
      width="800"
      elevation="20"
      >
      <v-row><v-col >
        <h1>STEPUPSIP</h1>
        <v-card-subtitle>Calculate how much you will accumulate with your SIP on slight annual increment</v-card-subtitle>
        <v-switch
      v-model="switch1"
      @click="sliderSubmit"
      
    ></v-switch>
        <br>
  <v-card class="rounded-xl"   elevation="10">
                <v-card-title>
                 
                  <v-row>
                    <v-col>
                       <span class="text-h6 font-weight-light">Monthly Investment</span>
                      <v-text-field v-model="monthlyInvestment" type="number" label="Number"  class="white" solo flat background-color="blue"  @input="sliderSubmit"></v-text-field>
                               <v-slider  max="1000000" min="1000" step="1" v-model="monthlyInvestment" @change="sliderSubmit"></v-slider>
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
                      <v-text-field v-model="expectedReturnRate" type="number" label="Number"  class="white" solo flat background-color="blue"  @input="sliderSubmit"></v-text-field>
                               <v-slider  max="150" min="0" step="1" v-model="expectedReturnRate"  @change="sliderSubmit"></v-slider>
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
                      <span class="text-h6 font-weight-light">Annual step up</span>
                      <v-text-field v-model="annualIncrement" type="number" label="Number"  class="white" solo flat background-color="blue"  @input="sliderSubmit" ></v-text-field>
                               <v-slider  max="50" min="0" step="1" v-model="annualIncrement"  @change="sliderSubmit"></v-slider>
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
                      <v-text-field v-model="timePeriod" type="number" label="Number"  class="white" solo flat background-color="blue" @input="sliderSubmit"></v-text-field>
                               <v-slider  max="100" min="0" step="1" v-model="timePeriod"  @change="sliderSubmit"></v-slider>
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
      
        <v-card class="rounded-xl"   elevation="10">
                <v-card-title>
                 <v-col>
                   <v-row class="d-flex justify-space-between pt-3">
                    <span class="text-h6 font-weight-light ">Invested amount</span>
                    <span class="text-h6 font-weight-light ">₹{{netInvested}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pt-3">
                    <span class="text-h6 font-weight-light ">Expected returns</span>
                    <span class="text-h6 font-weight-light ">₹{{netReturns-netInvested}}</span>
                  </v-row>
                  <v-row class="d-flex justify-space-between pt-3 pb-6">
                    <span class="text-h6 font-weight-light ">Total value</span>
                    <span class="text-h6 font-weight-light ">₹{{netReturns}}</span>
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
import DoughnutExample from "@/components/DoughnutExample.vue";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateRotate: false,
  },
};
export default {
  name: "SipView",
  components: { DoughnutExample },
  data: () => ({
    monthlyInvestment: 1000,
    expectedReturnRate: 12,
    timePeriod: 15,
    annualIncrement: 10,
    totalValue: 0,
    netReturns:0,
    netInvested:0,
    options,
    chartData: {
      labels: ["Invested amount", "Expected returns"],
      datasets: [
        {
          backgroundColor: ["blue", "red"],
          data: [10, 10],
        },
      ],
    },
  }),
  computed: {
    currentDataSet() {
      return this.chartData.datasets[0].data;
    },
  },
   mounted: function mounted () {
    this.sliderSubmit()
},
  methods: {
    sliderSubmit() {
      this.netInvested = 0;
      this.netReturns = 0;
      let updatedMonthly = this.monthlyInvestment;
      for (let i = 1; i <= this.timePeriod; i++) {
        const sipAmount = updatedMonthly;
        const OneYearReturns = this.calculateSipReturns(
          sipAmount,
          this.expectedReturnRate,
          1
        );
        const nYearReturns = this.calculateLumpSumReturns(
          OneYearReturns,
          this.expectedReturnRate,
          this.timePeriod - i
        );
        this.netInvested += sipAmount * 12;
        this.netReturns += nYearReturns;
        updatedMonthly = updatedMonthly * (1 + this.annualIncrement / 100);
      }
       this.chartData.datasets[0].data.splice(0, 1, this.netInvested);
        this.chartData.datasets[0].data.splice(1, 1, this.netReturns-this.netInvested);
        this.$refs.skills_chart.update();
    },
    calculateSipReturns(sipAmount,expectedReturnRate,time){
      if(this.switch1===true){
          let monthTime=time*12;
        let sipRate=(expectedReturnRate -6)/12/100;
        let maturity=(sipAmount*[(Math.pow((1+sipRate),monthTime)-1)/sipRate]*[1+sipRate]);
        return maturity;
        }else{
           let monthTime=time*12;
        let sipRate=(expectedReturnRate)/12/100;
        let maturity=(sipAmount*[(Math.pow((1+sipRate),monthTime)-1)/sipRate]*[1+sipRate]);
        return maturity;
        }
    },
    calculateLumpSumReturns(OneYearReturns,expectedReturnRate,time){
      if(this.switch1===true){
           let lumprate = (expectedReturnRate -6) / 100;
        let totalValue =
          OneYearReturns * [
            Math.pow(1 + lumprate, time)];
            return totalValue;
        }else{
          let lumprate = (expectedReturnRate) / 100;
        let totalValue =
          OneYearReturns * [
            Math.pow(1 + lumprate, time)];
            return totalValue;
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
};
</script>

<style>
.text-green input {
  color: rgb(9, 128, 25) !important;
}
</style>