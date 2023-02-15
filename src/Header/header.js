import style from "./header.module.css";
import logoImage from "../Media/Favourite Games.png";

export default function Header() {
  return (
    <div className={style.header_container}>
      <img src={logoImage} alt="site logo" className={style.logo} />
    </div>
  );
}
