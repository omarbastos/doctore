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
        dark
        :disabled="disable"
        id="start"
        x-large
        color="indigo"
        v-if="!timer"
        @click="startTimer"
      >
        <v-icon>mdi-coffee</v-icon>CAFE 1
      </v-btn>
      <!--     Pause Timer -->
      <v-btn dark id="stop" :disabled="disable" x-large color="red" v-if="timer" @click="stopTimer">
        <v-icon>mdi-coffee-off</v-icon>
        {{ cf1Text }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cf1Text: {
      type: String,
      default: "DETENER CAFE1"
    },
    disable: Boolean,
    fbTotalTime: Number
  },
  created: function() {
    // `this` hace referencia a la instancia vm
    this.totalTime = this.fbTotalTime;
  },
  // ========================
  data: () => ({
    clock: false,

    timer: null,
    totalTime: 5,
    resetButton: false,
    title: "Let the countdown begin!!"
  }),
  // ========================
  methods: {
    startTimer: function() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
      this.title = "Greatness is within sight!!";
      this.clock = true;
      this.$emit("cafe1-start", this.totalTime);
    },
    pauseTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
      this.disable = true;
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
      this.disable = true;
      this.$emit("cafe1-stop", this.totalTime);
    },

    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function() {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        clearInterval(this.timer);
        this.$emit("cf1-ended", this.totalTime);
        return;
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
