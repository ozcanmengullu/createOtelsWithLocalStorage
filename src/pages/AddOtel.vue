<template>
<div class="home">
  <b-card class="mt-3 cardd" header="Otel Ekle">
    <b-form-textarea
      id="textarea"
      v-model="otel"
      placeholder="Otel Adı"
      style="background-color: #f5f7fa;"
      rows="3"
      max-rows="6"
      required
      :state="point !== '' && otel === '' ? false : otel !== '' && point !== '' ? true : null"
    ></b-form-textarea> <br /><br />
    <b-form-input style="background-color: #f5f7fa;" :state="otel !== '' && point === '' ? false : otel !== '' && point !== '' ? true : null" type="number" placeholder="Otel Puanı Giriniz" v-model="point" step="0.1"></b-form-input> <br /><br />
    <b-button type="submit" :variant="buttonVariant" required @click="storeCar">{{ buttonName }}</b-button> <br> <br>
    <b-button type="reset" variant="outline-primary" @click="goHome">OTELLERI LISTELE</b-button>
  </b-card>
  <notifications position="top right"/>
</div>
</template>

<script>
export default {
  name: "AddOtel",
  data() {
    return {
      otels: [],
      otel: "",
      point: "",
      addedOtel: false,
      buttonName: "EKLE",
      buttonVariant: "primary"
    };
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("otels")) && JSON.parse(localStorage.getItem("otels")).length > 0) {
      this.otels = JSON.parse(localStorage.getItem("otels"))
      console.log(this.otels)
    }
  },
  methods: {
    variant() {
      return this.addedOtel ? "success" : "primary"
    },
    storeCar() {
      this.addedOtel = false
      if (this.otel.length && this.point) {
        this.otels.push({
            OtelName: this.otel,
            Points: this.point * 10,
            index: this.otels.length + 1,
            createdAt: new Date().toLocaleString()
        });
        localStorage.setItem("otels", JSON.stringify(this.otels))
        this.addedOtel = true,
        this.buttonName = "EKLENDI"
        this.buttonVariant = "success"
        this.$notify({
          title: `${this.otel}`,
          text: 'Başarıyla Eklendi',
          type: 'success',
          duration: 2000
        })
        this.otel = ""
        this.point = ""
        setTimeout(() => {
          this.buttonName = "EKLE"
          this.addedOtel = false
          this.buttonVariant = "primary"
        }, 2000);
      }
    },
    getCars() {
      this.otels = JSON.parse(localStorage.getItem("otels"))
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>
<style>
.cardd {
  border-color: crimson;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
.cardd:hover {
  text-decoration: none;
  border: 2px solid #17a2b8;
  font-size: 1.5rem;
  color: var(--color);
  transition: all 200ms ease-out;
}
  .home {
    width: 50%;
    margin-inline-start: 24%;
  }
  .vue-notification {
    position: fixed;
    z-index: 9999;
    top: 10px;
    right: 10px;
    width: 300px;
    padding: 10px;
    background: #68CD86;
    border-left-color: #42A85F;
  }
</style>
