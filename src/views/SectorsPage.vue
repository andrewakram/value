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

    <div class="mt-10 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6">
      <div class="border-b border-solid border-[#90A3BF] flex items-center gap-4">
        <div @click="scrollByArrow($i18n.locale === 'en' ? 'left' : 'right')" class="select-none mb-1 md:w-9 md:h-9 h-7 w-7 cursor-pointer shrink-0 flex items-center justify-center border border-solid rounded-full border-[#00000040]">
          <span class="material-symbols-rounded text-[#171717] text-base">{{ $i18n.locale === 'en' ? 'west' : 'east' }}</span>
        </div>
        <div id="tabsContainer" class="tabs w-full overflow-x-auto">
          <div class="flex justify-center gap-2 min-w-fit">
            <div v-for="(tab, index) in tabs" :key="index">
              <p @click="changeTab(tab)" :class="`whitespace-nowrap py-2 md:px-4 px-2 md:text-lg cursor-pointer ${activeTabId === tab.id ? 'border-b-4 border-solid border-[#122340] bg-[#192F52] text-white rounded-tr-md rounded-tl-md' : 'text-[#828282]'}`">
                {{ tab[`name_${$i18n.locale}`] }}
              </p>
            </div>
          </div>
        </div>
        <div @click="scrollByArrow($i18n.locale === 'en' ? 'right' : 'left')" class="select-none mb-1 md:w-9 md:h-9 h-7 w-7 cursor-pointer shrink-0 flex items-center justify-center border border-solid rounded-full border-[#00000040]">
          <span class="material-symbols-rounded text-[#171717] text-base">{{ $i18n.locale === 'en' ? 'east' : 'west' }}</span>
        </div>
      </div>
    </div>
    <modules v-if="modules.length > 0" :modules="modules" class="mt-16 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />
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
      activeTabId: '',
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
      loading: false
    }
  },
  watch: {
    '$route.query.sectorID' (val) {
      if (val && val !== this.sectorID) {
        this.loadSectorTabs()
        this.sectorID = val
        this.resetScroll();
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
    changeTab (tab) {
      this.loadSectorDetails(tab)
    },

    async loadSectorTitle () {
      try {
        const response = await axios.get('https://value.modern-speed.com/api/sectorsModules');
        const sectors = response.data.data.data
        sectors.forEach(element => {
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

    async loadSectorTabs () {
      this.loading = true;
      try {
        const response = await axios.get(`https://value.modern-speed.com/api/sectorSubcategories?category_id=${this.$route.query.sectorID}`);
        this.tabs = response.data.data.data
        this.loadSectorDetails()
        this.loadSectorTitle()
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        // this.loading = false;
      }
    },

    async loadSectorDetails (tab) {
      this.activeTabId = tab ? tab.id : this.tabs.length > 0 ? this.tabs[0].id : ''
      this.loading = true;
      try {
        const response = await axios.get(`https://value.modern-speed.com/api/sectorSubcategories?category_id=${this.$route.query.sectorID}&subCategory_id=${this.activeTabId}`);
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

    scrollToSection(hash) {      
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },

    resetScroll() {
      const scrollContainer = document.querySelector("#tabsContainer");
      if (scrollContainer) {
        scrollContainer.scrollLeft = 0; // Reset the scroll position
      }
    },

    scrollByMouseWheel () {
      const scrollContainer = document.querySelector("#tabsContainer");
      scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
      });
    },

    // Method to scroll the container
    scrollByArrow(direction) {
      const container = document.querySelector("#tabsContainer");
      const scrollAmount = 200; // Adjust scroll distance as needed

      if (direction === 'left') {
        container.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth',
        });
      } else if (direction === 'right') {
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
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
  mounted () {
    this.scrollByMouseWheel()
  },
  created () {
    if (this.$route.query.sectorID && this.$route.query.sectorID !== '') {
      this.sectorID = this.$route.query.sectorID
      this.loadSectorTabs()
    } else {
      this.$router.push({ name: 'home' }).catch(() => {})
    }
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
.module-cover {
  background-image: url('../assets/images/slider-img.svg');
}
</style>