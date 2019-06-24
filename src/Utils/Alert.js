import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export class Alert {
    static success(message) {
        toastr.options = {
            positionClass: 'toast-top-right',
            hideDuration: 300,
            timeOut: 5000
        };
        toastr.success(message);
    }

}
