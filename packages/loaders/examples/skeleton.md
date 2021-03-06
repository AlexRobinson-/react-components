```jsx
const { XXXL, XXL, MD } = require('@zendeskgarden/react-typography/src');
const { Button } = require('@zendeskgarden/react-buttons/src');
const { Field, Checkbox, Label } = require('@zendeskgarden/react-forms/src');

initialState = {
  isLoading: true,
  isDarkMode: false
};

const StyledCol = styled(Col)`
  background-color: ${props => (props.isDarkMode ? PALETTE.kale[700] : PALETTE.white)};
  color: ${props => (props.isDarkMode ? PALETTE.white : PALETTE.black)};
  padding: 18px;
`;

<Grid>
  <Row alignItems="start">
    <StyledCol md={8} isDarkMode={state.isDarkMode}>
      <XXXL>
        {state.isLoading ? <Skeleton isLight={state.isDarkMode} /> : 'There. You see Lord Vader.'}
      </XXXL>
      {state.isLoading && (
        <MD>
          <Skeleton isLight={state.isDarkMode} />
          <Skeleton isLight={state.isDarkMode} />
          <Skeleton isLight={state.isDarkMode} />
        </MD>
      )}
      {!state.isLoading && (
        <MD>
          Continue with the operation. You may fire when ready. What? You're far too trusting.
          Dantooine is too remote to make an effective demonstration. But don't worry. We will deal
          with your Rebel friends soon enough. No! Commence primary ignition.
        </MD>
      )}
    </StyledCol>
    <StyledCol md={4}>
      <Button isStretched onClick={() => setState({ isLoading: !state.isLoading })}>
        Toggle Skeleton Loaders
      </Button>
      <br />
      <br />
      <Field>
        <Checkbox
          checked={state.isDarkMode}
          onChange={e => setState({ isDarkMode: e.target.checked })}
        >
          <Label>Dark mode</Label>
        </Checkbox>
      </Field>
    </StyledCol>
  </Row>
</Grid>;
```
