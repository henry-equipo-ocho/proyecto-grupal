const reducer = (action, payload) => {
  if (action === 'SET_PAGE') {
    setPage([...data, payload])
  }
}
export default reducer;