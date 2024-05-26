<template>
  <div class="container">
      <h2>Project Details</h2>
      <div v-if="project" class="project-detail">
          <h2>{{ project.projectName }}</h2>
          <h2>Description</h2>
          <p>Department: {{ project.department }}</p>
          <p>Start Date: {{ formatDate(project.startDate) }}</p>
          <p>End Date: {{ formatDate(project.endDate)}}</p>
          <router-link to="/projects" class="btn btn-primary">Back to Projects</router-link>
          <button @click="editProject" class="btn btn-primary">Edit</button>
          <button @click="deleteProject" class="btn btn-danger">Delete</button>
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

const project = ref(null);
const route = useRoute();
const router = useRouter();

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
};

const fetchProject = async () => {
  try {
      const projectId = route.params.id;
      if (projectId) {
          const response = await apiService.getProjectById(projectId);
          console.log('fetchProject:',response.value);
          if (response && response.length > 0) {
              project.value = response[0];
          }
      }
  } catch (error) {
      console.error('Error fetching project details:', error);
  }
};

const deleteProject = async () => {
try {
  const confirmed = confirm('Are you sure you want to delete this project?');
  if (confirmed) {
    const projectId = route.params.id;
    await apiService.deleteProject(projectId);
    router.push('/projects');
  }
} catch (error) {
  console.error('Error deleting project:', error);
}
};

const editProject = () => {
const projectId = route.params.id;
router.push(`/projects/${projectId}/edit-project`);
};

onMounted(() => {
  fetchProject();
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

h2 {
margin-top: 20px;
font-size: 50px;
}

.project-detail {
  margin: 20px;
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

.btn-danger {
background-color: #ff6347;
color: white;
}

.btn-primary,
.btn-danger {
margin-right: 10px;
}
</style>
