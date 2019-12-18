<template>
  <div>
    <v-simple-table class="my-4" elevation="24" v-if="!showEditar">
      <template v-slot:default>
        <thead class="naranja">
          <tr>
            <th class="text-center font-weight-bold subtitle-1">Día</th>
            <th class="text-center font-weight-bold subtitle-1">Horario</th>
            <th class="text-center font-weight-bold subtitle-1">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center font-weight-bold">Lunes</td>
            <td class="text-center font-weight-bold">
              {{ user.horario.monday | minutesToHour }}
            </td>
            <td class="text-center font-weight-bold">
              <v-btn color="error" @click="actualizarHora('Lunes')">
                Actualizar
              </v-btn>
            </td>
          </tr>

          <tr>
            <td class="text-center font-weight-bold">Martes</td>
            <td class="text-center font-weight-bold">
              {{ user.horario.tuesday | minutesToHour }}
            </td>
            <td class="text-center font-weight-bold">
              <v-btn color="error" @click="actualizarHora('Martes')">
                Actualizar
              </v-btn>
            </td>
          </tr>
          <tr>
            <td class="text-center font-weight-bold">Miercoles</td>
            <td class="text-center font-weight-bold">
              {{ user.horario.wednesday | minutesToHour }}
            </td>
            <td class="text-center font-weight-bold">
              <v-btn color="error" @click="actualizarHora('Miercoles')">
                Actualizar
              </v-btn>
            </td>
          </tr>
          <tr>
            <td class="text-center font-weight-bold">Jueves</td>
            <td class="text-center font-weight-bold">
              {{ user.horario.thursday | minutesToHour }}
            </td>
            <td class="text-center font-weight-bold">
              <v-btn color="error" @click="actualizarHora('Jueves')">
                Actualizar
              </v-btn>
            </td>
          </tr>
          <tr>
            <td class="text-center font-weight-bold">Viernes</td>
            <td class="text-center font-weight-bold">
              {{ user.horario.friday | minutesToHour }}
            </td>
            <td class="text-center font-weight-bold">
              <v-btn color="error" @click="actualizarHora('Viernes')">
                Actualizar
              </v-btn>
            </td>
          </tr>

          <tr>
            <td class="text-center font-weight-bold">Sábado</td>
            <td class="text-center font-weight-bold">
              {{ user.horario.saturday | minutesToHour }}
            </td>
            <td class="text-center font-weight-bold">
              <v-btn color="error" @click="actualizarHora('Sabado')">
                Actualizar
              </v-btn>
            </td>
          </tr>
          <tr>
            <td class="text-center font-weight-bold">Domingo</td>
            <td class="text-center font-weight-bold">
              {{ user.horario.sunday | minutesToHour }}
            </td>
            <td class="text-center font-weight-bold">
              <v-btn color="error" @click="actualizarHora('Domingo')">
                Actualizar
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div v-else class="container">
      <v-row align="center" justify="center">
        <v-col>
          <h2>Modificar horario de {{ user.fullname }} del {{ dia }}</h2>
        </v-col>
        <v-col>
          <a-time-picker
            format="HH:mm"
            :minuteStep="5"
            v-model="value"
            :open.sync="open"
            :placeholder="day"
            size="large"
          >
            <a-button
              slot="addon"
              size="small"
              type="primary"
              @click="handleClose"
              >Ok</a-button
            >
          </a-time-picker>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { TimePicker, Button } from "ant-design-vue";
export default {
  components: {
    "a-time-picker": TimePicker,
    "a-button": Button
  },
  props: {
    user: Object
  },
  data: () => ({
    showEditar: false,
    dia: "",
    value: null,
    open: false
  }),
  methods: {
    handleClose() {
      let hm = moment(this.value).format("HH:mm");
      let a = hm.split(":");
      let enviar = +a[0] * 60 + +a[1];
      switch (this.dia) {
        case "Lunes":
          this.$emit("fbDia", "monday", enviar);
          break;
        case "Martes":
          this.$emit("fbDia", "tuesday", enviar);
          break;
        case "Miercoles":
          this.$emit("fbDia", "wednesday", enviar);
          break;
        case "Jueves":
          this.$emit("fbDia", "thursday", enviar);
          break;
        case "Viernes":
          this.$emit("fbDia", "friday", enviar);
          break;
        case "Sabado":
          this.$emit("fbDia", "saturday", enviar);
          break;
        case "Domingo":
          this.$emit("fbDia", "sunday", enviar);
          break;
        default:
          break;
      }
      this.showEditar = false;
      this.value = null;
      this.open = false;
    },
    actualizarHora(day) {
      this.showEditar = true;
      this.dia = day;
    }
  },

  filters: {
    minutesToHour(value) {
      let num = value;
      let hours = num / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      if (rminutes < 10) {
        rminutes = `0${rminutes}`;
      }
      if (rhours < 10) {
        rhours = `0${rhours}`;
      }
      return `${rhours}:${rminutes}`;
    }
  }
};
</script>

<style></style>
