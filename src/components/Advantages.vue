<template>
  <div class="text-center">
    <p class="font-bold md:text-4xl text-3xl text-liberty-blue">{{ $t('Advantages') }}</p>
    <p class="sm:my-10 my-6 md:text-xl text-rainmaker lg:w-3/4 m-auto" v-html="advantageDesc[`title_${$i18n.locale}`]"></p>
    <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      <div v-for="(advantage, index) in advantages" :key="index" class="ltr:text-left rtl:text-right">
        <img :src="advantage.image" class="block xl:w-16 xl:h-16 md:w-14 md:h-14 w-10 h-10" alt="image">
        <p class="my-2 font-semibold xl:text-2xl text-xl text-liberty-blue">{{ advantage[`title_${$i18n.locale}`] }}</p>
        <p class="text-rainmaker xl:text-lg text-justify" v-html="advantage[`content_${$i18n.locale}`] ? advantage[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['advantages', 'advantageDesc']
}
</script>