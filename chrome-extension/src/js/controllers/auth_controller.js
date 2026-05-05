import { Controller } from "@hotwired/stimulus"

class AuthController extends Controller {
  static targets = [ "flash", "email", "password" ]

  async signIn(event) {
    try {

      const response = await fetch("http://localhost:3000/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.emailTarget.value,
          password: this.passwordTarget.value
        })
      });

      const data = await response.json();

      if (data.token) {
        //localStorage.setItem("authToken", data.token);
        console.log(data.token);
        Turbo.visit('/frames/entries.html', { frame: 'app' });
        
      } 

      if (data.errors) {
        this.flashTarget.innerHTML = `<div class="p-3 bg-danger text-white rounded my-3">
                                        ${data.errors[0]}
                                      </div>`;
      }

    } catch (error) {
      console.error("Error during sign-in:", error);
      this.flashTarget.textContent = "An unexpected error occurred.";
    }
  }
}

export default AuthController;