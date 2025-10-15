<template>
  <div class="grid lg:grid-cols-2 grid-cols-1 items-center lg:gap-10 gap-6">
    <div class="text-legal-eagle col-span-1">
      <p class="font-bold text-3xl md:mb-4 mb-2">{{ $t('Frequently Asked Questions') }}</p>
      <p>{{ $t('Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.') }}</p>
      <div class="flex flex-col gap-4 mt-10">
        <div v-for="(item, index) in faq" :key="index" :class="`sm:px-6 p-4 border border-solid border-[#E1E4ED] ${item.isOpen ? 'rounded-2xl bg-[#F1F3F7]' : 'rounded-full shadow-sm'}`">
          <div @click="toggleAccordion(index)" class="cursor-pointer flex items-center justify-between">
            <p class="sm:font-semibold font-medium sm:text-base text-sm">{{ item[`question_${$i18n.locale}`] }}</p>
            <span class="material-symbols-rounded text-xl leading-none">{{ item.isOpen ? 'close' : 'add' }}</span>
          </div>
          <p :class="`sm:text-sm text-xs mt-2 ${item.isOpen ? 'block' : 'hidden'}`">{{ item[`answer_${$i18n.locale}`] }}</p>
        </div>
      </div>
    </div>
    <div class="col-span-1">
      <img src="@/assets/images/faq.png" class="sm:w-3/4 w-full m-auto" alt="FAQ">
    </div>
  </div>
</template>

<script>
export default {
  props: ['faq'],
  watch: {
    faq () {
      this.faq.forEach((item, index) => {
        item.isOpen = index === 0 ? true : false
      })
    }
  },
  methods: {
    toggleAccordion (moduleIndex) {
      this.faq.forEach((item, index) => {
        item.isOpen = moduleIndex === index ? true : false
      })
    }
  }
}
</script>