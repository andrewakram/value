<template>
  <div class="mt-10 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6">
    <!-- Loading -->
    <div class="fixed inset-0 h-dvh flex items-center justify-center bg-white bg-opacity-90 z-50" v-if="loading">
      <div class="border-4 border-y-ambassador-blue border-x-inherit border-solid w-10 h-10 rounded-full animate-spin"></div>
    </div>

    <div class="tabs w-full overflow-x-auto border-b border-solid border-[#90A3BF]">
      <div class="flex justify-center md:gap-6 gap-2 min-w-fit">
        <div v-for="(tab, index) in tabs" :key="index">
          <p @click="changeTab(tab)" :class="`whitespace-nowrap pb-4 md:px-4 px-2 md:text-lg cursor-pointer ${activeTabId === tab.id ? 'text-black border-b-4 border-solid border-[#F2994A]' : 'text-[#828282]'}`">
            {{ tab[`name_${$i18n.locale}`] }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="partners.length === 0">
      <p class="text-center mt-20 text-rainmaker">{{ $t('No data available') }}</p>
    </div>
    <div v-else class="lg:mt-20 sm:mt-14 mt-8 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-2 lg:gap-y-20 sm:gap-y-14 gap-y-8">
      <div v-for="(item, index) in partners" :key="index" class="sm:p-5 p-3 text-center flex justify-center items-center" style="box-shadow: 0px 0px 21.79px 0px #0000000A;">
        <img :src="item.image" class="m-auto" alt="logo">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      activeTabId: '',
      tabs: [
        {
          id: '',
          name_en: 'All',
          name_ar: 'الكل'
        }
      ],
      partners: [],
      loading: false
    }
  },
  methods: {
    changeTab (tab) {
      this.activeTabId = tab.id
      this.loadPartners(tab)
    },
    async loadPartners (tab) {
      this.loading = true;
      // this.error = null;
      try {
        const response = await axios.get(`https://value.modern-speed.com/api/partners?category_id=${tab.id}`);
        this.tabs = [{ id: '', name_en: 'All', name_ar: 'الكل' }, ...(response.data?.data?.data || [])]
        this.partners = response.data.data.partners
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        this.loading = false;
      }
    }
  },
  created () {
    this.loadPartners(this.tabs[0])
  }
}
</script>

<style lang="scss">
.tabs {
  &::-webkit-scrollbar {
    display: none !important;
  }
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
</style>