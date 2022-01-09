import Button from './button';
import Input from './input';

const Save = (props) => {
  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      props.onEnterPress();
    }
  }

  return (
    <div style={{width: "100%"}}>
      <Input 
        style={{width: "80%"}} 
        value={props.value} 
        onChange={props.onChange} 
        placeholder={props.placeholder}
        onKeyPress={onKeyPressHandler}
      />
      <Button 
        style={{width: "20%"}}
        onClick={props.onClick}
        disabled={props.disabled}
      >{props.label}</Button>
    </div>
  )
}

export default Save;