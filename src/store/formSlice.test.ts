import formReducer, { setAddress, setTitle, setDescription, setLoading, setMessage, resetForm } from './formSlice';

describe('formSlice', () => {
  const initialState = {
    address: '',
    title: '',
    description: '',
    loading: false,
    message: '',
  };

  it('should set the address', () => {
    const state = formReducer(initialState, setAddress('test-address'));
    expect(state.address).toBe('test-address');
  });

  it('should set the title', () => {
    const state = formReducer(initialState, setTitle('New Title'));
    expect(state.title).toBe('New Title');
  });

  it('should set the description', () => {
    const state = formReducer(initialState, setDescription('New Desc'));
    expect(state.description).toBe('New Desc');
  });

  it('should set loading', () => {
    const state = formReducer(initialState, setLoading(true));
    expect(state.loading).toBe(true);
  });

  it('should set the message', () => {
    const state = formReducer(initialState, setMessage('Hello'));
    expect(state.message).toBe('Hello');
  });

  it('should reset the form', () => {
    const filledState = {
      address: 'abc',
      title: 't',
      description: 'd',
      loading: true,
      message: 'm',
    };
    const state = formReducer(filledState, resetForm());
    expect(state).toEqual(initialState);
  });
});
