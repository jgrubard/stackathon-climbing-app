export const notify = (name) => {
  return new Notification('beta≈Together', {
    body: `${name} has accepted your request`,
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1629600-200.png'
  })
}
