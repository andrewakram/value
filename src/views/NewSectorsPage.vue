<template>
    <div>
      <!-- Loading -->
      <div class="fixed inset-0 h-dvh flex items-center justify-center bg-white bg-opacity-90 z-50" v-if="loading">
        <div class="border-4 border-y-ambassador-blue border-x-inherit border-solid w-10 h-10 rounded-full animate-spin"></div>
      </div>
  
      <div class="-mt-24 bg-no-repeat bg-cover module-cover pt-48 pb-24 mb-14">
        <div class="max-w-screen-2xl mx-auto xl:px-20 lg:px-16 md:px-12 sm:px-8 px-6">
          <div class="text-white text-center">
            <p class="font-bold lg:text-4xl sm:text-3xl text-2xl">{{ sectorTitle[`name_${$i18n.locale}`] }}</p>
          </div>
        </div>
      </div>
  
      <div class="bg-white sticky top-0 z-10 mt-5">
        <div class="max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6">
          <div class="flex flex-wrap justify-center py-3">
            <div v-for="(sector, index) in sectorsList" :key="index" :class="`p-3 cursor-pointer border-solid ${sectorID == sector.id ? 'border-b-2 border-[#122340] text-[#122340]' : 'border-b border-[#82828250] text-[#828282]'}`">
              <router-link :to="{name: 'sectors', query: {sectorID: sector.id}}">{{ sector[`name_${$i18n.locale}`] }}</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Sector brief -->
      <div class="mt-10 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6">
        <div class="grid md:grid-cols-3 grid-cols-1 items-center gap-4">
          <div class="md:col-span-2 col-span-1 md:order-1 order-2 text-legal-eagle" v-html="sectorsList.find(sector => sector.id === Number(sectorID))?.[`content_${$i18n.locale}`]"></div>
          <img class="md:order-2 order-1" :src="sectorsList.find(sector => sector.id === Number(sectorID))?.image" alt="image">
        </div>
      </div>
  
      <!-- Links -->
      <div class="mt-16 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6">
        <div class="flex flex-col gap-2">
          <div v-for="(tab, index) in tabs" :key="index">
            <li @click.prevent="scrollToModuleDetails(`module_${tab.id}`)" :class="`w-full md:text-lg cursor-pointer underline hover:text-[#122340]`">
              {{ tab[`name_${$i18n.locale}`] }}
            </li>
          </div>
        </div>
      </div>
  
      <div v-if="modules.length > 0">
        <div v-for="(item, index) in modules" :key="index">
          <modules :id="`module_${item.subCategory_id}`" :modules="[item]" class="pt-20 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
        </div>
      </div>

      <advantages v-if="advantages.length > 0" :advantageDesc="advantageDesc" :advantages="advantages" class="mt-24 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6 overflow-x-hidden" />
      <partners v-if="partners.length > 0" :list="partners" title="Partners of Success" class="mt-24 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
      <testimonials v-if="customersOpinions.length > 0" :customerOpinionDesc="customerOpinionDesc" :customersOpinions="customersOpinions" class="mt-24 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
      <sector-services v-if="sectorsServices.length > 0" :sectorsServices="sectorsServices" class="mt-24 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
      <request-offer id="request-offer" :description="description" :contactInfo="contactInfo" :sectorID="sectorID" class="mt-24"/>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Modules from '@/components/Modules.vue';
  import Advantages from '@/components/Advantages.vue';
  import Partners from '@/components/Partners.vue';
  import Testimonials from '@/components/Testimonials.vue';
  import RequestOffer from '@/components/RequestOffer.vue';
  import SectorServices from '@/components/SectorServices.vue';
  
  export default {
    data () {
      return {
        sectorTitle: '',
        sectorID: '',
        tabs: [],
        partners: [],
        sectorsServices: [],
        customersOpinions: [],
        modules: [],
        advantageDesc: {},
        advantages: [],
        contactInfo: {},
        description: {},
        customerOpinionDesc: {},
        loading: false,
        sectorsList: []
      }
    },
    watch: {
      '$route.query.sectorID' (val) {
        if (val && val !== this.sectorID) {
          this.loadSectorDetails()
          this.sectorID = val
        }
      },
      '$route.params.lang' () {
        this.$router.push({
          query: {
            sectorID: this.sectorID
          }
        }).catch(() => {})
      }
    },
    methods: {
      async loadSectorTitle () {
        try {
          const response = await axios.get('https://value.modern-speed.com/api/sectorsModules');
          this.sectorsList = response.data.data.data
          this.sectorsList.forEach(element => {
            if (element.id === Number(this.sectorID)) {
              this.sectorTitle = element
            }
          });
        } catch (error) {
          // this.error = error.message || 'Something went wrong';
        } finally {
          // this.loading = false;
        }
      },
  
      async loadSectorDetails () {
        this.loading = true;
        try {
          const response = await axios.get(`https://value.modern-speed.com/api/sectorSubcategories?category_id=${this.$route.query.sectorID}`);
          this.loadSectorTitle()
          
          this.tabs = response.data.data.data
          this.partners = response.data.data.partners
          this.customersOpinions = response.data.data.sectors_customers_opinions
          this.modules = response.data.data.sectors_content
          this.advantageDesc = response.data.data.advantage_desc
          this.advantages = response.data.data.sectors_advantages
          this.contactInfo = response.data.data.contact_us_information
          this.description = response.data.data.request_offer_desc
          this.customerOpinionDesc = response.data.data.customer_opinion_desc
          this.sectorsServices = response.data.data.sectors_serves
  
          // Check if the URL contains an anchor link and scroll to the section
          if (window.location.hash) {
            setTimeout(() => {
              this.scrollToSection(window.location.hash);
            }, 500);
          }
        } catch (error) {
          // this.error = error.message || 'Something went wrong';
        } finally {
          this.loading = false;
        }
      },

      scrollToModuleDetails (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      },

      scrollToSection (hash) {    
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    },
    components: {
      Modules,
      Advantages,
      Partners,
      Testimonials,
      RequestOffer,
      SectorServices
    },
    created () {
      if (this.$route.query.sectorID && this.$route.query.sectorID !== '') {
        this.sectorID = this.$route.query.sectorID
        this.loadSectorDetails()
      } else {
        this.$router.push({ name: 'home' }).catch(() => {})
      }
    }
  }
  </script>
  
  <style lang="scss">
  .module-cover {
    background-image: url('../assets/images/slider-img.svg');
  }
  </style>