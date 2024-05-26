<template>
    <div class="container add-container">
        <div class="add-l">
            <h1 style="font-family: 'Times New Roman', Times, serif;">Add Employee</h1>
        </div>
        <div class="form-wrapper">
            <form @submit.prevent="submitEmployee" class="form">
                <div class="form-group">
                    <label for="firstName" style="font-family: 'Times New Roman', Times, serif;">First Name:</label>
                    <input type="text" id="firstName" v-model="employee.firstName" placeholder="Enter first name" required style="font-family: 'Times New Roman', Times, serif;" />
                </div>
                <div class="form-group">
                    <label for="lastName" style="font-family: 'Times New Roman', Times, serif;">Last Name:</label>
                    <input type="text" id="lastName" v-model="employee.lastName" placeholder="Enter last name" required style="font-family: 'Times New Roman', Times, serif;" />
                </div>
                <div class="form-group">
                    <label for="email" style="font-family: 'Times New Roman', Times, serif;">Email:</label>
                    <input type="email" id="email" v-model="employee.email" placeholder="Enter email address" required style="font-family: 'Times New Roman', Times, serif;" />
                </div>
                <div class="add-selection">
                    <div class="form-group">
                        <label for="gender" style="font-family: 'Times New Roman', Times, serif;">Gender:</label>
                        <select id="gender" v-model="employee.gender" style="font-family: 'Times New Roman', Times, serif;">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="departmentID" style="font-family: 'Times New Roman', Times, serif;">Department:</label>
                        <select id="departmentID" v-model="employee.departmentID" required style="font-family: 'Times New Roman', Times, serif;">
                            <option value="1">IT</option>
                            <option value="2">ComSci</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="jobTitle" style="font-family: 'Times New Roman', Times, serif;">Job Title:</label>
                    <input type="text" id="jobTitle" v-model="employee.jobTitle" placeholder="Enter job title" required style="font-family: 'Times New Roman', Times, serif;" />
                </div>
                <div class="add-submit">
                    <button type="button" class="btn btn-secondary" @click="goBack" style="font-family: 'Times New Roman', Times, serif;">Go Back</button>
                    <button type="submit" class="btn btn-danger" :disabled="loading" style="font-family: 'Times New Roman', Times, serif;">{{ loading ? 'Creating table...' : 'Add' }}</button>
                </div>
                <div v-if="errorMessage" class="error-message" style="font-family: 'Times New Roman', Times, serif;">{{ errorMessage }}</div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';

const router = useRouter();

const employee = ref({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    departmentID: 1,
    jobTitle: ''
});

const loading = ref(false);
const errorMessage = ref('');

const goBack = () => {
    router.push('/employees');
};

const submitEmployee = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
        await apiService.addEmployee(employee.value);
        employee.value = {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            departmentID: 1,
            jobTitle: ''
        };
        router.push('/employees');
    } catch (error) {
        console.error(error);
        errorMessage.value = 'Failed to add employee. Please check your input and try again.';
    } finally {
        loading.value = false;
    }
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
    margin-bottom: 20px;
}

.form-wrapper {
    width: 70%;
    max-width: 500px;
}

.form {
    background: linear-gradient(to right, #000000, #00f2fe);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

.add-selection {
    display: flex;
    gap: 10px;
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

.btn-secondary {
    background-color: #6c757d;
    color: #fff;
}

.btn:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
}

.btn:hover:enabled {
    background-color: #3ce75e;
}

.error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
}
</style>
