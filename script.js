document.addEventListener("mousemove", (e) => {
    const container = document.querySelector(".container");
    const rect = container.getBoundingClientRect();

    // Check if cursor is inside the container
    if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    ) {
        return; // Stop effect inside the container
    }

    for (let i = 0; i < 5; i++) { // Creates multiple particles per move
        let particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = (e.pageX + (Math.random() * 20 - 10)) + "px";
        particle.style.top = (e.pageY + (Math.random() * 20 - 10)) + "px";
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1500); // Remove after animation
    }
});


document.getElementById("urlInput").addEventListener("input", function() {
    let urls = this.value.trim().split("\n").filter(url => url !== "");
    document.getElementById("totalInput").innerText = `Total Input: ${urls.length} URLs`;
});

function extractDomains() {
    document.getElementById("progress").classList.remove("hidden");
    setTimeout(() => {
        let urls = document.getElementById("urlInput").value.trim().split("\n");
        let extractedDomains = []; // ⚡ HIGHLIGHTED: Using array to allow duplicates
        let tldFilter = document.getElementById("tldFilter").value.toLowerCase(); // ⚡ HIGHLIGHTED: Ensure case-insensitive comparison

        urls.forEach(url => {
            url = url.trim();
            if (url) {
                try {
                    if (!/^https?:\/\//i.test(url)) { // 🔥 HIGHLIGHTED: Corrected regex for URL validation
                        url = "https://" + url;
                    }
                    let hostname = new URL(url).hostname.replace(/^www\./i, ''); // ⚡ HIGHLIGHTED: Now properly removes 'www.'

                    let domainParts = hostname.split(".");
                    let tld = domainParts.length > 1 ? `.${domainParts.pop()}` : ""; // ⚡ HIGHLIGHTED: Extract TLD correctly

                    if (tldFilter === "all" || tld === tldFilter) { // ⚡ HIGHLIGHTED: Fixed TLD filter logic
                        extractedDomains.push(hostname); // 🔥 HIGHLIGHTED: Duplicates now retained
                    }
                } catch (error) {
                    // ⚡ HIGHLIGHTED: Removed invalid URLs handling and output
                }
            }
        });

        document.getElementById("result").innerHTML = 
            extractedDomains.length > 0 ? extractedDomains.join("<br>") : "No valid domains found.";
        document.getElementById("totalOutput").innerText = `Total Extracted: ${extractedDomains.length} Domains`;
        document.getElementById("progress").classList.add("hidden");
    }, 500);
}
function copyToClipboard() {
    let text = document.getElementById("result").innerText;
    let copyButton = document.getElementById("copyButton");

    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            copyButton.innerHTML = "✅ Copied"; // Change button text
            setTimeout(() => {
                copyButton.innerHTML = "📋 Copy"; // Revert after 2 seconds
            }, 2000);
        }).catch(() => {
            alert("Failed to copy!");
        });
    }
}

function selectAllText() {
    let range = document.createRange();
    let resultDiv = document.getElementById("result");
    range.selectNodeContents(resultDiv);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function clearFields() {
    document.getElementById("urlInput").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("invalidUrls").innerText = "";
    document.getElementById("totalInput").innerText = "Total Input: 0 URLs";
    document.getElementById("totalOutput").innerText = "Total Extracted: 0 Domains";
}

function downloadResults(type) {
    let text = document.getElementById("result").innerText;
    if (!text) return alert("No data to download.");
    let blob = new Blob([text], { type: type === "csv" ? "text/csv" : "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `extracted_domains.${type}`;
    link.click();
}


document.getElementById("fileUpload").addEventListener("change", function() {
    let file = this.files[0];
    if (!file) return;
    
    let reader = new FileReader();
    reader.onload = function(e) {
    let urlInput = document.getElementById("urlInput");
    urlInput.value = e.target.result;
    urlInput.dispatchEvent(new Event("input")); // Trigger input event if needed
    };
    reader.readAsText(file);
    });



function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
