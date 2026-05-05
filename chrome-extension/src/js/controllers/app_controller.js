import { Controller } from "@hotwired/stimulus";
import { setSessionStorage } from "../services/storage_service";

class AppController extends Controller {
  async connect() {
    console.log("app controller connected")
    const token = await getSessionStorage("token");

    if (token) {
        Turbo.visit("/frames/entries.html", { frame: "app" })
    }
  }
}

export default AppController;