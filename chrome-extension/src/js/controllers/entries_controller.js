import { Controller } from "@hotwired/stimulus";
import { getSessionStorage } from "../services/storage_service";
import fetchEntries from "../services/fetch_entries_service";


class EntriesController extends Controller {
    static targets = [ "sidebar", "main" ]

    async connect() {
        console.log("Entries controller connected");
        const token = await getSessionStorage('token');

        if (!token) {
            document.dispatchEvent(new CustomEvent('auth:signOut'))
            return
        }

        const entries = await fetchEntries()
        console.log(entries)
    }

     toggleSidebar() {
        this.sidebarTarget.classList.toggle("hidden");
        this.mainTarget.classList.toggle("w-full");
        this.mainTarget.classList.toggle("w-3/4");
     }


}

export default EntriesController;