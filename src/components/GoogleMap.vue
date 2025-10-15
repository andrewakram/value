<template>
  <GoogleMap api-key="" :center="center" :zoom="7" style="width: 100%; height: 100%">
    <GoogleMarker :options="{ position: center }" />
    <!-- <MarkerCluster>
      <GoogleMarker
        v-for="(location, i) in locations"
        :key="i"
        :options="{ position: location }"
      />
    </MarkerCluster> -->
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker as GoogleMarker } from 'vue3-google-map'

export default {
  props: ['center'],
  data () {
    return {
      // locations: [
      //   { lat: -33.718234, lng: 150.363181 },
      //   { lat: -33.727111, lng: 150.371124 },
      //   { lat: -33.848588, lng: 151.209834 },
      //   { lat: -33.851702, lng: 151.216968 },
      //   { lat: -34.671264, lng: 150.863657 },
      //   { lat: -35.304724, lng: 148.662905 },
      //   { lat: -36.817685, lng: 175.699196 },
      //   { lat: -36.828611, lng: 175.790222 }
      // ]
    }
  },
  components: {
    GoogleMap,
    GoogleMarker
  }
}
</script>