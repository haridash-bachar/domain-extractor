document.getElementById("urlInput").addEventListener("input", function() {
    let urls = this.value.trim().split("\n").filter(url => url !== "");
    document.getElementById("totalInput").innerText = `Total Input: ${urls.length} URLs`;
});

function extractDomains() {
    let urls = document.getElementById("urlInput").value.trim().split("\n");
    let totalInput = urls.length;
    let extractedDomains = [];

    urls.forEach(url => {
        url = url.trim();
        if (url) {
            try {
                if (!/^https?:\/\//i.test(url)) {
                    url = "https://" + url;
                }
                let hostname = new URL(url).hostname.replace(/^www\./, '');
                extractedDomains.push(hostname);
            } catch (error) {
                console.warn("Invalid URL skipped:", url);
            }
        }
    });

    let totalOutput = extractedDomains.length;

    document.getElementById("result").innerHTML = 
        totalOutput > 0 ? extractedDomains.join("<br>") : "No valid URLs found. Please check your input.";

    document.getElementById("totalOutput").innerText = `Total Extracted: ${totalOutput} Domains`;
}

function copyToClipboard() {
    let text = document.getElementById("result").innerText;
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        }).catch(err => {
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
    document.getElementById("totalInput").innerText = "Total Input: 0 URLs";
    document.getElementById("totalOutput").innerText = "Total Extracted: 0 Domains";
}
