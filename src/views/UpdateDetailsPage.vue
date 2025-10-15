<template>
  <div class="max-w-screen-2xl mx-auto xl:px-20 lg:px-16 md:px-12 sm:px-8 px-6">
    <!-- Loading -->
    <div class="fixed inset-0 h-dvh flex items-center justify-center bg-white bg-opacity-90 z-50" v-if="loading">
      <div class="border-4 border-y-ambassador-blue border-x-inherit border-solid w-10 h-10 rounded-full animate-spin"></div>
    </div>

    <!-- Main update -->
    <div class="lg:mt-20 mt-10" style="box-shadow: 0px 0px 50px 0px #00000038;">
      <img :src="updateDetails.image" class="w-full max-h-[550px] object-cover" alt="image">
    </div>
    <div class="mt-10">
      <p class="text-rainmaker text-sm font-light">{{ updateDetails.created }}</p>
      <p class="font-medium lg:text-3xl sm:text-2xl text-xl mt-2">{{ updateDetails[`title_${$i18n.locale}`] }}</p>
      <p class="mt-6 font-light lg:text-lg sm:text-base" v-html="updateDetails[`content_${$i18n.locale}`] ? updateDetails[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
    </div>

    <!-- Sub Updates -->
    <div v-for="(item, index) in updateDetails.sub" :key="index">
      <div class="lg:mt-20 mt-10" style="box-shadow: 0px 0px 50px 0px #00000038;">
        <img :src="item.image" class="w-full max-h-[550px] object-cover" alt="image">
      </div>
      <div class="mt-10">
        <p class="text-rainmaker text-sm font-light">{{ item.created }}</p>
        <p class="font-medium lg:text-3xl sm:text-2xl text-xl mt-2">{{ item[`title_${$i18n.locale}`] }}</p>
        <p class="mt-6 font-light lg:text-lg sm:text-base" v-html="item[`content_${$i18n.locale}`] ? item[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      updateDetails: [],
      loading: false
    }
  },
  methods: {
    async loadUpdateDetails () {
      this.loading = true;
      try {
        const response = await axios.get('https://value.modern-speed.com/api/updates');
        const updates = response.data.data.all_updates.data;
        this.updateDetails = updates.find(update => update.id === Number(this.$route.params.id));
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        this.loading = false;
      }
    }
  },
  created () {
    this.loadUpdateDetails()
  }
}
</script>