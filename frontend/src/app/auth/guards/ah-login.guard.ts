import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { AhLoginService } from "../services/ah-login.service";

export const isLoggedGuard = () => {
  const _login = inject(AhLoginService);
  const router = inject(Router);

  if (_login.isLogged()){
    return true;
  };
  
  return router.navigate(['/login']);
}