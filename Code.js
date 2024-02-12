function test() {
}

function getProperty(key) {
  const userProperties = PropertiesService.getUserProperties();
  const value = userProperties.getProperty(key);
  if (value === null) {
    return null;
  }
  const result = JSON.parse(value);
  return result;
}

function setProperty(key, object) {
  const userProperties = PropertiesService.getUserProperties();
  const value = JSON.stringify(object);
  userProperties.setProperty(key, value);
}
