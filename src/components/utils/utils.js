// utils/toast.js
import Swal from 'sweetalert2'

export function showToast(message = 'Success', type = 'success') {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  })
}
