<template>
  <div>
    <!-- Loading -->
    <div class="fixed inset-0 h-dvh flex items-center justify-center bg-white bg-opacity-90 z-50" v-if="loading">
      <div class="border-4 border-y-ambassador-blue border-x-inherit border-solid w-10 h-10 rounded-full animate-spin"></div>
    </div>

    <div class="-mt-24 bg-no-repeat bg-cover module-cover pt-40 pb-16 mb-14">
      <div class="max-w-screen-2xl mx-auto xl:px-20 lg:px-16 md:px-12 sm:px-8 px-6">
        <div class="text-white text-center">
          <p class="font-bold lg:text-4xl sm:text-3xl text-2xl md:mb-6 mb-4">{{ moduleDescription[`title_${$i18n.locale}`] }}</p>
          <p class="md:text-lg md:leading-8" v-html="moduleDescription[`content_${$i18n.locale}`] ? moduleDescription[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
        </div>
      </div>
    </div>

    <template v-if="moduleData.length > 0">
      <div v-for="(item, index) in moduleData" :key="index" class="mt-6">
        <template v-if="['left', 'right'].includes(item.position_image)">
          <div :class="`flex ${item.position_image === 'right' ? 'sm:flex-row' : 'sm:flex-row-reverse'} flex-col-reverse xl:gap-10 gap-6 items-center max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6`">
            <div class="text-legal-eagle sm:w-1/2">
              <p class="font-bold md:text-2xl sm:text-xl text-lg">{{ item[`title_${$i18n.locale}`] }}</p>
              <p class="md:leading-6 lg:mt-6 sm:mt-4 mt-2 md:text-base text-sm" v-html="item[`content_${$i18n.locale}`] ? item[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
            </div>
            <div class="sm:w-1/2 w-3/4 sm:pt-12">
              <img :src="item.image" :class="`w-full object-cover max-h-[400px] max-w-[400px] ${item.position_image === 'right' ? 'ms-auto' : 'me-auto'}`" alt="image">
            </div>
          </div>
        </template>
        <template v-else-if="item.position_image === 'center'">
          <div class="text-legal-eagle text-center sm:mt-14 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6">
            <p class="font-bold sm:text-2xl text-xl max-w-2xl m-auto">{{ item[`title_${$i18n.locale}`] }}</p>
            <p class="max-w-4xl m-auto md:leading-6 sm:mt-4 mt-2 sm:text-base text-sm" v-html="item[`content_${$i18n.locale}`] ? item[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
            <img :src="item.image" class="m-auto object-cover md:mt-8 mt-4 max-h-[400px]" alt="image">
          </div>
        </template>
        <template v-else-if="item.position_image === 'full'">
          <div class="xl:mt-20 mt-32 max-w-screen-2xl mx-auto xl:px-20 lg:px-16 md:px-12 sm:px-8 px-6">
            <div class="relative flex xl:flex-row flex-col-reverse xl:items-center md:gap-6 gap-4 bg-no-repeat bg-cover solution-bg rounded-2xl text-white xl:p-12 md:p-8 p-6 w-full">
              <div class="bg-[#EB5757E5] absolute inset-0 rounded-2xl"></div>
              <div class="relative xl:w-[754px]">
                <p class="md:font-bold font-semibold md:text-3xl text-2xl">{{ item[`title_${$i18n.locale}`] }}</p>
                <p class="xl:mt-6 sm:mt-4 mt-2 xl:leading-9 sm:leading-7 leading-tight" v-html="item[`content_${$i18n.locale}`] ? item[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
              </div>
              <div class="relative shrink-0 xl:w-[550px] w-full xl:h-[300px] sm:h-[200px] h-[150px] object-cover xl:-me-[208px] xl:mt-0 md:-mt-[120px] -mt-[80px] rounded-xl overflow-hidden border-2 border-solid border-white">
                <img :src="item.image" class="w-full h-full object-cover" alt="image">
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>

    <testimonials v-if="customersOpinions.length > 0" :customerOpinionDesc="customerOpinionDesc" :customersOpinions="customersOpinions" class="mt-20 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6"/>
    <partners v-if="partners.length > 0" :list="partners" title="Partners of Success" class="mt-20 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6" />

    <div v-if="modulesAdvantages.length > 0" class="mt-20 max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6 mb-8">
      <div class="bg-[#EB5757] rounded-2xl py-8 px-4">
        <p class="text-center text-white" v-html="advantageDesc[`title_${$i18n.locale}`] ? advantageDesc[`title_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
        <div class="mt-8 flex flex-wrap justify-center xl:px-6 px-4 -mb-16">
          <div v-for="(item, index) in modulesAdvantages" :key="index" class="p-2 md:w-1/4 w-full min-w-[270px] shrink-0">
            <div class="shadow-[0px_0px_60px_30px_#00000008] bg-white rounded-[10px] p-4 text-center min-h-[320px]">
              <img :src="item.image" width="64" height="64" class="m-auto" alt="image">
              <p class="mt-6 leading-tight text-[#6D758F]" v-html="item[`title_${$i18n.locale}`] ? item[`title_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Testimonials from '@/components/Testimonials.vue';
import Partners from '@/components/Partners.vue';
import { data } from 'autoprefixer';

export default {
  data () {
    return {
      moduleID: '',
      moduleDescription: {},
      moduleData: [],
      partners: [],
      customersOpinions: [],
      customerOpinionDesc: {},
      advantageDesc: {},
      modulesAdvantages: [],
      loading: false
    }
  },
  watch: {
    '$route.query.moduleID' (val) {
      if (val && val !== this.moduleID) {
        this.loadModuleDetails()
        this.moduleID = val
      }
    },
    '$route.params.lang' () {
      this.$router.push({
        query: {
          moduleID: this.moduleID
        }
      }).catch(() => {})
    }
  },
  methods: {
    async loadModuleDetails () {
      this.loading = true
      try {
        const response = await axios.get(`https://value.modern-speed.com/api/module?category_id=${this.$route.query.moduleID}`);
        this.partners = response.data.data.partners
        this.customersOpinions = response.data.data.module_customers_opinions
        this.customerOpinionDesc = response.data,data.customer_opinion_desc
        this.moduleDescription = response.data.data.module_item ? response.data.data.module_item : {}
        this.moduleData = response.data.data.data
        this.advantageDesc = response.data.data.advantage_desc
        this.modulesAdvantages = response.data.data.modules_advantages
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        this.loading = false;
      }
    }
  },
  components: {
    Testimonials,
    Partners
  },
  created () {
    if (this.$route.query.moduleID && this.$route.query.moduleID !== '') {
      this.moduleID = this.$route.query.moduleID
      this.loadModuleDetails()
    } else {
      this.$router.push({ name: 'home' }).catch(() => {})
    }
  }
}
</script>

<style>
.module-cover {
  background-image: url('../assets/images/slider-img.svg');
}
.solution-bg {
  background-image: url('../assets/images/module-img.png');
}
@media (min-width: 1280px) {
  .solution-bg {
    width: calc(100% - 160px);
  }
}
</style>