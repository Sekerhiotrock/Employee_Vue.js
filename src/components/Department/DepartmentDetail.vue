<template>
  <div class="container">
    <h2 class="department-heading">Department Details</h2>
    <div v-if="department" class="department-detail">
      <h2>{{ department.departmentName }}</h2>
      <h2>Description</h2>
      <p>Manager ID: {{ department.managerID }}</p>
      <router-link to="/departments" class="btn btn-primary">Back</router-link>
      <button @click="editDepartment" class="btn btn-edit">Edit</button>
      <button @click="deleteDepartment" class="btn btn-delete">Delete</button>
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

const department = ref(null);
const route = useRoute();
const router = useRouter();

const fetchDepartment = async () => {
  try {
    const departmentId = route.params.id;
    if (departmentId) {
      const response = await apiService.getDepartmentById(departmentId);
      console.log(response.data);
      if (response && response.length > 0) {
        department.value = response[0];
      }

    }
  } catch (error) {
    console.error('Error fetching department details:', error);
  }
};

const deleteDepartment = async () => {
  try {
    const confirmed = confirm('Are you sure you want to delete this department?');
    if (confirmed) {
      const departmentId = route.params.id;
      await apiService.deleteDepartment(departmentId);
      router.push('/departments');
    }
  } catch (error) {
    console.error('Error deleting department:', error);
  }
};

const editDepartment = () => {
  const departmentId = route.params.id;
  router.push(`/departments/${departmentId}/edit-dept`);
};

onMounted(() => {
  fetchDepartment();
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

