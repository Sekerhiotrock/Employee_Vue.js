<template>
  <div class="container emp-container" style="font-family: 'Times New Roman', Times, serif;">
    <div class="emp-header">
      <div class="emp-addSearch">
      </div>
    </div>
    <SearchBox @search="handleSearch" v-model:search="searchQuery" @keydown.enter="clearSearchOnEnter" />
    <div class="emp-selectDept">
      <select id="departmentID" v-model="selectedDepartment" class="dept-select">
        <option disabled selected value="" style="display: none;">Select Department</option>
        <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentName">
          {{ dept.departmentName }}
        </option>
      </select>
    </div>
    <div class="emp-table" v-if="filteredEmployees.length > 0">
      <table class="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in filteredEmployees" :key="employee.employeeID" @click="goToEmployeeDetail(employee.employeeID)">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.email || '-' }}</td>
            <td>{{ employee.gender || '-' }}</td>
            <td>{{ employee.departmentName }}</td>
            <td>{{ employee.jobTitle || '-' }}</td>
          </tr>
        </tbody>
      </table>
      <li><router-link to="/employees/add-employee" class="btn btn-danger add-btn">Add</router-link></li>
    </div>
    <div class="emp-notfound" v-else>
      <p>No Employee found. Try:</p>
      <li><router-link to="/employees/add-employee" class="btn btn-danger add-btn">Add</router-link></li>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import SearchBox from '../SearchBox.vue';
import { apiService } from '@/function/ApiService.js';

const employees = ref([]);
const departments = ref([]);
const searchQuery = ref('');
const selectedDepartment = ref('');
const isLoading = ref(true);
const router = useRouter();

const fetchEmployees = async () => {
  try {
    employees.value = await apiService.getEmployees();
  } catch (error) {
    console.error('Error fetching employees:', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchDepartments = async () => {
  try {
    departments.value = await apiService.getDepartments();
  } catch (error) {
    console.error('Error fetching departments:', error);
    alert('Error fetching departments: ' + error.message);
  }
};

const filteredEmployees = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const selectedDept = selectedDepartment.value.toLowerCase();

  if (selectedDept === '') {
    return employees.value.filter(employee => {
      const firstName = employee.firstName?.toLowerCase();
      const lastName = employee.lastName?.toLowerCase();
      return (query === '' || firstName?.includes(query) || lastName?.includes(query));
    });
  } else {
    return employees.value.filter(employee => {
      const departmentName = employee.departmentName?.toLowerCase();
      const firstName = employee.firstName?.toLowerCase();
      const lastName = employee.lastName?.toLowerCase();
      return departmentName === selectedDept &&
        (query === '' || firstName?.includes(query) || lastName?.includes(query));
    });
  }
});

const handleSearch = (query) => {
  searchQuery.value = query;
};

const goToEmployeeDetail = (employeeID) => {
  router.push(`/employees/${employeeID}`);
};

const clearSearchOnEnter = () => {
  searchQuery.value = '';
};

onMounted(async () => {
  await fetchEmployees();
  await fetchDepartments();
});
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.emp-addSearch {
  display: flex;
}

.add-btn {
  margin-right: 10px;
  border-radius: 0;
  padding : 3;
  background-color: #ffffff;
  color: #4facfe;
  border: none;
  transition: background-color 0.3s, color 0.3s;
}

.add-btn:hover {
  background-color: #4facfe;
  color: white;
}

.emp-selectDept {
  margin-bottom: 30px;
}

.emp-table {
  width: 100%;
  margin-bottom: 500px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.emp-notfound {
  text-align: center;
  margin-top: 20px;
}

.emp-notfound p {
  margin-bottom: 10px;
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
