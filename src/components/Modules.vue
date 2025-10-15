<template>
  <div class="grid lg:grid-cols-3 grid-cols-1 items-center justify-between gap-6 pt-3">
    <div class="lg:col-span-2 col-span-1 flex flex-col gap-4">
      <p v-if="$route.name !== 'sectors'" class="font-bold text-legal-eagle text-3xl md:mb-6 mb-2">{{ $t('CUSTOMIZED CLOUD ERP MODULES') }}</p>
      <div v-for="(item, index) in modules" :key="index" class="px-6 py-5 rounded-lg" style="box-shadow: 0px 0px 60px 30px #00000008;">
        <div @click="toggleAccordion(index)" class="cursor-pointer flex items-start justify-between text-[#262626]">
          <p class="font-medium">{{ item.title_en ? item[`title_${$i18n.locale}`] : item.name_en ? item[`name_${$i18n.locale}`] : '' }}</p>
          <span class="material-symbols-rounded font-bold text-xl leading-none">{{ item.isOpen ? 'remove' : 'add' }}</span>
        </div>
        <p :class="`text-legal-eagle text-sm mt-2 ${item.isOpen ? 'block' : 'hidden'}`">
          <span v-html="item[`content_${$i18n.locale}`] ? item[`content_${$i18n.locale}`].replace(/\r?\n/g, '<br>') : ''"></span>
          <template v-if="$route.name === 'home'">
            <span>{{ '.. ' }}</span>
            <router-link :to="{name: 'modules', query: {moduleID: item.id}}" class="underline text-ambassador-blue">{{ $t('Read more') }}</router-link>
          </template>
        </p>
      </div>
    </div>
    <div class="col-span-1 max-w-96 lg:w-full sm:w-1/2 w-3/4 h-full m-auto md:pt-10 pt-6 md:ps-10 ps-6 relative">
      <div class="absolute top-0 ltr:left-0 rtl:right-0 bg-[#F7F7F7] h-1/2 w-4/5 rounded-[20px]"></div>
      <img :src="modules.length > 0 ? modules[currentIndex].image : ''" class="relative w-full h-full object-cover rounded-xl" alt="module">
    </div>
  </div>
</template>

<script>
export default {
  props: ['modules'],
  data () {
    return {
      currentIndex: 0,
    }
  },
  watch: {
    modules () {
      this.modules.forEach((item, index) => {
        item.isOpen = index === 0 ? true : false
      })
    }
  },
  methods: {
    toggleAccordion (moduleIndex) {
      this.currentIndex = moduleIndex
      this.modules.forEach((item, index) => {
        item.isOpen = moduleIndex === index ? true : false
      })
    }
  },
  mounted () {
    this.modules.forEach((item, index) => {
      item.isOpen = index === 0 ? true : false
    })
  }
}
</script>