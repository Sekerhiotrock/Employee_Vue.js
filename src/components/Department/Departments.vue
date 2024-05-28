<template>
  <div class="container emp-container">
    <div class="emp-header">
      <div class="emp-addSearch">
        <SearchBox @search="handleSearch" v-model:search="searchQuery" @keydown.enter="clearSearchOnEnter" />
        <li><router-link to="/departments/add-department" class="btn btn-primary square">Add</router-link></li>
      </div>
    </div>
    <div class="emp-table" v-if="filteredDepartments.length > 0">
      <table class="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Department</th>
            <th>ManagerID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(department, index) in filteredDepartments" :key="department.departmentID" @click="goToDepartmentDetail(department.departmentID)">
            <td>{{ index + 1 }}</td>
            <td>{{ department.departmentName }}</td>
            <td>{{ department.managerID }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="emp-notfound" v-else>
      <p>No departments found, try</p>
      <li><router-link to="/departments/add-department" class="btn btn-primary square">Add</router-link></li>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import SearchBox from '../SearchBox.vue';
import { apiService } from '@/function/ApiService.js';

const departments = ref([]);
const searchQuery = ref('');
const isLoading = ref(true);
const router = useRouter();

const fetchDepartments = async () => {
  try {
    departments.value = await apiService.getDepartments();
  } catch (error) {
    console.error('Error fetching departments:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = (query) => {
  searchQuery.value = query;
};

const goToDepartmentDetail = (departmentID) => {
  router.push(`/departments/${departmentID}`);
};

const clearSearchOnEnter = () => {
  searchQuery.value = '';
};

onMounted(async () => {
  await fetchDepartments();
});

const filteredDepartments = computed(() => {
  return departments.value.filter(department =>
    department.departmentName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.emp-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.emp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.emp-addSearch {
  display: flex;
  align-items: center;
}

.btn-primary {
  font-size: 14px;
  border-radius: 5px;
  padding: 10px;
}

.data-table {
  font-family: 'Times', serif;
  margin-bottom: 400px
}

tbody tr:hover {
  color: var(--color-black);
  background-color: var(--color-light);
  cursor: pointer;
}

.emp-notfound {
  text-align: center;
}

.emp-notfound p {
  font-family: 'Times', serif;
}

.btn-primary.square {
  border-radius: 0;
  background-color: #ffffff;
  color: #4facfe;
  border: none;
  transition: background-color 0.3s, color 0.3s;
}

.btn-primary.square:hover {
  background-color: #4facfe;
  color: white;
}

.data-table tbody tr:hover {
  background-color: #5693cb; 
  cursor: pointer; 
}

.data-table tbody tr:first-child td:first-child {
  background-color: transparent; 
}

.data-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #ddd; /* Add border bottom */
  border-right: 1px solid #ddd; /* Add border right */
}

/* Style for last cell in each row */
.data-table td:last-child {
  border-right: none; /* Remove right border for the last cell */
}
</style>
