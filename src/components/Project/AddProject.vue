<template>
    <div class="container add-container">
        <div class="add-l">
            <h1>Add Project</h1>
        </div>
        <form @submit.prevent="submitProject" class="form">
            <div class="form-group">
                <label for="projectName" style="font-family: 'Times New Roman', Times, serif;">Project Name:</label>
                <input type="text" id="projectName" v-model="project.projectName" required style="font-family: 'Times New Roman', Times, serif;" />
            </div>
            <div class="form-group">
                <label for="departmentID" style="font-family: 'Times New Roman', Times, serif;">Department:</label>
                <select id="departmentID" v-model="selectedDepartment" class="dept-select" style="font-family: 'Times New Roman', Times, serif;">
                    <option v-for="dept in departments" :key="dept.departmentID" :value="dept.departmentID">
                        {{ dept.departmentName }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="startDate" style="font-family: 'Times New Roman', Times, serif;">Start Date:</label>
                <input type="date" id="startDate" v-model="project.startDate" style="font-family: 'Times New Roman', Times, serif;" />
            </div>
            <div class="form-group">
                <label for="endDate" style="font-family: 'Times New Roman', Times, serif;">End Date:</label>
                <input type="date" id="endDate" v-model="project.endDate" style="font-family: 'Times New Roman', Times, serif;" />
            </div>
            <div class="add-submit">
                <button type="button" class="btn btn-secondary" @click="goBack" style="font-family: 'Times New Roman', Times, serif;">Go Back</button>
                <button type="submit" class="btn btn-danger" style="font-family: 'Times New Roman', Times, serif;">ADD</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/function/ApiService';

const router = useRouter();

const project = ref({
    projectName: '',
    departmentID: 1,
    startDate: '',
    endDate: ''
});

const departments = ref([]);
const selectedDepartment = ref(1);

const fetchDepartments = async () => {
    try {
        const response = await apiService.getDepartments();
        departments.value = response;
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
};

const submitProject = async () => {
    try {
        project.value.startDate = project.value.startDate.trim() === '' ? null : project.value.startDate;
        project.value.endDate = project.value.endDate.trim() === '' ? null : project.value.endDate;

        project.value.departmentID = selectedDepartment.value;
        await apiService.addProject(project.value);
        project.value = {
            projectName: '',
            departmentID: 1,
            startDate: '',
            endDate: ''
        };
        router.push(`/projects`);
    } catch (error) {
        console.error(error);
    }
};

const goBack = () => {
    router.push('/projects');
};

onMounted(() => {
    fetchDepartments();
});

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
    font-family: 'Times New Roman', Times, serif;
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
    font-family: 'Times New Roman', Times, serif;
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
input[type="number"],
select,
input[type="date"] {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-family: 'Times New Roman', Times, serif;
}
</style>
