<template>
  <div>
    <navbar class="relative z-10" v-if="$route.name !== 'error-404'"/>
    <router-view class="min-h-dvh" />
    <footerbar class="md:mt-20 mt-14" v-if="$route.name !== 'error-404'"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footerbar from '@/components/Footerbar.vue'

export default {
  watch: {
    '$route.params.lang' () {
      this.changeLocale()
    }
  },
  methods: {
    changeLocale () {
      this.$i18n.locale = this.$route.params.lang ? this.$route.params.lang : 'en'
      document.querySelector("html")?.setAttribute("dir", this.$route.params.lang === 'ar' ? 'rtl' : 'ltr')
    }
  },
  components: {
    Navbar,
    Footerbar
  },
  created () {
    this.changeLocale()
  }
}
</script>