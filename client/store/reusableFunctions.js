export const notifyAccepted = (name) => {
  const options = {
    body: `${name} has accepted your request`,
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1629600-200.png'
  }
  return new Notification('beta≈Together', options);
}

export const notifyRequest = (name) => {
  const options = {
    body: `${name} has requested to climb with you`,
    icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1629600-200.png'
  }
  return new Notification('beta≈Together', options);
}
