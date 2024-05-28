<template>
  <div class="container">
    <h2 class="employee-heading">Employee Details</h2>
    <div v-if="employee" class="employee-detail">
      <h2>{{ employee.firstName }} {{ employee.lastName }}</h2>
      <!-- Description container -->
      <div class="description-container">
        <h2>Description:</h2>
        <p>Email: {{ employee.email }}</p>
        <p>Gender: {{ employee.gender }}</p>
        <p>Job Title: {{ employee.jobTitle }}</p>
        <p>Department: {{ employee.departmentName }}</p>
        <!-- <p>Projects: {{ employee.projects.join(', ') }}</p> -->
        <div v-if="employee.projects && employee.projects.length" class="projects">
          <h3>Tasks:</h3>
          <ul>
            <li v-for="(project, index) in employee.projects" :key="index">{{ project }}</li>
          </ul>
        </div>
      </div>
      <!-- Buttons -->
      <router-link to="/employees" class="btn btn-primary">Back</router-link>
      <button @click="editEmployee" class="btn btn-edit">Edit</button>
      <button @click="deleteEmployee" class="btn btn-delete">Delete</button>
    </div>
    <div v-else>
      <p>waiting for server..</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService.js';

const employee = ref(null);
const route = useRoute();
const router = useRouter();

const fetchEmployee = async () => {
  try {
    const employeeId = route.params.id;
    if (employeeId) {
      const response = await apiService.getEmployeeById(employeeId);
      if (response && response.length > 0) {
        employee.value = response[0];
      }
    }
  } catch (error) {
    console.error('Error fetching employee details:', error);
  }
};

const deleteEmployee = async () => {
  try {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      const employeeId = route.params.id;
      await apiService.deleteEmployee(employeeId);
      router.push('/employees');
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};

const editEmployee = () => {
  const employeeId = route.params.id;
  router.push(`/employees/${employeeId}/edit-emp`);
};

onMounted(() => {
  fetchEmployee();
});
</script>

<style scoped>
.container {
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  height: 100vh; 
}

.employee-heading {
  margin-top: px;  
}
.employee-detail {
  margin: 50px;
  font-family: 'Times New Roman', Times, serif;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: grey;
  color: white;
}

.btn-edit,
.btn-delete {
  background-color: #ffffff;
  color: #4facfe;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn-edit:hover {
  background-color: #4facfe;
  color: #ffffff;
}

.btn-delete:hover {
  background-color: red;
  color: #ffffff;
}

.description-container {
  border: 1px solid #ddd; 
  padding: 10px; 
  margin-bottom: 20px; 
}
/* Reduce font size in description container */
.description-container p {
  font-size: 15px;
}
</style>
