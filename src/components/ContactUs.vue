<template>
  <div>
    <!-- Loading -->
    <div class="fixed inset-0 h-dvh flex items-center justify-center bg-white bg-opacity-90 z-50" v-if="loading">
      <div class="border-4 border-y-ambassador-blue border-x-inherit border-solid w-10 h-10 rounded-full animate-spin"></div>
    </div>

    <p class="text-center font-bold text-legal-eagle text-3xl mb-2">{{ $t('Contact US') }}</p>
    <p class="text-center text-dull font-medium sm:text-lg">{{ $t('Any question or remarks? Just write us a message!') }}</p>
    
    <div class="mt-7 bg-white rounded-xl md:p-14 sm:p-10 p-6" style="box-shadow: 0px 0px 60px 30px #00000008;">
      <div class="text-night-sky grid sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-6">
        <div class="md:col-span-1 sm:col-span-1 col-span-2">
          <label for="firstName" class="block mb-2">{{ $t('First Name') }}</label>
          <input v-model="dataObj.first_name" id="firstName" type="text" :placeholder="$t('Add First Name')" class="text-sm w-full border border-solid border-[#F2F2F2] rounded-md outline-none py-3 px-4">
          <span v-if="!valid.first_name" class="text-red-500 text-xs">{{ $t('First Name is required') }}</span>
        </div>
        <div class="md:col-span-1 sm:col-span-1 col-span-2">
          <label for="lastName" class="block mb-2">{{ $t('Last Name') }}</label>
          <input v-model="dataObj.last_name" id="lastName" type="text" :placeholder="$t('Add Last Name')" class="text-sm w-full border border-solid border-[#F2F2F2] rounded-md outline-none py-3 px-4">
          <span v-if="!valid.last_name" class="text-red-500 text-xs">{{ $t('Last Name is required') }}</span>
        </div>
        <div class="md:col-span-1 sm:col-span-1 col-span-2">
          <label for="email" class="block mb-2">{{ $t('Email') }}</label>
          <input v-model="dataObj.email" id="email" type="text" :placeholder="$t('Add Email')" class="text-sm w-full border border-solid border-[#F2F2F2] rounded-md outline-none py-3 px-4">
          <span v-if="!valid.email" class="text-red-500 text-xs">{{ $t('Please enter a valid email') }}</span>
        </div>
        <div class="md:col-span-1 sm:col-span-1 col-span-2">
          <label for="phone" class="block mb-2">{{ $t('Phone Number') }}</label>
          <input v-model="dataObj.phone" id="phone" type="text" :placeholder="$t('Add Phone Number')" class="text-sm w-full border border-solid border-[#F2F2F2] rounded-md outline-none py-3 px-4">
          <span v-if="!valid.phone" class="text-red-500 text-xs">{{ $t('Please enter a valid phone number') }}</span>
        </div>

        <div class="col-span-2">
          <p class="mb-3">{{ $t('Select Subject?') }}</p>
          <div class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-y-2 gap-x-4">
            <div class="subject ms-5 items-center">
              <input v-model="dataObj.type" value="sales" type="radio" class="cursor-pointer" name="subject" id="sales">
              <label class="relative cursor-pointer text-xs text-black" for="sales">{{ $t('Sales') }}</label>
            </div>
            <div class="subject ms-5 items-center">
              <input v-model="dataObj.type" value="technical_support" type="radio" class="cursor-pointer" name="subject" id="technicalSupport">
              <label class="relative cursor-pointer text-xs text-black" for="technicalSupport">{{ $t('Technical support') }}</label>
            </div>
            <div class="subject ms-5 items-center">
              <input v-model="dataObj.type" value="partnerships" type="radio" class="cursor-pointer" name="subject" id="partnerships">
              <label class="relative cursor-pointer text-xs text-black" for="partnerships">{{ $t('Partnerships') }}</label>
            </div>
            <div class="subject ms-5 items-center">
              <input v-model="dataObj.type" value="general_inquiry" type="radio" class="cursor-pointer" name="subject" id="generalInquiry">
              <label class="relative cursor-pointer text-xs text-black" for="generalInquiry">{{ $t('General Inquiry') }}</label>
            </div>
          </div>
          <span v-if="!valid.type" class="text-red-500 text-xs">{{ $t('Subject is required') }}</span>
        </div>

        <div class="col-span-2">
          <label for="message" class="block mb-2">{{ $t('Message') }}</label>
          <textarea v-model="dataObj.message" name="message" id="message" :placeholder="$t('Write your message')" rows="3" class="resize-none text-sm w-full border border-solid border-[#F2F2F2] rounded-md outline-none py-3 px-4"></textarea>
          <span v-if="!valid.message" class="text-red-500 text-xs">{{ $t('Message must be at least 5 characters') }}</span>
        </div>

        <div class="col-span-2">
          <button @click="sendForm()" class="w-full bg-[#E84E0C] text-white rounded-lg font-medium md:text-base text-sm py-3 px-8">{{ $t('Send') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['contactInfo'],
  data () {
    return {
      loading: false,
      dataObj: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        type: '',
        message: ''
      },
      valid: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        type: true,
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
    messageValid() {
      return this.dataObj.message.length >= 5;
    }
  },
  methods: {
    validateForm () {
      this.valid.first_name = this.dataObj.first_name.trim() !== '';
      this.valid.last_name = this.dataObj.last_name.trim() !== '';
      this.valid.email = this.emailValid;
      this.valid.phone = this.phoneValid;
      this.valid.type = this.dataObj.type.trim() !== '';
      this.valid.message = this.messageValid;
    },
    async sendForm () {
      this.validateForm();
      if (Object.values(this.valid).every((v) => v === true)) {
        this.loading = true;
        try {
          await axios.post('https://value.modern-speed.com/api/contact/send', this.dataObj);
          this.dataObj = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            type: '',
            message: ''
          }
        } catch (error) {
          // this.error = error.message || 'Something went wrong';
        } finally {
          this.loading = false;
        }
      }
    }
  }
}
</script>

<style lang="scss">
.contact-bg {
  background-image: url('../assets/images/contact-bg.svg');
}

.subject {
  input[type="radio"] {
    display: none;
  }
  label::before {
    content: "";
    position: absolute;
    width: 13px;
    height: 13px;
    background-color: #E0E0E0;
    border-radius: 50%;
    top: 50%;
    left: -20px;
    right: -20px;
    transform: translateY(-50%);
  }
  label::after {
    content: "";
    position: absolute;
    width: 13px;
    height: 13px;
    background-color: #000;
    border-radius: 50%;
    top: 50%;
    left: -20px;
    right: -20px;
    transform: translateY(-50%) scale(0);
  }
  input[type="radio"]:checked + label::before {
    border: 0.5px solid #000;
  }
  input[type="radio"]:checked + label::after {
    transform: translateY(-50%) scale(0.55);
  }
}
</style>