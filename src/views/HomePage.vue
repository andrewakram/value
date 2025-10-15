<template>
  <div>
    <!-- Loading -->
    <div class="fixed inset-0 h-dvh flex items-center justify-center bg-white bg-opacity-90 z-50" v-if="loading">
      <div class="border-4 border-y-ambassador-blue border-x-inherit border-solid w-10 h-10 rounded-full animate-spin"></div>
    </div>

    <main-slider @scroll-to-section="scrollToRequestOfferSection" :sliders="sliders" />
    <modules v-if="modules.length > 0" :modules="modules" class="mt-20 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
    <sectors v-if="sectors.length > 0" :sectors="sectors" class="mt-20 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
    <div ref="requestOffer" class="mt-20 pb-20">
      <request-offer :description="description" :contactInfo="contactInfo" />
    </div>
    
    <!-- why do you need value+ -->
    <div v-if="valueAdvantages.length > 0" class="mt-20 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6">
      <div class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        <div class="sm:p-6 p-4 flex items-center justify-center border-e border-solid border-[#EBEBEB]">
          <p class="font-medium sm:text-3xl text-2xl text-[#171717]">{{ $t('why do you need value+') }}</p>
        </div>
        <div class="xl:block hidden border-e border-solid border-[#EBEBEB]"></div>
        <div class="sm:p-6 p-4 flex items-end justify-center">
          <img src="@/assets/images/robot-sm.svg" alt="img">
          <img src="@/assets/images/robot-lg.svg" alt="img">
        </div>
        <div v-for="(item, index) in valueAdvantages" :key="index" class="sm:p-6 p-4 border-e border-solid border-[#EBEBEB]">
          <div class="flex items-center gap-2 text-[#666666]">
            <img :src="item.image" class="w-5 h-5 shrink-0" alt="Image">
            <p>{{ item[`title_${$i18n.locale}`] }}</p>
          </div>
          <p class="mt-3 text-[#171717] sm:text-lg font-medium leading-tight">{{ item[`content_${$i18n.locale}`] }}</p>
        </div>
      </div>
    </div>

    <partners v-if="partners.length > 0" :list="partners" title="Our Clients" class="mt-20 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
    
    <div class="mt-20 relative bg-[#030208] -mb-[10%]">
      <img :src="businessLine.image" class="max-w-screen-xl w-full mx-auto xl:px-32 lg:px-16 md:px-12" alt="business line">
      <div class="bg-white h-[16%] w-full absolute bottom-0"></div>
    </div>

    <!-- partners -->
    <div v-if="partners.length > 0" class="mt-20 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6">
      <div class="relative">
        <p class="material-symbols-rounded absolute -top-6 ltr:-left-6 rtl:-right-6 font-thin text-[#A8A8A8] text-5xl">add</p>
        <div class="grid xl:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          <div class="sm:col-span-2 col-span-1 lg:p-8 sm:p-6 p-4 flex items-center justify-center border-b border-solid border-[#EBEBEB]">
            <p class="font-medium sm:text-3xl text-2xl text-[#171717]">{{ $t('Partners of Success') }}</p>
          </div>
          <div v-for="(item, index) in successPartners" :key="index" class="flex items-center justify-center lg:p-8 sm:p-6 p-4 border-b border-s border-solid border-[#EBEBEB]">
            <img :src="item.image" alt="image">
          </div>
        </div>
        <p class="material-symbols-rounded absolute -bottom-6 ltr:-right-6 rtl:-left-6 font-thin text-[#A8A8A8] text-5xl">add</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MainSlider from '@/components/MainSlider.vue'
import Modules from '@/components/Modules.vue';
import Sectors from '@/components/Sectors.vue';
import RequestOffer from '@/components/RequestOffer.vue';
import Partners from '@/components/Partners.vue';

export default {
  data () {
    return {
      contactInfo: {},
      businessLine: {},
      sectors: [],
      modules: [],
      sliders: [],
      partners: [],
      successPartners: [],
      valueAdvantages: [],
      description: {},
      loading: false,
    }
  },
  methods: {
    async loadHomePage () {
      this.loading = true;
      // this.error = null;
      try {
        const response = await axios.get(`https://value.modern-speed.com/api/homePage`);
        this.sliders = response.data.data.data
        this.contactInfo = response.data.data.contact_us_information
        this.partners = response.data.data.partners
        this.successPartners = response.data.data.success_partners
        this.businessLine = response.data.data.business_line
        this.sectors = response.data.data.sectors_categories
        this.modules = response.data.data.modules
        this.valueAdvantages = response.data.data.value_advantages
        this.description = response.data.data.request_offer_desc
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        this.loading = false;
      }
    },
    scrollToRequestOfferSection() {
      const target = this.$refs.requestOffer;
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  },
  components: {
    MainSlider,
    Modules,
    Sectors,
    RequestOffer,
    Partners
  },
  created () {
    this.loadHomePage()
  }
}
</script>
