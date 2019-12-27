<template>
  <div class="container caja">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <v-textarea
          name="message"
          label="Nuevo Mensaje"
          auto-grow
          background-color="white"
          color="black"
          clearable
          clear-icon="mdi-cancel"
          counter
          shaped
          filled=""
          rounded
          rows="3"
          v-model="newMessage"
        ></v-textarea>

        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>
      <div class="text-center">
        <v-btn type="submit" color="success"> Enviar </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "CreateMessage",
  props: ["name", "grupo"],
  data() {
    return {
      newMessage: null,
      errorText: null
    };
  },
  methods: {
    createMessage() {
      if (this.newMessage) {
        db.collection(this.grupo).add({
          message: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        });

        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "Un mensaje debe ser ingresado primero";
      }
    }
  }
};
</script>
<style lang="stylus">
.caja{
  margin-top: 20px
  background-color #fd9917
  border-radius 15px
}
input[type="text"], textarea {

  background-color : white;
  width 100%

}


If you want to change only the placeholder style

::-webkit-input-placeholder {
   text-align: center;
}

:-moz-placeholder { /* Firefox 18- */
   text-align: center;
}

::-moz-placeholder {  /* Firefox 19+ */
   text-align: center;
}

:-ms-input-placeholder {
   text-align: center;
}
</style>
