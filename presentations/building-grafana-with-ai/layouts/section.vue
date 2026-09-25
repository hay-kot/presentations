<template>
  <div class="slidev-layout section flex flex-col items-center justify-center h-full gap-8">
    <div class="text-center section-heading">
      <slot />
    </div>
    <svg width="58" height="14" viewBox="0 0 58 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6" fill="#FF5F57" fill-opacity="0.85"/>
      <circle cx="29" cy="7" r="6" fill="#FEBC2E" fill-opacity="0.85"/>
      <circle cx="51" cy="7" r="6" fill="#28C840" fill-opacity="0.85"/>
    </svg>
  </div>
</template>

<style scoped>
</style>
