<template>
  <div>
    <div class="bg-ambassador-blue text-white">
      <div class="max-w-screen-2xl mx-auto xl:px-20 md:p-12 sm:p-8 p-6">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
          <div class="flex xl:gap-20 lg:gap-14 gap-10 md:justify-start justify-between flex-wrap md:order-1 order-2">
            <div class="leading-7">
              <p class="font-medium mb-2">{{ $t('Sectors') }}</p>
              <div v-for="(item, index) in sectorsList" :key="index">
                <router-link :to="{name: 'sectors', query: {sectorID: item.id}}" class="block font-light">{{ item[`name_${$i18n.locale}`] }}</router-link>
              </div>
            </div>
            <div class="leading-7">
              <router-link :to="{name: 'clients'}" class="font-medium mb-2 block">{{ $t('Clients') }}</router-link>
              <router-link :to="{name: 'updates'}" class="font-medium mb-2 block">{{ $t('Updates') }}</router-link>
              <router-link :to="{name: 'contact-us'}" class="font-medium mb-2 block">{{ $t('Contact Us') }}</router-link>
            </div>
          </div>
            
          <div class="text-center md:order-2 order-1">
            <img src="@/assets/images/logo-white.svg" class="w-32 m-auto" alt="logo">
            <div class="mt-8 pb-4 ltr:text-left rtl:text-right leading-5 font-medium text-xs border-b border-solid border-white">
              <!-- <p>{{ 'Modern Speed is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.' }}</p>
              <p>{{ 'Modern Speed unique value proposition is to be at the same time very easy to use and fully integrated.' }}</p> -->
              <p class="font-bold text-xl mb-2">{{ $t('Certified by') }}:</p>
              <div class="flex gap-2 items-center justify-center">
                <div v-for="(item, index) in footerData.certified" :key="index">
                  <img :src="item.image" alt="logo">
                </div>
              </div>
            </div>
            <div class="flex justify-between gap-4 mt-4">
              <div class="flex gap-3 items-center justify-center">
                <div v-for="(item, index) in footerData.social_media" :key="index">
                  <a :href="item.link" target="_blank" rel="noopener noreferrer">
                    <img class="max-w-5 max-h-5" :src="item.image" :alt="item.type">
                  </a>
                </div>
              </div>
              <div @click="changeLocale()" class="w-fit ms-auto flex gap-1 items-center cursor-pointer select-none py-1 px-2 rounded-md border border-solid bg-[#F8FAFF1A] border-white">
                <p class="text-sm text-white">{{ $t('English') }}</p>
                <img :src="$route.params.lang === 'en' ? arFlag : enFlag" class="w-4 h-4 rounded-full" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#122340] text-center p-2">
      <p class="text-[#EDEDED] text-sm font-light">{{ 'Copyright © 2024 Modern Speed.' }}</p>
    </div>
  </div>
</template>

<script>
import arFlag from '@/assets/images/lang-ar.png'
import enFlag from '@/assets/images/lang-en.png'
import axios from 'axios';

export default {
  data () {
    return {
      arFlag,
      enFlag,
      footerData: {},
      sectorsList: []
    }
  },
  methods: {
    changeLocale () {
      this.$router.push({
        params: {
          lang: this.$route.params.lang === 'en' ? 'ar' : 'en'
        }
      })
    },
    async loadFooterData () {
      try {
        const response = await axios.get('https://value.modern-speed.com/api/footer');
        this.footerData = response.data.data
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        // this.loading = false;
      }
    },
    async loadSectorsList () {
      try {
        const response = await axios.get('https://value.modern-speed.com/api/sectorsModules');
        this.sectorsList = response.data.data.data
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        // this.loading = false;
      }
    }
  },
  created () {
    this.loadFooterData()
    this.loadSectorsList()
  }
}
</script>