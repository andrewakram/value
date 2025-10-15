<template>
  <div>
    <!-- Loading -->
    <div class="fixed inset-0 h-dvh flex items-center justify-center bg-white bg-opacity-90 z-50" v-if="loading">
      <div class="border-4 border-y-ambassador-blue border-x-inherit border-solid w-10 h-10 rounded-full animate-spin"></div>
    </div>

    <suppliers :countries="countries" class="mt-24 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
    <contact-us class="mt-16 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
    <FAQ v-if="faq.length > 0" :faq="faq" class="mt-16 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
  </div>
</template>

<script>
import axios from 'axios';
import Suppliers from '@/components/Suppliers.vue';
import ContactUs from '@/components/ContactUs.vue';
import FAQ from '@/components/FAQ.vue';

export default {
  data () {
    return {
      faq: [],
      countries: [],
      loading: false
    }
  },
  methods: {
    async loadCountries () {
      this.loading = true;
      try {
        const response = await axios.get('https://value.modern-speed.com/api/countries');
        this.countries = response.data.data.data
        // this.faq = response.data.data.faq
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        this.loading = false;
      }
    },

    async loadContactInformation () {
      this.loading = true;
      try {
        const response = await axios.get('https://value.modern-speed.com/api/ContactInformation');
        this.faq = response.data.data.faq
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        this.loading = false;
      }
    }
  },
  components: {
    Suppliers,
    ContactUs,
    FAQ
  },
  created () {
    this.loadCountries()
    this.loadContactInformation()
  }
}
</script>