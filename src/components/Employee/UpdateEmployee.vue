<template>
  <div class="container">
    <h2 class="employee-heading">Edit Employee</h2>
    <div v-if="employee" class="employee-form">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="employee.firstName" class="form-control" />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="employee.lastName" class="form-control" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="employee.email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select id="gender" v-model="employee.gender" class="form-control">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label for="jobTitle">Job Title:</label>
        <input type="text" id="jobTitle" v-model="employee.jobTitle" class="form-control" />
      </div>
      <div class="form-group">
        <label for="departmentID">Department:</label>
        <select id="departmentID" v-model="selectedDepartment" class="form-control">
          <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentID">
            {{ dept.departmentName }}
          </option>
        </select>
      </div>
      <button @click="updateEmployee" class="btn btn-update">Update</button>
    </div>
    <div v-else>
      <p>Loading employee data...</p>
    </div>
    <div>
      <router-link to="/employees" class="btn btn-back">Back</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';

const employee = ref(null);
const departments = ref([]);
const selectedDepartment = ref('');
const route = useRoute();
const employeeId = route.params.id;
const router = useRouter();

const fetchEmployee = async () => {
  try {
    if (employeeId) {
      const response = await apiService.getEmployeeById(employeeId);
      if (response && response.length > 0) {
        employee.value = response[0];
        selectedDepartment.value = response[0].departmentID; // Initialize the selected department
      }
    }
  } catch (error) {
    console.error('Error fetching employee data:', error);
    alert('Error fetching employee data: ' + error.message);
  }
};

const fetchDepartments = async () => {
  try {
    const response = await apiService.getDepartments();
    departments.value = response;
  } catch (error) {
    console.error('Error fetching departments:', error);
    alert('Error fetching departments: ' + error.message);
  }
};

const updateEmployee = async () => {
  try {
    if (employee.value) {
      employee.value.employeeId = employeeId;
      employee.value.departmentID = selectedDepartment.value; // Update the department ID
      await apiService.updateEmployee(employee.value);
      alert('Employee updated successfully');
      router.push(`/employees/${employee.value.employeeId}`);
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    alert('Error updating employee: ' + error.message);
  }
};

onMounted(() => {
  fetchEmployee();
  fetchDepartments();
});
</script>

<style scoped>
.container {
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #000000, #00f2fe);
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
  background-color: #050505;
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
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-update {
  background-color: #ffffff;
  color: #4facfe;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn-back {
  background-color: #6c757d;
  color: white;
}

.btn-update:hover {
  background-color: #4facfe;
  color: #ffffff;
}

.btn-back:hover {
  background-color: #4facfe;
  color: #ffffff;
}
</style>
