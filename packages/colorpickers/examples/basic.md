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
  const orange = '#FFA500';

  return (
    <>
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
              onChange={(event, color) => {
                setControlledHex(color.str);
              }}
            />
            <button onClick={() => setControlledHex(orange)}>Set to orange</button>
          </div>
        </>
      ) : null}
    </>
  );
};

<>
  <span>Uncontrolled ColorPicker</span>
  <ColorPicker showPreview={true} />

  <span>Uncontrolled ColorPicker no alpha</span>
  <ColorPicker alphaType="none" />

  <br />
  <hr />
  <br />

  <BasicExample />

  <br />
  <br />
  <br />
</>;
```
