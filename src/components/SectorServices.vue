<template>
  <div>
    <p class="font-bold text-legal-eagle text-3xl text-center sm:mb-10 mb-6">{{ $t('Sectors we serve') }}</p>
    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-2 gap-1">
      <div v-for="(item, index) in sectorsServices" :key="index">
        <div class="relative rounded overflow-hidden md:h-[230px] h-[200px]">
          <img :src="item.image" class="bg-cover w-full h-full" :alt="`${item.name_en} image`" />
          <div class="absolute inset-0 bg-[rgba(41,45,50,0.6)]"></div>
          <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-center font-medium sm:p-2 p-1 w-full h-full md:text-lg" v-html="item[`name_${$i18n.locale}`] ? item[`name_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sectorsServices']
}
</script>