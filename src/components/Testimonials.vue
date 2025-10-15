<template>
  <div>
    <p class="text-center font-bold md:text-4xl text-3xl text-liberty-blue">{{ $t('What our clients say') }}</p>
    <p class="text-center sm:my-10 my-6 md:text-xl text-rainmaker" v-html="customerOpinionDesc[`title_${$i18n.locale}`]"></p>
    <div class="flex items-center md:gap-4 gap-1">
      <button @click="changeSlide('prev')" class="flex items-center justify-center rounded-full sm:w-10 sm:h-10 w-8 h-8 shrink-0 border border-solid border-[#E1E4ED]" style="box-shadow: 0px 0px 0px 1px #00000014; box-shadow: 0px 2px 2px 0px #0000000A;">
        <p class="material-symbols-outlined text-[#171717] sm:text-2xl text-xl">{{ $i18n.locale === 'en' ? 'arrow_left_alt' : 'arrow_right_alt'}}</p>
      </button>
      <div class="overflow-hidden">
        <div class="flex transition-transform duration-700 ease-in-out" :style="`${$i18n.locale === 'en' ? `transform: translateX(-${currentSlide * 100}%)` : `transform: translateX(${currentSlide * 100}%)`}`">
          <div v-for="(item, index) in customersOpinions" :key="index" class="w-full shrink-0 px-1">
            <div class="flex lg:flex-row flex-col lg:items-center sm:gap-6 gap-4 sm:p-6 p-4 pb-0 border border-solid border-[#E1E4ED] rounded-lg" style="box-shadow: 0px 1px 4px 0px #19213D14;">
              <div class="md:w-1/3 sm:w-1/2 w-full m-auto rounded-tl-xl rounded-tr-xl overflow-hidden">
                <img class="w-full" :src="item.image" alt="image">
              </div>
              <div class="lg:w-2/3 w-full md:pb-6 pb-4">
                <div class="flex">
                  <span v-for="(star, starIndex) in 5" :key="starIndex" :class="`material-symbols-rounded fill ${starIndex < item.rate ? 'text-[#CCCCCC]' : 'text-night-sky'}`">kid_star</span>
                </div>
                <p class="lg:mt-6 sm:mt-4 mt-2 text-legal-eagle md:text-base text-sm" v-html="item[`opinion_${$i18n.locale}`] ? item[`opinion_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
                <p class="lg:mt-10 sm:mt-6 mt-4 md:text-lg sm:text-base text-sm text-legal-eagle font-semibold">{{ item[`name_${$i18n.locale}`] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click="changeSlide('next')" class="flex items-center justify-center rounded-full sm:w-10 sm:h-10 w-8 h-8 shrink-0 border border-solid border-[#E1E4ED]" style="box-shadow: 0px 0px 0px 1px #00000014; box-shadow: 0px 2px 2px 0px #0000000A;">
        <p class="material-symbols-outlined text-[#171717] sm:text-2xl text-xl">{{ $i18n.locale === 'en' ? 'arrow_right_alt' : 'arrow_left_alt'}}</p>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['customersOpinions', 'customerOpinionDesc'],
  data () {
    return {
      currentSlide: 0
    }
  },
  methods: {
    changeSlide (direction) {
      if (direction === 'next') {
        this.currentSlide = (this.currentSlide + 1) % this.customersOpinions.length;
      } else {
        this.currentSlide = (this.currentSlide - 1 + this.customersOpinions.length) % this.customersOpinions.length;
      }
    }
  }
}
</script>