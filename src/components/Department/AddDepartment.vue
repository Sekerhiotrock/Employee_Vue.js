<template>
    <div class="container add-container">
      <div class="add-l">
        <h1 style="font-family: 'Times New Roman', Times, serif;">Add New Department</h1>
      </div>
      <form @submit.prevent="submitDepartment" class="form">
        <div class="form-group">
          <label for="departmentName" style="font-family: 'Times New Roman', Times, serif;">Department Name:</label>
          <input type="text" id="departmentName" v-model="department.departmentName" required style="font-family: 'Times New Roman', Times, serif;" />
        </div>
        <div class="form-group">
          <label for="managerID" style="font-family: 'Times New Roman', Times, serif;">Manager ID:</label>
          <input type="number" id="managerID" v-model="department.managerID" required style="font-family: 'Times New Roman', Times, serif;" />
        </div>
        <div class="add-submit">
            <button type="button" class="btn btn-secondary" @click="goBack" style="font-family: 'Times New Roman', Times, serif;">Go Back</button>
          <button type="submit" class="btn btn-danger" style="font-family: 'Times New Roman', Times, serif;">ADD</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { apiService } from '@/function/ApiService';
  
  const router = useRouter();
  
  const department = ref({
    departmentName: '',
    managerID: '',
    projects: []
  });
  
  const submitDepartment = async () => {
    try {
      await apiService.addDepartment(department.value);
      department.value = {
        departmentName: '',
        managerID: ''
      };
      router.push(`/departments`);
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => {
    router.push('/departments');
};
  
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .add-l {
    display: flex;
    align-items: center;
  }
  
  .add-l h1 {
    margin-left: 10px;
  }
  
  .form {
    width: 70%;
    max-width: 500px;
    background: linear-gradient(to right, #000000, #00f2fe);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .add-submit {
    text-align: center;
  }
  
  .btn {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-danger {
    background-color: #ffffff;
    color: #4facfe;
    border: none;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .btn:hover {
    background-color: #3ce75e;
  }
  
  
  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  </style>
  