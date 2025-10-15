<template>
  <div>
    <p class="font-bold text-legal-eagle text-3xl text-center sm:mb-10 mb-6">{{ $t('Sectors') }}</p>
    <div class="grid sm:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-6 gap-4">
      <div v-for="(sector, index) in sectors" :key="index" class="border border-solid border-[#E1E4ED] shadow rounded-lg group">
        <div class="relative overflow-hidden">
          <img :src="sector.image" alt="sector" class="w-full xl:h-[350px] md:h-60 h-48 object-cover rounded-lg transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-black rounded-t-lg opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
        </div>
        <div class="xl:p-10 md:p-6 p-4 text-legal-eagle">
          <p class="font-bold sm:text-xl text-lg">{{ sector[`name_${$i18n.locale}`] }}</p>
          <p class="text-sm leading-6 md:mt-6 sm:mt-4 mt-2 ellipsis-3" v-html="sector[`content_${$i18n.locale}`] ? sector[`content_${$i18n.locale}`].replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>') : ''"></p>
          <div class="flex gap-1">
            <router-link :to="{name: 'sectors', query: {sectorID: sector.id}}" class="mt-4 bg-ambassador-blue font-medium text-white cursor-pointer flex items-center gap-1 rounded-full py-2 px-4 w-fit">
              <span class="text-xs">{{ $t('Read more') }}</span>
              <span class="material-symbols-outlined text-lg leading-none">{{ $i18n.locale === 'en' ? 'arrow_right_alt' : 'arrow_left_alt'}}</span>
            </router-link>
            <router-link :to="{name: 'sectors', query: {sectorID: sector.id}, hash: '#request-offer'}" class="mt-4 bg-amour font-medium text-white cursor-pointer flex items-center gap-1 rounded-full py-2 px-4 w-fit">
              <span class="text-xs">{{ $t('Price quote') }}</span>
              <span class="material-symbols-outlined text-lg leading-none">{{ $i18n.locale === 'en' ? 'arrow_right_alt' : 'arrow_left_alt'}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sectors']
}
</script>

<style>
.ellipsis-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>