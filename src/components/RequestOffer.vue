<template>
  <div class="bg-[#F3F8FF] py-12">
    <!-- Loading -->
    <div class="fixed inset-0 h-dvh flex items-center justify-center bg-white bg-opacity-90 z-50" v-if="loading">
      <div class="border-4 border-y-ambassador-blue border-x-inherit border-solid w-10 h-10 rounded-full animate-spin"></div>
    </div>

    <div class="max-w-screen-2xl mx-auto xl:px-32 lg:px-16 md:px-12 sm:px-8 px-6">
      <p class="font-bold text-legal-eagle text-3xl text-center sm:mb-10 mb-6">{{ $t('Request Offer') }}</p>
      
      <div class="grid md:grid-cols-2 grid-cols-1 xl:gap-24 lg:gap-12 sm:gap-6 gap-4">
        <div class="border border-solid border-[#E1E4ED] rounded-lg shadow-sm p-6 flex flex-col justify-between md:gap-10 gap-8">
          <div class="text-sm text-legal-eagle leading-8">
            <div v-html="description[`title_${$i18n.locale}`] ? description[`title_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></div>
          </div>
          <div>
            <div class="xl:w-3/5 lg:w-3/4 w-full flex items-center gap-4 px-5 py-4 bg-white border border-solid border-[#E1E4ED] shadow-sm rounded-md">
              <img src="@/assets/images/Email.png" alt="email">
              <div class="text-sm text-legal-eagle">
                <p>{{ $t('Email') }}:</p>
                <p class="font-semibold">{{ contactInfo.email }}</p>
              </div>
            </div>
            <div class="md:mt-6 mt-4 xl:w-3/5 lg:w-3/4 w-full flex items-center gap-4 px-5 py-4 bg-white border border-solid border-[#E1E4ED] shadow-sm rounded-md">
              <img src="@/assets/images/Phone.png" alt="email">
              <div class="text-sm text-legal-eagle">
                <p>{{ $t('Phone') }}:</p>
                <p class="font-semibold">{{ contactInfo.phone }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-solid border-[#E1E4ED] rounded-lg shadow-sm p-6 text-legal-eagle grid grid-cols-2 gap-4">
          <div class="md:col-span-2 col-span-1">
            <label class="text-sm font-semibold mb-1.5 block" for="fullName">{{ $t('Full Name') }}</label>
            <input v-model="dataObj.full_name" :placeholder="$t('Full Name')" class="w-full border border-solid border-[#F1F3F7] shadow-sm rounded-md text-sm outline-none p-4" type="text" id="fullName" />
            <span v-if="!valid.full_name" class="text-red-500 text-xs">{{ $t('Full Name must be at least 3 characters') }}</span>
          </div>
          <div class="col-span-2">
            <label class="text-sm font-semibold mb-1.5 block" for="email">{{ $t('Email') }}</label>
            <input v-model="dataObj.email" :placeholder="$t('Email')" class="w-full border border-solid border-[#F1F3F7] shadow-sm rounded-md text-sm outline-none p-4" type="text" id="email" />
            <span v-if="!valid.email" class="text-red-500 text-xs">{{ $t('Please enter a valid email') }}</span>
          </div>
          <div class="lg:col-span-1 md:col-span-2 sm:col-span-1 col-span-2">
            <label class="text-sm font-semibold mb-1.5 block" for="businessSector">{{ $t('Business Sector') }}</label>
            <select :disabled="$route.name === 'sectors'" v-model="dataObj.category_id" id="businessSector" class="w-full bg-white border border-solid border-[#F1F3F7] shadow-sm rounded-md text-sm outline-none p-4">
              <option value="" disabled selected>{{ $t('Business Sector') }}</option>
              <option v-for="(item, index) in sectors" :key="index" :value="item.id">{{ item[`name_${$i18n.locale}`] }}</option>
            </select>
            <span v-if="!valid.category_id" class="text-red-500 text-xs">{{ $t('Business Sector is required') }}</span>
          </div>
          <div class="lg:col-span-1 md:col-span-2 sm:col-span-1 col-span-2">
            <label class="text-sm font-semibold mb-1.5 block" for="businessSector">{{ $t('Company Size') }}</label>
            <select v-model="dataObj.company_size" id="businessSector" class="w-full bg-white border border-solid border-[#F1F3F7] shadow-sm rounded-md text-sm outline-none p-4">
              <option value="" disabled selected>{{ $t('Company Size') }}</option>
              <option v-for="(item, index) in sizes" :key="index" :value="item">{{ item }}</option>
            </select>
            <span v-if="!valid.company_size" class="text-red-500 text-xs">{{ $t('Company Size is required') }}</span>
          </div>
          <div class="lg:col-span-1 md:col-span-2 sm:col-span-1 col-span-2">
            <label class="text-sm font-semibold mb-1.5 block" for="country">{{ $t('Country') }}</label>
            <select v-model="dataObj.country_id" id="country" class="w-full bg-white border border-solid border-[#F1F3F7] shadow-sm rounded-md text-sm outline-none p-4">
              <option value="" disabled selected>{{ $t('Country') }}</option>
              <option v-for="(item, index) in countries" :key="index" :value="item.id">{{ item[`name_${$i18n.locale}`] }}</option>
            </select>
            <span v-if="!valid.country_id" class="text-red-500 text-xs">{{ $t('Country is required') }}</span>
          </div>
          <div class="lg:col-span-1 md:col-span-2 sm:col-span-1 col-span-2">
            <label class="text-sm font-semibold mb-1.5 block" for="region">{{ $t('Region') }}</label>
            <input v-model="dataObj.region" :placeholder="$t('Region')" class="w-full border border-solid border-[#F1F3F7] shadow-sm rounded-md text-sm outline-none p-4" type="text" id="region" />
            <span v-if="!valid.region" class="text-red-500 text-xs">{{ $t('Region is required') }}</span>
          </div>
          <div class="lg:col-span-1 md:col-span-2 sm:col-span-1 col-span-2">
            <label class="text-sm font-semibold mb-1.5 block" for="phone">{{ $t('Phone') }}</label>
            <input v-model="dataObj.phone" :placeholder="$t('Phone')" class="w-full border border-solid border-[#F1F3F7] shadow-sm rounded-md text-sm outline-none p-4" type="text" id="phone" />
            <span v-if="!valid.phone" class="text-red-500 text-xs">{{ $t('Please enter a valid phone number') }}</span>
          </div>
          <div class="lg:col-span-1 md:col-span-2 sm:col-span-1 col-span-2">
            <label class="text-sm font-semibold mb-1.5 block" for="companyName">{{ $t('Company Name') }}</label>
            <input v-model="dataObj.company_name" :placeholder="$t('Company Name')" class="w-full border border-solid border-[#F1F3F7] shadow-sm rounded-md text-sm outline-none p-4" type="text" id="companyName" />
            <span v-if="!valid.company_name" class="text-red-500 text-xs">{{ $t('Company Name must be at least 3 characters') }}</span>
          </div>
          <div class="col-span-2">
            <label class="text-sm font-semibold mb-1.5 block" for="message">{{ $t('Message') }}</label>
            <textarea v-model="dataObj.message" id="message" :placeholder="$t('Type your message here...')" rows="3" class="resize-none w-full border border-solid border-[#F1F3F7] shadow-sm rounded-md text-sm outline-none p-4"></textarea>
            <span v-if="!valid.message" class="text-red-500 text-xs">{{ $t('Message must be at least 5 characters') }}</span>
          </div>
          <div class="col-span-2">
            <button @click="sendForm()" class="flex items-center gap-1 bg-[#081639] rounded-md text-sm font-semibold text-white px-4 py-3">
              <span>{{ $t('Send message') }}</span>
              <span class="material-symbols-outlined text-xl">{{ $i18n.locale === 'en' ? 'arrow_right_alt' : 'arrow_left_alt'}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['contactInfo', 'description', 'sectorID'],
  data () {
    return {
      loading: false,
      sizes: ['1-10', '11-50', '51-200', '201-500', '501+'],
      countries: [],
      sectors: [],
      dataObj: {
        full_name: '',
        email: '',
        phone: '',
        category_id: '',
        company_size: '',
        country_id: '',
        company_name: '',
        region: '',
        message: ''
      },
      valid: {
        full_name: true,
        email: true,
        phone: true,
        category_id: true,
        company_size: true,
        country_id: true,
        company_name: true,
        region: true,
        message: true
      }
    }
  },
  computed: {
    emailValid () {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(this.dataObj.email);
    },
    phoneValid () {
      const regex = /^[0-9]{11}$/;
      return regex.test(this.dataObj.phone);
    },
    fullNameValid() {
      return this.dataObj.full_name.length >= 3;
    },
    companyValid() {
      return this.dataObj.company_name.length >= 3;
    },
    messageValid() {
      return this.dataObj.message.length >= 5;
    }
  },
  methods: {
    validateForm () {
      this.valid.full_name = this.fullNameValid;
      this.valid.category_id = this.dataObj.category_id !== '';
      this.valid.company_size = this.dataObj.company_size !== '';
      this.valid.country_id = this.dataObj.country_id !== '';
      this.valid.email = this.emailValid;
      this.valid.phone = this.phoneValid;
      this.valid.company_name = this.companyValid;
      this.valid.region = this.dataObj.region !== '';
      this.valid.message = this.messageValid;
    },
    async sendForm () {
      this.validateForm();
      if (Object.values(this.valid).every((v) => v === true)) {
        this.dataObj.last_name = this.dataObj.full_name
        this.dataObj.first_name = this.dataObj.full_name
        this.loading = true;
        try {
          await axios.post('https://value.modern-speed.com/api/contact/offer', this.dataObj);
          this.dataObj = {
            full_name: '',
            email: '',
            phone: '',
            category_id: this.sectorID ? Number(this.sectorID) : '',
            company_size: '',
            country_id: '',
            company_name: '',
            region: '',
            message: ''
          }
        } catch (error) {
          // this.error = error.message || 'Something went wrong';
        } finally {
          this.loading = false;
        }
      }
    },
    async loadSectorsList () {
      try {
        const response = await axios.get('https://value.modern-speed.com/api/sectorsModules');
        this.sectors = response.data.data.data
        this.countries = response.data.data.countries
        this.dataObj.category_id = this.sectorID ? Number(this.sectorID) : ''

      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        // this.loading = false;
      }
    }
  },
  created () {
    this.loadSectorsList()
  }
}
</script>