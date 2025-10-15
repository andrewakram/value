<template>
  <div>
    <p class="font-bold text-legal-eagle text-3xl text-center sm:mb-10 mb-6">{{ $t(title) }}</p>
    <div class="overflow-hidden" style="direction: ltr;">
      <div class="flex animate-slider" :style="{ '--list-length': list.length }">
        <div v-for="(item, index) in logos" :key="index" class="w-[200px] shrink-0 px-1.5">
          <div class="p-3 h-full bg-[#F7F9FC] rounded-2xl flex items-center justify-center">
            <img :src="item.image" alt="image">
          </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'title'],
  data () {
    return {
      logos: []
    }
  },
  created () {
    this.logos = [...this.list, ...this.list]
  }
}
</script>

<style>
.animate-slider {
  animation: slide 15s linear infinite;
  width: calc(200px * (var(--list-length) * 2));
}
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-200px * var(--list-length)))
  }
}
</style>