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

       const [activeTab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        })
        
        if (!activeTab) {
            return
        }

        let parsedUrl;
        try {
            parsedUrl = new URL(activeTab.url)
        } catch(error) {
            console.error('Invalid URL in activeTab: ', error)
        }

        const activeEntry = entries.find(entry => entry.url.includes(parsedUrl.hostname))

        if (activeEntry) {
            this.mainTarget.innerHTML = main(activeEntry)
        }

    }


    updateMain({ params}) {
        const entry = event.currentTarget.dataset.entriesEntryParam
        this.mainTarget.innerHTML = main(params.entry);
    }

    navigateToLogin({ params }) {
        chrome.tabs.create({url: params.entry.url})
    }

    async fillInCredentials({ params }) {
        const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
        })

        if (!activeTab) {
        return
        }

        let parsedUrl;
        try {
        parsedUrl = new URL(activeTab.url)
        } catch(error) {
        console.error('Invalid URL in activeTab: ', error)
        }

        const activeEntry = params.entry.url.includes(parsedUrl.hostname)

        if (activeEntry) {
        chrome.tabs.sendMessage(activeTab.id, {
            username: params.entry.username,
            password: params.entry.password
        })
        }
    }




}

export default EntriesController;