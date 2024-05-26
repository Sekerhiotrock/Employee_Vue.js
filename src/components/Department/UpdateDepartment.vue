<template>
    <div class="container">
      <h2>Update Department</h2>
      <div v-if="department" class="department-form">
        <div class="form-group">
          <label for="departmentName">Department Name:</label>
          <input type="text" id="departmentName" v-model="department.departmentName" class="form-control" />
        </div>
        <div class="form-group">
          <label for="managerID">Manager ID:</label>
          <input type="number" id="managerID" v-model="department.managerID" class="form-control" />
        </div>
        <div class="form-group">
          <button @click="goToDepartmentDetail(departmentId)" class="btn btn-back">Cancel</button>
          <button @click="updateDepartment" class="btn btn-update">Update</button>
        </div>
      </div>
      <div v-else>
        <p>waiting for server...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { apiService } from '@/function/ApiService';
  
  const department = ref(null);
  const route = useRoute();
  const departmentId = route.params.id;
  const router = useRouter();
  
  const fetchDepartment = async () => {
    try {
      if (departmentId) {
        const response = await apiService.getDepartmentById(departmentId);
        if (response && response.length > 0) {
          department.value = response[0];
        }
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
      alert('Error fetching department data: ' + error.message);
    }
  };
  
  const updateDepartment = async () => {
    try {
      if (department.value) {
        department.value.departmentID = departmentId;
        await apiService.updateDepartment(department.value);
        alert('Department updated successfully');
        router.push(`/departments/${department.value.departmentID}`);
      }
    } catch (error) {
      console.error('Error updating department:', error);
      alert('Error updating department: ' + error.message);
    }
  };
  
  const goToDepartmentDetail = (departmentId) => {
    router.push(`/departments/${departmentId}`);
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
    padding: 20px;
    background: linear-gradient(to right, #000000, #00f2fe);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .department-form {
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
  