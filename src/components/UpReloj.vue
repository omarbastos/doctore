<template>
  <div class="container text-center">
    <div v-if="clock" class="timer">
      <span id="minutes">{{ minutes }}</span>
      <span id="middle">:</span>
      <span id="seconds">{{ seconds }}</span>
    </div>

    <div id="buttons">
      <!--     Start TImer -->
      <v-btn
        :disabled="disableUP"
        id="start"
        x-large
        color="orange darken-4"
        dark
        v-if="!timer"
        @click="startTimer"
      >
        <v-icon>mdi-toilet</v-icon>USO PERSONAL
      </v-btn>
      <!--     Pause Timer -->
      <v-btn
        dark
        id="stop"
        :disabled="disableUP"
        x-large
        color="red"
        v-if="timer"
        @click="pauseTimer"
      >
        <v-icon>mdi-paper-roll</v-icon>DETENER USO PERSONAL
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fbTotalTime: Number,
    flag: Boolean
  },
  // ========================
  data: () => ({
    clock: false,
    disableUP: false,
    timer: null,
    totalTime: 0,
    resetButton: false,
    title: "Let the countdown begin!!"
  }),
  created: function() {
    // `this` hace referencia a la instancia vm
    this.totalTime = this.fbTotalTime;
  },
  // ========================
  methods: {
    startTimer: function() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
      this.title = "Greatness is within sight!!";
      this.clock = true;
      this.$emit("up-start");
    },
    pauseTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
      this.$emit("up-stop", this.totalTime);
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
      this.disableUP = true;
    },
    resetTimer: function() {
      this.totalTime = 25 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
      this.title = "Let the countdown begin!!";
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function() {
      this.totalTime++;
      if (this.totalTime > 20 && this.flag == false) {
        this.$emit("up-ended", this.totalTime);
      }
    }
  },
  // ========================
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    }
  }
};
</script>

<style></style>
