import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userKey = 'usuarios';
  private loggedUserKey = 'usuarioLogado';

  // 👉 Registrar novo usuário
  registerUser(nome: string, email: string, senha: string): boolean {
    let users = JSON.parse(localStorage.getItem(this.userKey) || '[]');

    if (users.find((u: any) => u.email === email)) {
      return false; // email já existe
    }

    users.push({ nome, email, senha });
    localStorage.setItem(this.userKey, JSON.stringify(users));
    return true;
  }

  // 👉 Fazer login
  login(email: string, senha: string): any {
  const users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
  const user = users.find((u: any) => u.email === email && u.senha === senha);

  if (user) {
    localStorage.setItem(this.loggedUserKey, JSON.stringify(user));
    return user; // ✅ Retorna o objeto do usuário
  }

  return null;
}


  // 👉 Pegar usuário logado
  getLoggedUser(): any {
    return JSON.parse(localStorage.getItem(this.loggedUserKey) || 'null');
  }

  // 👉 Sair
  logout() {
    localStorage.removeItem(this.loggedUserKey);
  }
}
