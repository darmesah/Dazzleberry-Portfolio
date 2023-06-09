const Input = (props) => {
  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        required={props.required}
      />
    ) : (
      <textarea
        name={props.name}
        placeholder={props.placeholder}
        rows={props.rows || 3}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    );

  return (
    <div className={props.className}>
      <label htmlFor={props.name}>{props.label}</label>
      <br />
      {element}
      {props.hasError}
    </div>
  );
};

export default Input;
