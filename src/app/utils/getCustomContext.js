export default ({app, setStyle}) => {
  const context = app.createContext();
  const componentContext = context.getComponentContext();
  context.getComponentContext = () => Object.assign(componentContext, {setStyle});
  return context;
};
