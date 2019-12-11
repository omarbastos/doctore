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
        :disabled="disableUP"
        id="start"
        x-large
        color="purple"
        v-if="!timer"
        @click="startTimer"
      >
        <v-icon>mdi-food</v-icon>ALMUERZO
      </v-btn>
      <!--     Pause Timer -->
      <v-btn
        dark
        id="stop"
        :disabled="disableUP"
        x-large
        color="red"
        v-if="timer"
        @click="stopTimer"
      >
        <v-icon>mdi-food-off</v-icon>{{ aiText }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aiText: {
      type: String,
      default: "DETENER ALMUERZO"
    }
  },
  // ========================
  data: () => ({
    clock: false,
    disableUP: false,
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
      this.$emit("ai-start");
    },
    pauseTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
      this.disableUP = true;
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
      this.disableUP = true;
      this.$emit("ai-stop");
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
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        clearInterval(this.timer);

        this.$emit("ai-ended");
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
