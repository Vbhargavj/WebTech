import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  console.log(typeof(data))
  try {
    console.log(data);
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/user/updatepassword'
        : 'http://127.0.0.1:3000/api/v1/user/updateMe';

    console.log(url);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "name":"bhargav",
        "email":"admin@natours.io"
      }
    });

    const responseData = await response.json();

    if (response.ok && responseData.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    } else {
      throw new Error(responseData.message || 'Failed to update settings');
    }
  } catch (error) {
    console.error(error);
    showAlert('error', 'An error occurred while updating settings');
  }
};
