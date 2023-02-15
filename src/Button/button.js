import style from "./button.module.css";

export default function Button(props) {
  return <div className={style.button_container} onClick={props.submitForm}>
    <span className={style.button_text}>Add Game</span>
  </div>;
}
