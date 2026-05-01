import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;


form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;
  
  //Traemos el array de usuarios del localStorage
  const usuariosRegistrados: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
  
  //Verificamos si el usuario existe
  const usuarioEncontrado = usuariosRegistrados.find((u) => u.email === valueEmail && u.password === valuePassword);
  
  //Si el usuario existe 
  if(usuarioEncontrado){
  usuarioEncontrado.loggedIn = true; //Ponemos su estado de logeado en True
  localStorage.setItem("userData",JSON.stringify(usuarioEncontrado));

    if(usuarioEncontrado.role === "admin"){
      navigate("/src/pages/admin/home/home.html");
    }else{
      navigate("/src/pages/client/home/home.html");
    }

  }else{
    alert("email o contraseña incorrectos.")
  }
});