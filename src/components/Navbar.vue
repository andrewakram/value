<template>
  <div>
    <!-- Navbar -->
    <div class="max-w-screen-2xl mx-auto xl:px-20 md:px-12 sm:px-8 px-6 py-6 h-full flex items-center justify-between gap-4">
      <div class="flex items-center xl:gap-24 gap-10">
        <router-link :to="{name: 'home'}" class="shrink-0">
          <img v-if="whiteHeaderList.includes($route.name)" src="@/assets/images/logo-blue.svg" class="w-28" alt="logo">
          <img v-else-if="redHeaderList.includes($route.name)" src="@/assets/images/logo-red.svg" class="w-28" alt="logo">
          <img v-else src="@/assets/images/logo-white.svg" class="w-28" alt="logo">
        </router-link>
        <div :class="`lg:flex hidden items-center xl:gap-8 gap-4 ${whiteHeaderList.includes($route.name) ? 'text-carbon' : 'text-white'}`">
          <router-link :to="{name: 'home'}" :active-class="`${$route.name === 'home' ? 'text-white' : redHeaderList.includes($route.name) ? 'text-amour' : 'text-ambassador-blue'} font-semibold border-b-2 border-solid ${$route.name === 'home' ? 'border-white' : redHeaderList.includes($route.name) ? 'border-amour' : 'border-ambassador-blue'}`">{{ $t('Home') }}</router-link>
          <div class="relative">
            <button @click="toggleDropdown('sectorsDropdownVisible')" class="menu-btn flex gap-0.5" aria-expanded="sectorsDropdownVisible" aria-haspopup="true">
              <span class="menu-btn">{{ $t('Sectors') }}</span>
              <span class="menu-btn material-symbols-outlined font-light" aria-hidden="true">keyboard_arrow_down</span>
            </button>
            <div v-if="sectorsDropdownVisible" class="absolute ltr:left-0 rtl:right-0 ltr:origin-top-right rtl:origin-top-left z-10 mt-2 min-w-56" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="grid grid-cols-2 gap-2 border border-solid border-white text-[#B4B9C9] rounded-lg bg-white p-4 w-[500px]" role="none">
                <div v-for="(item, index) in sectorsList" :key="index" class="hover:text-ambassador-blue hover:underline">
                  <router-link :to="{name: 'sectors', query: {sectorID: item.id}}">{{ item[`name_${$i18n.locale}`] }}</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <button @click="toggleDropdown('modulesDropdownVisible')" class="menu-btn flex gap-0.5" aria-expanded="modulesDropdownVisible" aria-haspopup="true">
              <span class="menu-btn">{{ $t('Modules') }}</span>
              <span class="menu-btn material-symbols-outlined font-light" aria-hidden="true">keyboard_arrow_down</span>
            </button>
            <div v-if="modulesDropdownVisible" class="absolute ltr:left-0 rtl:right-0 ltr:origin-top-right rtl:origin-top-left z-10 mt-2 min-w-56" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="grid xl:grid-cols-3 grid-cols-2 gap-3 border border-solid border-white text-[#B4B9C9] rounded-lg bg-white p-4 xl:w-[850px] w-[600px]" role="none">
                <div v-for="(item, index) in modulesList" :key="index" class="hover:text-ambassador-blue hover:underline">
                  <router-link :to="{name: 'modules', query: {moduleID: item.id}}">{{ item[`name_${$i18n.locale}`] }}</router-link>
                </div>
              </div>
            </div>
          </div>
          <router-link :to="{name: 'clients'}" :active-class="`${$route.name === 'home' ? 'text-white' : redHeaderList.includes($route.name) ? 'text-amour' : 'text-ambassador-blue'} font-semibold border-b-2 border-solid ${$route.name === 'home' ? 'border-white' : redHeaderList.includes($route.name) ? 'border-amour' : 'border-ambassador-blue'}`">{{ $t('Clients') }}</router-link>
          <router-link :to="{name: 'updates'}" :active-class="`${$route.name === 'home' ? 'text-white' : redHeaderList.includes($route.name) ? 'text-amour' : 'text-ambassador-blue'} font-semibold border-b-2 border-solid ${$route.name === 'home' ? 'border-white' : redHeaderList.includes($route.name) ? 'border-amour' : 'border-ambassador-blue'}`">{{ $t('Updates') }}</router-link>
          <router-link :to="{name: 'contact-us'}" :active-class="`${$route.name === 'home' ? 'text-white' : redHeaderList.includes($route.name) ? 'text-amour' : 'text-ambassador-blue'} font-semibold border-b-2 border-solid ${$route.name === 'home' ? 'border-white' : redHeaderList.includes($route.name) ? 'border-amour' : 'border-ambassador-blue'}`">{{ $t('Contact Us') }}</router-link>
        </div>
      </div>

      <div :class="`flex items-center xl:gap-4 gap-2 font-medium text-sm ${whiteHeaderList.includes($route.name) ? 'text-carbon' : 'text-white'}`">
        <p @click="changeLocale()" :class="`flex items-center shrink-0 cursor-pointer select-none sm:py-2 py-1 sm:px-4 px-2 rounded-md border border-solid bg-[#F8FAFF1A] ${whiteHeaderList.includes($route.name) ? 'border-carbon' : 'border-white'}`">{{ $t('English') }}</p>
        <p @click="sidebarActive = true" class="material-symbols-rounded cursor-pointer font-medium lg:hidden block">menu</p>
      </div>
    </div>

    <!-- Sidebar -->
    <div :class="`${sidebarActive ? 'fixed opacity-100' : 'opacity-0'} inset-0 bg-[#4D4D4D70] transition-opacity duration-500 ease-in-out`"></div>
    <div :class="sidebarActive ? 'inset-0' : '-inset-full'" class="fixed top-0 bottom-0 h-dvh w-full transition-all duration-300">
      <div class="relative h-full w-72 overflow-y-auto shadow-xl" style="background: radial-gradient(152.86% 152.86% at 50% 50%, #EB5757 0%, #853131 100%);">
        <div class="flex justify-between items-center sticky top-0 px-4 py-6">
          <router-link :to="{name: 'home'}" class="shrink-0">
            <img src="@/assets/images/logo.svg" class="w-28" alt="logo">
          </router-link>
          <p @click="sidebarActive = false" class="material-symbols-rounded cursor-pointer text-xl font-semibold text-white">close</p>
        </div>

        <div class="p-6 flex flex-col gap-6 text-white font-medium">
          <router-link :to="{name: 'home'}" active-class="text-ambassador-blue font-semibold border-b-2 border-solid border-ambassador-blue w-fit">{{ $t('Home') }}</router-link>
          <router-link :to="{name: 'sectors'}" active-class="text-ambassador-blue font-semibold border-b-2 border-solid border-ambassador-blue w-fit">{{ $t('Sectors') }}</router-link>
          <router-link :to="{name: 'modules'}" active-class="text-ambassador-blue font-semibold border-b-2 border-solid border-ambassador-blue w-fit">{{ $t('Modules') }}</router-link>
          <router-link :to="{name: 'clients'}" active-class="text-ambassador-blue font-semibold border-b-2 border-solid border-ambassador-blue w-fit">{{ $t('Clients') }}</router-link>
          <router-link :to="{name: 'updates'}" active-class="text-ambassador-blue font-semibold border-b-2 border-solid border-ambassador-blue w-fit">{{ $t('Updates') }}</router-link>
          <router-link :to="{name: 'contact-us'}" active-class="text-ambassador-blue font-semibold border-b-2 border-solid border-ambassador-blue w-fit">{{ $t('Contact Us') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data () {
    return {
      whiteHeaderList: ['contact-us', 'clients', 'update-details'],
      redHeaderList: ['modules', 'sectors', 'updates'],
      sidebarActive: false,
      sectorsDropdownVisible: false,
      modulesDropdownVisible: false,
      windowWidth: window.innerWidth,
      sectorsList: [],
      modulesList: []
    }
  },
  watch: {
    windowWidth () {
      this.sidebarActive = false
      this.sectorsDropdownVisible = false
      this.modulesDropdownVisible = false
    },
    '$route.name' () {
      this.sidebarActive = false
    }
  },
  methods: {
    changeLocale () {
      this.$router.push({
        params: {
          lang: this.$route.params.lang === 'en' ? 'ar' : 'en'
        }
      }).catch(() => {})
    },
    toggleDropdown(dropdown) {
      this.sectorsDropdownVisible = dropdown !== 'sectorsDropdownVisible' ? false : this.sectorsDropdownVisible
      this.modulesDropdownVisible = dropdown !== 'modulesDropdownVisible' ? false : this.modulesDropdownVisible
      this[dropdown] = !this[dropdown];
    },
    closeDropdown(event) {
      if (event.target.classList[0] !== 'menu-btn') {
        this.sectorsDropdownVisible = false
        this.modulesDropdownVisible = false
      }
    },
    updateWidth() {
      this.windowWidth = window.innerWidth;
    },
    async loadSectorsModulesLists () {
      try {
        const response = await axios.get('https://value.modern-speed.com/api/sectorsModules');
        this.sectorsList = response.data.data.data
        this.modulesList = response.data.data.modules
      } catch (error) {
        // this.error = error.message || 'Something went wrong';
      } finally {
        // this.loading = false;
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.closeDropdown);
    window.addEventListener('resize', this.updateWidth);
  },
  beforeUnmount () {
    document.removeEventListener('click', this.closeDropdown);
  },
  unmounted () {
    window.removeEventListener('resize', this.updateWidth);
  },
  created () {
    this.loadSectorsModulesLists();
  }
}
</script>