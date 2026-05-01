import type { IUser } from "../../../types/IUser";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const usuariosRegistrados: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  // verificamos si el usuario ya esta registrado
  const usuarioExistente = usuariosRegistrados.find((u) => u.email === valueEmail);
  if(usuarioExistente){
    alert("Este correo ya esta registrado.")
    return
  }else{
  //Despues de verificar y ver que no existe, creamos un nuevo usuario (por defecto va a ser cliente y loggedIn false)
    const newUser: IUser ={
        email: valueEmail,
        password: valuePassword,
        role: "client",
        loggedIn: false
    };
    usuariosRegistrados.push(newUser);
    alert("Usuario registrado correctamente");
    localStorage.setItem("users", JSON.stringify(usuariosRegistrados));
  }
  form.reset();
});