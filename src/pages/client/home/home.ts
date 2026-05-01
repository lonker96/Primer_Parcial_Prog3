import { checkAuhtUser, logout } from "../../../utils/auth";
import { navigate } from "../../../utils/navigate";

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const buttonCatalogo = document.getElementById(
  "CatalogoButton"
) as HTMLButtonElement;
buttonCatalogo?.addEventListener("click",() => {
  console.log("Catalogo");
    navigate("/src/pages/store/home.html")
})

const initPage = () => {
  console.log("inicio de pagina");
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );
};

initPage();
