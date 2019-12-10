<template>
  <section class="page_404">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 ">
          <div class="four_zero_four_bg">
            <h1 class="text-center ">404</h1>
          </div>

          <div class="contant_box_404 text-center">
            <h3 class="h2">
              Parece que estás perdido
            </h3>

            <p>La página que estás buscando no está disponible</p>

            <v-btn color="#FD9917" to="/login">Go to Home</v-btn>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
/*======================
    404 page
=======================*/

.page_404 {
  background-color: white;
  padding: 40px 0;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url("../assets/dribbble_1.gif");
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
}
.contant_box_404 {
  margin-top: -50px;
}
</style>
