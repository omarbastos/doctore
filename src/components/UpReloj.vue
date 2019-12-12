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
        color="orange darken-4"
        v-if="!timer"
        @click="startTimer"
      >
        <v-icon>mdi-toilet</v-icon>USO PERSONAL
      </v-btn>
      <!--     Pause Timer -->
      <v-btn
        dark
        id="stop"
        :disabled="disable"
        x-large
        color="red"
        v-if="timer"
        @click="pauseTimer"
      >
        <v-icon>mdi-paper-roll</v-icon>
        {{ upText }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    upText: {
      type: String,
      default: "PAUSAR USO PERSONAL"
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
    totalTime: null,
    clock: false,
    timer: null,
    resetButton: false,
    title: "Let the countdown begin!!"
  }),
  // ========================
  methods: {
    startTimer: function() {
      this.clock = true;
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
      this.title = "Greatness is within sight!!";
      this.$emit("up-start", this.totalTime);
    },
    pauseTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
      this.$emit("up-pause", this.totalTime);
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
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
        this.$emit("up-ended", this.totalTime);

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
