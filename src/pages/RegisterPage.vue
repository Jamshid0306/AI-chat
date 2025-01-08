<template>
    <div class="auth-page">
      <div class="auth-card">
        <h1>{{ isLogin ? "Login" : "Register" }}</h1>
  
        <form v-if="isLogin && !verificationSent" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
              class="input-field"
            />
            <small v-if="emailError" class="error">{{ emailError }}</small>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
              class="input-field"
            />
            <small v-if="passwordError" class="error">{{ passwordError }}</small>
          </div>
          <button type="submit" class="btn">Login</button>
        </form>
  
        <form v-if="!isLogin && !verificationSent" @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              placeholder="Enter your first name"
              required
              class="input-field"
            />
            <small v-if="nameError" class="error">{{ nameError }}</small>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              placeholder="Enter your last name"
              required
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
              class="input-field"
            />
            <small v-if="emailError" class="error">{{ emailError }}</small>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
              class="input-field"
            />
          </div>
          <button type="submit" class="btn">Register</button>
        </form>
  
        <div v-if="verificationSent">
          <p>
            We have sent a verification link to your email. Please check your inbox
            and click the link to activate your account.
          </p>
          <p>
            <a href="#" @click.prevent="toggleLogin">Already have an account? Login here.</a>
          </p>
        </div>
  
        <p v-if="!verificationSent">
          {{ isLogin ? "Don’t have an account?" : "Already have an account?" }}
          <a href="#" @click.prevent="toggleLogin">{{ isLogin ? "Register" : "Login" }}</a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { auth } from "../../firebase";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
  } from "firebase/auth";
  
  const firstName = ref("");
  const lastName = ref("");
  const email = ref("");
  const password = ref("");
  const nameError = ref("");
  const emailError = ref("");
  const passwordError = ref("");
  const verificationSent = ref(false);
  const isLogin = ref(false);
  const router = useRouter();
  
  onMounted(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
  
    if (storedEmail && storedPassword) {
      handleAutoLogin(storedEmail, storedPassword);
    }
  });
  
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
  
      const fullName = `${firstName.value} ${lastName.value}`;
      localStorage.setItem("userName", fullName);
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
  
      verificationSent.value = true;
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        emailError.value = "Email is already in use.";
      } else if (error.code === "auth/weak-password") {
        passwordError.value = "Password should be at least 6 characters.";
      } else {
        emailError.value = "An error occurred. Please try again.";
      }
    }
  };
  
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        emailError.value = "Please verify your email first.";
        return;
      }
  
      const userName = user.displayName || `${firstName.value} ${lastName.value}`;
      localStorage.setItem("userName", userName);
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
  
      router.push("/dashboard");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        passwordError.value = "Incorrect password.";
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        emailError.value = "User not found.";
        alert("User not found. Please check your email.");
      } else {
        emailError.value = "An error occurred. Please try again.";
        alert("An error occurred. Please try again.");
      }
    }
  };
  
  const handleAutoLogin = async (storedEmail, storedPassword) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        storedEmail,
        storedPassword
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        emailError.value = "Please verify your email first.";
        return;
      }
  
      router.push("/dashboard");
    } catch (error) {
      console.error("Auto login failed:", error);
    }
  };
  
  const toggleLogin = () => {
    isLogin.value = !isLogin.value;
    verificationSent.value = false;
  };
  </script>
  
  <style scoped>
  .auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .auth-card {
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 30px;
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  
  .input-field {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  
  button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  
  p {
    margin-top: 20px;
    font-size: 14px;
  }
  
  p a {
    color: #007bff;
    text-decoration: none;
  }
  
  p a:hover {
    text-decoration: underline;
  }
  </style>
  