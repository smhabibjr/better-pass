import { Controller } from "@hotwired/stimulus";
import { getSessionStorage } from "../services/storage_service";
import fetchEntries from "../services/fetch_entries_service";
import { sidebar, main } from "../templates/entries_templates";


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

        try {
            this.sidebarTarget.innerHTML = sidebar(entries)
            this.mainTarget.innerHTML = main(entries[0])
        } catch (error) {
            console.error("Error rendering entries:", error);
        }
    }


    updateMain({ params}) {
        const entry = event.currentTarget.dataset.entriesEntryParam
        this.mainTarget.innerHTML = main(params.entry);
    }


}

export default EntriesController;