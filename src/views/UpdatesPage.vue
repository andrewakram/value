<template>
  <div>
    <!-- Loading -->
    <div class="fixed inset-0 h-dvh flex items-center justify-center bg-white bg-opacity-90 z-50" v-if="loading">
      <div class="border-4 border-y-ambassador-blue border-x-inherit border-solid w-10 h-10 rounded-full animate-spin"></div>
    </div>

    <div class="-mt-24 bg-no-repeat bg-cover updates-cover pt-40 pb-8">
      <div class="max-w-screen-2xl mx-auto xl:px-20 lg:px-16 md:px-12 sm:px-8 px-6">
        <p class="lg:text-7xl md:text-6xl sm:text-5xl text-3xl sm:ltr:text-left sm:rtl:text-right text-center font-bold text-white xl:leading-[115px] sm:leading-tight leading-normal">{{ $t('Improve Decision Making with Enterprise Resource Planning') }}</p>
        <div class="xl:w-1/4 sm:w-1/2 w-full xl:mt-8 mt-12 border border-solid md:py-3 py-2 md:px-5 px-4 rounded-full text-white flex items-center gap-3 bg-[#FFFFFF26]" style="backdrop-filter: blur(8px);">
          <div class="bg-[#E58411] rounded-full w-8 h-8 flex items-center justify-center">
            <span class="material-symbols-rounded text-xl">search</span>
          </div>
          <p class="md:text-lg">{{ $t('Search for articles') }}</p>
        </div>
        <div class="mt-10 flex items-center gap-2 text-white justify-end">
          <p class="md:text-lg">{{ $t('Explore More') }}</p>
          <span class="material-symbols-rounded">south</span>
        </div>
      </div>
    </div>

    <div class="md:mt-28 mt-20 max-w-screen-2xl mx-auto xl:px-20 lg:px-16 md:px-12 sm:px-8 px-6">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <div v-if="updates.length > 0" @click="goToupdateDetails(updates[0])" class="cursor-pointer">
          <img :src="updates[0].image" class="w-full h-[380px] object-cover" alt="image">
          <div class="xl:mt-5 mt-4">
            <p class="text-rainmaker text-sm font-light">{{ updates[0].created }}</p>
            <p class="lg:my-4 my-2 font-medium lg:text-xl text-lg">{{ updates[0][`title_${$i18n.locale}`] }}</p>
            <p class="lg:text-base text-sm text-rainmaker ellipsis-4" v-html="updates[0][`content_${$i18n.locale}`] ? updates[0][`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
          </div>
        </div>
        <div v-if="updates.slice(1).length > 0">
          <div v-for="(item, index) in updates.slice(1)" :key="index" class="flex flex-col lg:gap-5 gap-4">
            <div @click="goToupdateDetails(item)" class="cursor-pointer flex sm:items-start items-center xl:gap-6 gap-4">
              <div class="xl:w-1/3 lg:h-full sm:w-auto w-1/3">
                <img :src="item.image" class="w-full" alt="image">
              </div>
              <div class="lg:w-2/3 sm:w-auto w-2/3 flex flex-col xl:gap-3 gap-2 lg:justify-between">
                <p class="text-rainmaker sm:text-sm text-xs font-light">{{ item.created }}</p>
                <p class="font-medium xl:text-lg md:text-base sm:text-sm text-xs overflow-hidden text-ellipsis" v-html="item[`content_${$i18n.locale}`] ? item[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''" style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4;"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="allData.length > 0" class="md:mt-28 mt-20 max-w-screen-2xl mx-auto xl:px-20 lg:px-16 md:px-12 sm:px-8 px-6">
      <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 gap-4">
        <div v-for="(item, index) in allData" :key="index" class="border border-solid border-[#F1F3F7] rounded-lg" style="box-shadow: 0px 1px 4px 0px #19213D14;">
          <div @click="goToupdateDetails(item)" class="cursor-pointer">
            <img :src="item.image" class="rounded-tl-lg rounded-tr-lg w-full md:h-[270px] h-[200px] bg-cover" alt="image">
            <div class="xl:p-6 p-4">
              <p class="text-liberty-blue font-medium lg:text-xl text-lg">{{ item[`title_${$i18n.locale}`] }}</p>
              <p class="md:mb-4 mb-2 md:mt-2 text-rainmaker text-sm font-light">{{ item.created }}</p>
              <p class="lg:text-base text-sm text-rainmaker ellipsis-5" v-html="item[`content_${$i18n.locale}`] ? item[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
            </div>
          </div>
        </div>
      </div>
      <button v-if="allUpdates.next_page_url" @click="loadUdates(allUpdates.current_page + 1)" class="flex items-center gap-2 m-auto mt-6">
        <span>{{ $t('Load More') }}</span>
        <span class="material-symbols-rounded text-xl">south</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      allUpdates: {},
      updates: [],
      allData: [],
      loading: false
    }
  },
  methods: {
    goToupdateDetails (updateItem) {
      this.$router.push({
        name: 'update-details',
        params: {
          id: updateItem.id
        }
      }).catch(() => {})
    },
    async loadUdates (currentPage) {
      this.loading = true;
      try {
        const response = await axios.get(`https://value.modern-speed.com/api/updates?page=${currentPage}`);
        this.allUpdates = response.data.data.all_updates
        this.allData = [...this.allData, ...this.allUpdates.data].flat()
        this.updates = response.data.data.data
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        this.loading = false;
      }
    }
  },
  created () {
    this.loadUdates(1)
  }
}
</script>

<style>
.updates-cover {
  background-image: url('../assets/images/updates-cover.svg');
}
.ellipsis-5 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ellipsis-4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>