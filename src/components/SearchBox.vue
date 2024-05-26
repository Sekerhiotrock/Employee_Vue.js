<script setup>
import { ref, watch, defineEmits } from 'vue';
import { debounce } from 'lodash-es';

const searchQuery = ref('');

const emit = defineEmits(['search']);

const handleSearch = debounce(() => {
  emit('search', searchQuery.value);
}, 300);

watch(searchQuery, handleSearch);

const clearSearchOnEnter = (event) => {
  if (event.key === 'Enter') {
    searchQuery.value = '';
  }
};
</script>

<template>
  <div class="search-box">
    <input 
      type="text" 
      placeholder="Search..." 
      v-model="searchQuery" 
      @keyup.enter="clearSearchOnEnter"
    >
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background: #fff;
  border: 2px solid #007BFF;
  border-radius: 8px; /* Changed from 25px to 8px for a more square shape */
  padding: 8px;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added box-shadow for style */
}

.search-box input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 5px 8px;
  font-size: 16px;
  outline: none;
}

.search-box input::placeholder {
  color: #999;
}
</style>
