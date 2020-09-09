```jsx
const { Well } = require('@zendeskgarden/react-notifications/src');
const { Toggle, Field, Input, Label } = require('@zendeskgarden/react-forms/src');

const BasicExample = () => {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const dialogRef = React.useRef();
  const colorPickerRef = React.useRef();
  React.useEffect(() => {
    if (showColorPicker) {
      dialogRef.current.focus();
    }
  }, [showColorPicker]);

  // 🤮
  React.useEffect(() => {
    const listener = e => {
      setTimeout(() => {
        if (e.target.contains(document.activeElement) === false) {
          setShowColorPicker(false);
        }
      });
    };

    if (showColorPicker) {
      const focusableDescendants = Array.from(dialogRef.current.querySelectorAll('*')).filter(
        e => e.tabIndex > -1
      );

      dialogRef.current.addEventListener('blur', listener);
      focusableDescendants.forEach(element => {
        element.addEventListener('blur', e => {
          setTimeout(() => {
            if (dialogRef.current.contains(document.activeElement) === false) {
              setShowColorPicker(false);
            }
          }, 0);
        });
      });
    }

    return () => {
      dialogRef.current && dialogRef.current.removeEventListener('blur', listener);
    };
  }, [showColorPicker]);

  const [controlledHex, setControlledHex] = React.useState('#b4da55');
  const [controlledRgb, setControlledRgb] = React.useState('#b4da55');
  const magenta = 'rgb(255,0,255,0.5)';

  return (
    <>
      <span>Controlled RGB Color Picker:</span>
      <br />
      <br />
      <button onClick={() => setControlledRgb(magenta)}>Set to rgb(255,0,255, 0.5)</button>
      <ColorPicker
        ref={colorPickerRef}
        color={controlledRgb}
        onChange={color => {
          setControlledRgb(color.rgbString);
        }}
      />
      <br />
      <hr />
      <br />
      <span>Uncontrolled Color Picker:</span>
      <br />
      <br />
      <ColorPicker ref={colorPickerRef} onChange={console.log} defaultColor="#b4da55" />
      <br />
      <hr />
      <br />
      <button onClick={() => setShowColorPicker(!showColorPicker)}>
        Show Controlled HEX Color Picker
        <span
          style={{
            height: '15px',
            width: '15px',
            display: 'inline-block',
            background: controlledHex
          }}
        ></span>
      </button>
      {showColorPicker ? (
        <>
          <div
            tabIndex={-1}
            style={{ width: '292px', position: 'absolute', background: '#FFF' }}
            ref={dialogRef}
          >
            <ColorPicker
              ref={colorPickerRef}
              color={controlledHex}
              onChange={color => {
                setControlledHex(color.hex);
              }}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

<BasicExample />;
```
