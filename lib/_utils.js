export function checkIfMeteorIsPresent() {
  if (typeof Package === 'undefined') {
    const error = 'This package is only available with Meteor.';
    throw new Error(error);
  }

  return;
}
