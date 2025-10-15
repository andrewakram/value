<template>
  <div class="-mt-24">
    <div :class="`relative overflow-hidden py-14 ${currentSlide % 2 === 0 ? 'slide-1' : 'slide-2 bg-no-repeat bg-cover'}`">
      <img v-if="currentSlide % 2 === 0" class="w-full h-full absolute bottom-0" src="@/assets/images/blur.png" alt="">
      <div class="flex transition-transform duration-700 ease-in-out w-full h-full relative" :style="`${$i18n.locale === 'en' ? `transform: translateX(-${currentSlide * 100}%)` : `transform: translateX(${currentSlide * 100}%)`}`">
        <div v-for="(slider, index) in sliders" :key="index" class="w-full h-full shrink-0 mt-20">
          <div class="grid md:grid-cols-2 grid-cols-1 gap-4 items-center h-full max-w-screen-2xl mx-auto xl:px-20 lg:px-16 md:px-12 sm:px-8 px-6">
            <div class="text-white md:order-1 order-2">
              <p class="lg:text-5xl sm:text-4xl text-3xl font-bold">{{ slider[`title_${$i18n.locale}`] }}</p>
              <p class="lg:text-2xl text-xl font-light mt-4 ellipsis-2" v-html="slider[`content_${$i18n.locale}`] ? slider[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
              <div class="flex gap-4 md:mt-10 mt-8">
                <button @click="handleScrollToSection" class="text-snow bg-[#081639] border border-solid border-[#192F52] xl:text-xl md:text-lg font-medium rounded-md px-6 py-4 leading-5">{{ $t('Join Now') }}</button>
                <router-link v-if="slider.type === 'category'" :to="{name: 'sectors', query: {sectorID: slider.category_id}}" class="text-snow bg-[#F8FAFF1A] border border-solid border-[#E1E4ED] xl:text-xl md:text-lg font-medium rounded-md p-4 leading-5">{{ $t('Why Choose US') }}</router-link>
                <router-link v-else-if="slider.type === 'module'" :to="{name: 'modules', query: {moduleID: slider.module_id}}" class="text-snow bg-[#F8FAFF1A] border border-solid border-[#E1E4ED] xl:text-xl md:text-lg font-medium rounded-md p-4 leading-5">{{ $t('Why Choose US') }}</router-link>
                <a v-else-if="slider.type === 'external'" :href="slider.link" target="_blank" rel="noopener noreferrer" class="text-snow bg-[#F8FAFF1A] border border-solid border-[#E1E4ED] xl:text-xl md:text-lg font-medium rounded-md p-4 leading-5">{{ $t('Why Choose US') }}</a>
              </div>
            </div>
            <img :src="slider.image" class="sm:h-96 w-auto m-auto md:order-2 order-1" alt="slider">
          </div>
        </div>
      </div>
      <div class="flex gap-3 items-center justify-center mt-12 px-4 relative">
        <div v-for="(dot, index) in sliders" :key="index">
          <p @click="currentSlide = index" :class="`${index === currentSlide ? 'bg-amour' : 'bg-arctic-dawn'} h-1 w-7 rounded-full cursor-pointer`"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sliders'],
  data () {
    return {
      currentSlide: 0
    }
  },
  methods: {
    handleScrollToSection () {
      this.$emit('scroll-to-section');
    },
  },
  created () {
    setInterval(() => {
      this.currentSlide = this.currentSlide < this.sliders.length - 1 ? this.currentSlide + 1 : 0
    }, 5000);
  }
}
</script>

<style>
.slide-1 {
  background: radial-gradient(152.86% 152.86% at 50% 50%, #EB5757 0%, #853131 100%);
}
.slide-2 {
  background-image: url('../assets/images/slider-img.svg');
}
.ellipsis-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>