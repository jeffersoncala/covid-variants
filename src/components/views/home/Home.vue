<template>
  <div id="home">
    <h1>Covid Daily Cases</h1>
    <div class="map-wrapper">
      <div class="slider">
        <Slider v-model="currentValue"
        :format="this.formatDateSlider"
        :min="0"
        :max="this.days"
        :step="this.step"
        />
        <div class="semestry">
          <span>jan/2020</span>
          <span>jul/2020</span>
          <span>jan/2021</span>
          <span>jul/2021</span>
          <span>jan/2022</span>
        </div>
      </div>
      <div id="world-map" style="width: 800px; height: 600px"></div>
    </div>
  </div>
</template>

<script>
//SupaBase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

//Slider
import Slider from '@vueform/slider/dist/slider.vue2.js'
require('@vueform/slider/themes/default.css')

//JQUERY
window.jQuery = require('jquery');
var $ = window.jQuery;

//JVECTORMAP
require('jvectormap');
require('jvectormap/tests/assets/jquery-jvectormap-world-mill-en.js');
require('jvectormap/jquery-jvectormap.css');

export default {
  name: 'HomePage',
  components: {
      Slider,
  },
  data () {
		return {
      location: '',
      variant: '',
      num_sequences: 0,
      perc_sequences: 0,
      num_sequences_total: 0,
      currentValue: 0,
      days: 0,
      step: 14,
      date: '2020-7-7',
      dateInitial: new Date('2020-7-7'),
      dateFinal: new Date('2021-12-28'),
      response: []
    }
  },
  async mounted(){
    await this.getSequencesDate();
    await this.initSlider();
    await this.initMap(this.response);
  },
  watch: {
    currentValue() {
      this.getSequencesDate()
    }
  },
  methods:{
    async getSequencesDate(){
      let { data: covid_variants, error } = await supabase
        .from('covid_variants')
        .select('*')
        .eq('date', `${this.date}`)
      
      if(!error){
        this.response = covid_variants;
        this.initMap(this.response)
      }else {
        console.info(error)
      }
    },
    formatDateSlider(value){
      var day = 1000 * 60 * 60 * 24;
      var calcDate = new Date((this.dateInitial.getTime() + (day * value )));
      var dia = calcDate.getDate();
      if (dia.toString().length == 1){
        dia = "0"+dia;
      }
      var mes = calcDate.getMonth()+1;
      if (mes.toString().length == 1){
        mes = "0"+mes;
      }
      var ano = calcDate.getFullYear();      
      this.date = ano+"-"+mes+"-"+dia;
      return dia+"/"+mes+"/"+ano;
    },
    initSlider(){
      const diff = Math.abs(this.dateFinal.getTime() - this.dateInitial.getTime()); // Subtrai uma data pela outra
      this.days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
    },
    async initMap(response){
      $('#world-map').vectorMap(
        {
        map: 'world_mill_en',
        panOnDrag: true,
        focusOn: {
          x: 0,
          y: 0,
          scale: 0,
          animate: true
        },
        series: {
          regions: [{
            scale: ['#C8EEFF', '#0071A4'],
            normalizeFunction: 'polynomial',
            values: this.currentValue
          }]
        },
        onRegionTipShow: async function(event, label, code){
            console.info(response)
            var sucess = 0;
            response.forEach(itemArray => {
              if(itemArray.location == label.html()){
                sucess = itemArray.num_sequences_total;
              }
            });
            label.html(
              '<b>'+label.html()+' ('+ code +')'+'</b></br>'+
              'Number of sequences: '+ sucess
            );
        }
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #home{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    h1{
      font-family: 'Open Sans';
      font-weight: 700;
      font-size: 2.25rem;
      margin: 10px 0;
    }

    .map-wrapper{
      .slider{
        margin: 50px 0;

        .semestry{
          display: flex;
          justify-content: space-between;
          margin-top: 20px;

          span{
            font-weight: 700;
            font-size: 0.825rem;
          }
        }
      }
    }
  }
</style>
