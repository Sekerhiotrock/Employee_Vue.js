<template>
  <div class="home stylish-background">
    <header class="button">
      <h1>Welcome to Management Application</h1>
      <p>Your one-stop solution for managing employees departments and projects.</p>
      <button @click="learnMore">Learn More</button>
      <button @click="Getstarted" class="start-button">Start</button>
    </header>
    <section class="features">
      <div class="feature">
        <h2>Managing employees</h2>
        <p>View current employees and their description</p>
      </div>
      <div class="feature">
        <h2>Managing departments</h2>
        <p>View or move their departments.</p>
      </div>
      <div class="feature">
        <h2>Managing projects</h2>
        <p>View current projects in progress and which employees were assigned to</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    learnMore() {
      this.$router.push('/no');
    },
    Getstarted() {
      this.$router.push('/employees');
    }
  }
}
</script>

<style scoped>
.home {
  font-family: 'Times New Roman', Times, serif;
  color: #333;
}

.stylish-background {
  background: linear-gradient(to right, #000000, #00f2fe);
}

.button {
  padding: 60px 20px;
  text-align: center;
  color: white;
}

.button h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.button p {
  font-size: 1.5em;
  margin-bottom: 30px;
}

.button button {
  background-color: #ffffff;
  color: #4facfe;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.button button:hover {
  background-color: #4facfe;
  color: #fff;
}

.start-button {
  background-color: #ff6347;
  color: white;
}

.features {
  display: flex;
  justify-content: space-around;
  padding: 40px 20px;
  background-color: #f9f9f9;
}

.feature {
  background-color: #fff;
  padding: 25px;
  width: 32%;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.feature h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.feature p {
  font-size: 1em;
}
</style>
