<template>
  <div class="container emp-container" style="font-family: 'Times New Roman', Times, serif;">
    <div class="emp-header">
      <div class="emp-addSearch">
        <li><router-link to="/employees/add-employee" class="btn btn-danger add-btn" style="font-family: 'Times New Roman', Times, serif;">Add</router-link></li>
        <li><router-link to="/employees/update-employee" class="btn btn-danger add-btn" style="font-family: 'Times New Roman', Times, serif;">Check</router-link></li>

      </div>
    </div>
    <SearchBox @search="handleSearch" v-model:search="searchQuery" @keydown.enter="clearSearchOnEnter" />
    <div class="emp-selectDept">
      <select id="departmentID" v-model="selectedDepartment" class="dept-select" style="font-family: 'Times New Roman', Times, serif;">
        <option disabled selected value="" style="display: none;">Select Department</option>
        <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentName" style="font-family: 'Times New Roman', Times, serif;">
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
            <td>{{ employee.employeeID }}</td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.email || '-' }}</td>
            <td>{{ employee.gender || '-' }}</td>
            <td>{{ employee.departmentName }}</td>
            <td>{{ employee.jobTitle || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="emp-notfound" v-else>
      <p style="font-family: 'Times New Roman', Times, serif;">No Employee found try </p>
      <li><router-link to="/employees/add-employee" class="btn btn-danger add-btn" style="font-family: 'Times New Roman', Times, serif;">Add</router-link></li>
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

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.employee-form {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background-color: #ff6347;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

.btn:hover:enabled {
  background-color: #e74c3c;
}

.add-btn {
  background-color: #ffffff;
  color: #4facfe;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.add-btn:hover {
  background-color: #4facfe;
  color: #fff;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.data-table thead {
  background-color: #f0f0f0;
}

.data-table th {
  padding: 12px 8px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.data-table th:first-child {
  border-top-left-radius: 8px;
}

.data-table th:last-child {
  border-top-right-radius: 8px; /* Rounded top right corner for last header */
}
</style>
