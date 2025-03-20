
document.getElementById("domainInput").addEventListener("input", function() {
    let urls = this.value.trim().split("\n").filter(url => url !== "");
    document.getElementById("inputCount").innerText = `Total Input: ${urls.length} URLs`;
});


function extractDomains() {
    document.getElementById("progress").classList.remove("hidden");
    setTimeout(() => {
        let urls = document.getElementById("domainInput").value.trim().split("\n");
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

        document.getElementById("domainOutput").innerHTML = 
            extractedDomains.length > 0 ? extractedDomains.join("<br>") : "No valid domains found.";
        document.getElementById("extractedCount").innerText = `Total Extracted: ${extractedDomains.length} Domains`;
        document.getElementById("progress").classList.add("hidden");
    }, 500);
}

function copyToClipboard() {
    let text = document.getElementById("domainOutput").innerText;
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
    let resultDiv = document.getElementById("domainOutput");
    range.selectNodeContents(resultDiv);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function clearDomains() {
    document.getElementById("domainInput").value = "";
    document.getElementById("domainOutput").innerText = "";
    document.getElementById("invalidUrls").innerText = "";
    document.getElementById("inputCount").innerText = "Total Input: 0 URLs";
    document.getElementById("extractedCount").innerText = "Total Extracted: 0 Domains";
}

function downloadResults(type) {
    let text = document.getElementById("domainOutput").innerText;
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
    let urlInput = document.getElementById("domainInput");
    urlInput.value = e.target.result;
    urlInput.dispatchEvent(new Event("input")); // Trigger input event if needed
    };
    reader.readAsText(file);
    });



function extractEmails() {
    let text = document.getElementById("inputText").value;
    let emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    let emails = text.match(emailPattern) || [];

    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    let emailCount = emails.length;


        // Show the count of emails
        let countElement = document.createElement("p");
        countElement.textContent = `Total Emails Found: ${emailCount}`;
        countElement.style.fontWeight = "bold";
        countElement.style.color = "rgb(252, 252, 252)"; // Green for count
        outputDiv.appendChild(countElement);
    
        if (emailCount > 0) {
            emails.forEach(email => {
                let emailElement = document.createElement("p");
                emailElement.textContent = email;
                emailElement.style.color = "#ffeb3b"; // Stylish color for emails
                emailElement.style.fontWeight = "bold";
                outputDiv.appendChild(emailElement);
            });
        } else {
            outputDiv.innerHTML = "<p style='color: red;'>❌ No emails found!</p>";
        }
    }



    function extractEmails() {
        const inputText = document.getElementById('emailInput').value;
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const extractedEmails = inputText.match(emailRegex);
        const outputDiv = document.getElementById('emailOutput');
    
        if (extractedEmails && extractedEmails.length > 0) {
            // Remove duplicate emails
            const uniqueEmails = [...new Set(extractedEmails)];
    
            // Display emails
            outputDiv.innerHTML = uniqueEmails.join('<br>');
        } else {
            outputDiv.innerHTML = "No emails found.";
        }
    }


    function copyClipboardEmail() {
        let text = document.getElementById("emailOutput").innerText;
        let copyButton = document.getElementById("copyEmail");
    
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



    
function clearEmail() {
    document.getElementById("emailInput").value = "";
    document.getElementById("emailOutput").innerHTML = "";
}


    // Menu Toggle for Mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Form Submission
function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    // Simulate form submission (replace with actual backend logic)
    status.textContent = "Sending your message...";
    status.style.color = "#007bff";

    setTimeout(() => {
        status.textContent = "Message sent successfully!";
        status.style.color = "#28a745";
        form.reset();
    }, 1000);
}

