<template>
  <div>
    <p class="text-center font-bold text-legal-eagle text-3xl mb-2">{{ $t('Suppliers') }}</p>
    <p class="text-center text-dull font-medium sm:text-lg">{{ $t('Select any supplier and Contact with him') }}</p>

    <div class="md:mt-14 mt-7 flex flex-wrap justify-center gap-3">
      <div v-for="(supplier, index) in countries" :key="index">
        <div @click="supplierInfo = supplier" :class="`${supplierInfo.id === supplier.id ? 'bg-[#F3F8FF]' : ''} lg:w-[200px] w-auto flex items-center lg:gap-2 gap-1 py-4 px-3 lg:rounded-2xl rounded-xl shadow-[0px_4px_12px_0px_#00000040] cursor-pointer select-none`">
          <img :src="supplier.image" alt="Supplier Logo" class="lg:w-[50px] w-[30px] lg:h-[40px] h-[20px]" />
          <p class="text-black lg:text-base text-sm">{{ supplier.name }}</p>
        </div>
      </div>
    </div>

    <div v-if="supplierInfo && supplierInfo.contact_info" class="md:mt-14 mt-7 xl:flex grid grid-cols-2 gap-x-6 gap-y-10 rounded-[20px] lg:p-14 sm:p-10 p-6 bg-no-repeat bg-cover bg-center suppliers-bg">
      <div class="md:col-span-1 col-span-2 text-white flex flex-col xl:gap-7 gap-5 xl:whitespace-nowrap">
        <p class="font-bold text-2xl">Contact Information</p>
        <p class="text-[#C9C9C9]">{{ supplierInfo.contact_info[0][`desc_${$i18n.locale}`] }}</p>
        <p v-html="supplierInfo.contact_info[0][`work_hours_${$i18n.locale}`] ? supplierInfo.contact_info[0][`work_hours_${$i18n.locale}`].replace(/\r?\n/g, '<br>') : ''"></p>
        
        <div class="flex items-center gap-4">
          <div v-for="(item, index) in supplierInfo.social_media" :key="index" class="w-8 h-8 rounded-full bg-black flex items-center justify-center p-2 cursor-pointer hover:bg-[#12284A]">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">
              <img class="max-w-4 max-h-4" :src="item.image" :alt="item.type">
            </a>
          </div>
        </div>
      </div>

      <div class="md:col-span-1 col-span-2 text-white flex flex-col xl:gap-7 gap-5">
        <div class="flex gap-4">
          <p class="material-symbols-rounded">phone_in_talk</p>
          <p>{{ supplierInfo.contact_info[0].phone }}</p>
        </div>
        <div class="flex gap-4">
          <p class="material-symbols-rounded">mail</p>
          <p>{{ supplierInfo.contact_info[0].email }}</p>
        </div>
        <div class="flex gap-4">
          <p class="material-symbols-rounded">location_on</p>
          <p>{{ supplierInfo.contact_info[0].address }}</p>
        </div>
      </div>

      <div class="col-span-2 xl:min-w-[375px] min-w-full h-[230px]">
        <google-map :center="{ lat: Number(supplierInfo.contact_info[0].lat), lng: Number(supplierInfo.contact_info[0].lng) }" />
      </div>
    </div>

  </div>
</template>

<script>
import GoogleMap from '@/components/GoogleMap.vue'

export default {
  props: ['countries'],
  data () {
    return {
      supplierInfo: {},
    }
  },
  watch: {
    'countries' (val) {
      if (val.length > 0) {
        this.supplierInfo = val[0]
      }
    }
  },
  components: {
    GoogleMap
  }
}
</script>

<style>
.suppliers-bg {
  background-image: url('../assets/images/contact-bg.svg');
}
</style>