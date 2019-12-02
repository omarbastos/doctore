<template>
  <div class="home my-4">
    <div class="row">
      <div class="col-md-4 d-flex align-center justify-center">
        <up-reloj @up-ended="flagUp"></up-reloj>
      </div>

      <div class="col-md-4 d-flex align-center justify-center">
        <div class="outer">
          <agent-table class="responsive-tabla"></agent-table>
        </div>
      </div>
      <div class="col-md-4 d-flex align-center justify-center">
        <rs-reloj></rs-reloj>
      </div>
      <div class="col-md-4 d-flex align-center justify-center">
        <cf1-reloj @cf1-ended="flagCf1"></cf1-reloj>
      </div>
      <div class="col-md-4 d-flex align-center justify-center">
        <ai-reloj @ai-ended="flagAi"></ai-reloj>
      </div>
      <div class="col-md-4 d-flex align-center justify-center">
        <cf2-reloj @cf2-ended="flagCf2"></cf2-reloj>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UpReloj from "../components/UpReloj.vue";
import AiReloj from "../components/AiReloj.vue";
import Cf1Reloj from "../components/Cf1Reloj.vue";
import Cf2Reloj from "../components/Cf2Reloj.vue";
import RsReloj from "../components/RsReloj.vue";
import AgentTable from "../components/AgentTable.vue";

export default {
  name: "home",
  data: () => ({
    secSelected: 1200
  }),
  components: { UpReloj, AiReloj, Cf1Reloj, Cf2Reloj, RsReloj, AgentTable },
  methods: {
    flagUp() {
      //Guardar en la base de datos que se comio el UP
      alert("Up finalizado");
    },
    flagAi() {
      //Guardar en la base de datos que se comio el UP
      alert("Ai finalizado");
    },

    flagCf2() {
      //Guardar en la base de datos que se comio el UP
      alert("cf2 finalizado");
    },

    flagCf1() {
      //Guardar en la base de datos que se comio el UP
      alert("cf1 finalizado");
    }
  }
};
</script>

<style lang="stylus">



@font-face{
 font-family:'digital-7';
 src: url('../assets/digital-7.ttf');
}
.timer {
  font-size: 3.5rem;
  line-height: 1;
  margin-bottom: 40px;
  padding 15px
  font-family: 'digital-7', sans-serif;
  color  white
}
.responsive-tabla{
  height: 40vh; overflow-y: scroll;
  border-radius 5px
}
.outer {

  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  border-radius: 8px;
  overflow: hidden;
}
span.time{
  font-size 10px
  padding 5px
  background-color blue
  border-radius 15px
  font-weight 500
  font-style italic

}
span.boss{
  padding  10px
  background-color red
  border-radius 25px

}
h2{

}
</style>
