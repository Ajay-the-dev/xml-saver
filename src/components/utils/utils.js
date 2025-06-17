// utils/toast.js
import Swal from 'sweetalert2'

export function showToast(message = 'Success', type = 'success',time = 3000) {
  // console.log('toaster called');
  
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
  })
}
