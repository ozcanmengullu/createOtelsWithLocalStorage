<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row class="mb-3">
        <b-col md="4" class="p-3">
          <b-dropdown variant="white">
            <template #button-content>
              <b-icon icon="sort-up" aria-hidden="true"></b-icon> Sırala
            </template>
            <b-dropdown-item-button @click="sortIncrease">
              <b-icon v-if="clickedIncrease && !clickedDecrease" icon="check" aria-hidden="true"></b-icon>
              Puan (Artan) <span class="sr-only">(Selected)</span>
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="sortDecrease">
              <b-icon v-if="!clickedIncrease && clickedDecrease" icon="check" aria-hidden="true"></b-icon>
              Puan (Azalan) <span class="sr-only">(Selected)</span>
            </b-dropdown-item-button>
          </b-dropdown>
        </b-col>
        <b-col md="4" class="ml-auto p-3">
          <b-icon icon="plus-square"></b-icon> <b-button style="border: none" variant="outline-primary"  @click="goAddOtel">
            OTEL EKLE
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-card id="itemList" v-for="(otel, i) in otelsList" :key="i" class="overflow-hidden" style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); max-width: 540px; margin-inline-start: 17.5%; margin-bottom: 5px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img src="image.jpeg" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <b-card-text class="cardHeader">
              {{ otel.OtelName ? otel.OtelName : '' }}
            </b-card-text>
            <b-card-text class="pointTicket">
              {{ otel.Points ? otel.Points / 10 + ' Puan' : '' }}
            </b-card-text>
            <b-row>
              <b-col class="p-3">
                <b-button variant="outline-primary" v-model="pointUpper" @click="pointUp(otel)">Puan Arttır</b-button>
                <b-button variant="outline-primary" v-model="pointDowner" @click="pointDown(otel)">Puan Azalt</b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-icon class="delete" icon="trash" @click="deleteOtel(otel)"></b-icon>
              </b-col>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <div class="overflow-auto">
      <div class="mt-3 pagination">
        <b-pagination
          v-if="this.otels.length > 5"
          style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);"
          :total-rows="totalRows" 
          v-model="currentPage"
          :per-page="perPage"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Otels',
  data() {
    return {
      otels: [],
      otel: "",
      point: "",
      perPage: 5,
      points: null,
      pointUpper: null,
      pointDowner: null,
      currentPage: 1,
      clickedIncrease: false,
      clickedDecrease: false,
      approveDelete: false
    };
  },
  computed: {
    otelsList () {
      const items = this.otels
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    },
    totalRows () {
      return this.otels.length
    }
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("otels")) && JSON.parse(localStorage.getItem("otels")).length > 0) {
      this.otels = JSON.parse(localStorage.getItem("otels"))
      this.otels.length > 5 ? this.perPage === 5 : this.otels.length
      this.points = this.otels.Points ? this.otels.Points : ''
      this.perPage = this.otels.length > 5 ? 5 : this.otels.length
      console.log(this.otels.reverse())
    }
  },
  methods: {
    pageChanged(page) {
      this.currentPage = page
    },
    goAddOtel () {
      this.$router.push('/AddOtel')
    },
    pointUp (otel) {
      let newOtel = this.otels.find(hotel => hotel.index === otel.index)
      console.log(otel)
      console.log(newOtel)
      console.log(newOtel.Points)
      console.log(parseFloat(newOtel.Points))
      newOtel.Points = newOtel.Points + 1
      newOtel.createdAt = new Date().toLocaleString()
      console.log(newOtel.Points, newOtel.createdAt)
      this.otels[this.otels.indexOf(otel)] = newOtel
      this.otels.sort((a, b) => {
        return b.Points - a.Points || new Date(b.createdAt) - new Date(a.createdAt)
      })
      localStorage.setItem("otels", JSON.stringify(this.otels))
    },
    pointDown (otel) {
      let newOtel = this.otels.find(hotel => hotel.index === otel.index)
      console.log(otel)
      console.log(newOtel)
      newOtel.Points = newOtel.Points - 1
      newOtel.createdAt = new Date().toLocaleString()
      console.log(newOtel.Points, newOtel.createdAt)
      this.otels[this.otels.indexOf(otel)] = newOtel
      this.otels.sort((a, b) => {
        return b.Points - a.Points || new Date(b.createdAt) - new Date(a.createdAt)
      })
      localStorage.setItem("otels", JSON.stringify(this.otels))
    },
    deleteOtel (otel) {
      console.log(otel)
      console.log(otel.index)
      if (confirm( otel.OtelName + "'i silmek istediginizden emin misiniz?")) {
        this.otels = this.otels.filter(hotel => hotel.index !== otel.index)
        console.log(this.otels)
        localStorage.setItem("otels", JSON.stringify(this.otels))
      }
    },
    sortIncrease () {
      this.clickedIncrease = true
      this.clickedDecrease = false
      this.otels = this.otels.sort((a, b) => a.Points - b.Points)
      localStorage.setItem("otels", JSON.stringify(this.otels))
    },
    sortDecrease () {
      this.clickedDecrease = true
      this.clickedIncrease = false
      this.otels = this.otels.sort((a, b) => b.Points - a.Points)
      localStorage.setItem("otels", JSON.stringify(this.otels))
    }
  }
}
</script>
<style>
  .home {
    width: 50%;
    margin-inline-start: 24%;
  }
  .bv-example-row {
    margin-top: 5%;
  }
  .pointTicket {
    background-color: #74EBD5;
    background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
    border-radius: 10px;
    color: white;
    font-family: "Gill Sans", sans-serif;
  }
  .pagination {
    margin-inline-start: 20%;
  }
  .cardHeader {
    font-size: 20px;
    font-family: "Gill Sans", sans-serif;
  }
  .delete {
    display: none;
    width: 20px; 
    height: 20px; 
    color: red;
  }
  .delete:hover {
    display: block;
  }
  #itemList:hover {  
    text-decoration: none;
    max-width: 600px;
    border: 2px solid #17a2b8;
    font-size: 1.5rem;
    color: var(--color);
    transition: all 200ms ease-out;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
  .page-item {
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
</style>
