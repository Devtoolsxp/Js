// Configuração do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  databaseURL: "https://SEU_PROJECT_ID.firebaseio.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};

// Inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

// Funções de Autenticação
async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário registrado:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao registrar:", error.message);
  }
}

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuário logado:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
  }
}

async function logout() {
  try {
    await signOut(auth);
    console.log("Usuário deslogado");
  } catch (error) {
    console.error("Erro ao deslogar:", error.message);
  }
}

// Funções do Realtime Database
async function addData(path, data) {
  try {
    const reference = ref(db, path);
    await set(reference, data);
    console.log("Dados adicionados:", data);
  } catch (error) {
    console.error("Erro ao adicionar dados:", error.message);
  }
}

async function getData(path) {
  try {
    const reference = ref(db, path);
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      console.log("Dados recuperados:", snapshot.val());
      return snapshot.val();
    } else {
      console.log("Nenhum dado encontrado.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
  }
}

async function updateData(path, data) {
  try {
    const reference = ref(db, path);
    await update(reference, data);
    console.log("Dados atualizados:", data);
  } catch (error) {
    console.error("Erro ao atualizar dados:", error.message);
  }
}

async function deleteData(path) {
  try {
    const reference = ref(db, path);
    await remove(reference);
    console.log("Dados excluídos:", path);
  } catch (error) {
    console.error("Erro ao excluir dados:", error.message);
  }
}

// Exemplo de uso das funções
async function exemplo() {
  // Registrar um novo usuário
  await register("usuario@example.com", "senha123");

  // Logar o usuário
  await login("usuario@example.com", "senha123");

  // Adicionar dados no Realtime Database
  await addData("usuarios/1", { nome: "João", idade: 30 });

  // Buscar dados
  await getData("usuarios/1");

  // Atualizar dados
  await updateData("usuarios/1", { idade: 31 });

  // Excluir dados
  await deleteData("usuarios/1");

  // Deslogar o usuário
  await logout();
}

// Chamar a função de exemplo
exemplo();