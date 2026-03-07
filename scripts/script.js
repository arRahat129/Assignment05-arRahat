let allIssues = [];
const allFilterBtn = document.getElementById("all-filter-btn");
const openFilterBtn = document.getElementById("open-filter-btn");
const closedFilterBtn = document.getElementById("closed-filter-btn");

const issueCount = document.getElementById("issue-count");

const loadingSpinner = document.getElementById("loading-spinner");

const cardsContainer = document.getElementById("cards-container");

const searchInput = document.getElementById("search");

const searchBtn = document.getElementById("search-btn");

async function searchByTitle() {
    const text = searchInput.value.toLowerCase();
    // console.log(text);

    // const textSearch = allIssues.filter(issue => issue.title.toLowerCase().includes(text));
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);

    const data = await response.json();
    
    const textSearch = data.data;
    
    displayCards(textSearch);
    countLength();

    searchInput.value = "";
}

searchBtn.addEventListener("click", () => {
    searchByTitle();
})

function toogleStyle(id) {
    allFilterBtn.classList.remove("btn-primary");
    openFilterBtn.classList.remove("btn-primary");
    closedFilterBtn.classList.remove("btn-primary");

    allFilterBtn.classList.add("bg-white", "text-gray-500");
    openFilterBtn.classList.add("bg-white", "text-gray-500");
    closedFilterBtn.classList.add("bg-white", "text-gray-500");

    const selected = document.getElementById(id);

    selected.classList.remove("bg-white", "text-gray-500");
    selected.classList.add("btn-primary");
}

function showLoading() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    cardsContainer.innerHTML = "";
}

function hideLoading() {
    loadingSpinner.classList.remove("flex");
    loadingSpinner.classList.add("hidden");
}

function countLength() {
    let allCardsTotal = cardsContainer.children.length;
    // console.log(allCardsTotal);
    issueCount.innerText = `${allCardsTotal} Issues`;
}


async function loadAllIssues() {
    showLoading();
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    allIssues = data.data;

    // console.log((allIssues));
    
    hideLoading();
    
    displayCards(allIssues);
    countLength();
}

async function loadOpenIssues(){
    showLoading();

    if(allIssues.length === 0){
        await loadAllIssues();
        return;
    }
    
    const openIssues = allIssues.filter(issue => issue.status === "open");
    
    hideLoading();
    
    displayCards(openIssues);
    countLength();
}

async function loadClosedIssues(){

    showLoading();

    if(allIssues.length === 0){
        await loadAllIssues();
        return;
    }

    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    
    hideLoading();

    displayCards(closedIssues);
    countLength();
}

allFilterBtn.addEventListener("click", () => {
    displayCards(allIssues);
    countLength(allIssues);
}) ;

openFilterBtn.addEventListener("click", () => {
    loadOpenIssues();
});

closedFilterBtn.addEventListener("click", () => {
    loadClosedIssues();
});

function issueLabels(labels, container) {
    labels.forEach(label => {
        const button = document.createElement("button");
        let icon = "";

        if (label === "bug") {
            button.className = "w-fit bg-[#FEECEC] text-[#EF4444] border border-[#f7c3c3] p-2 rounded-full font-medium text-xs";
            icon = `<i class="fa-solid fa-bug text-[#EF4444]"></i>`;
        }
        else if (label === "help wanted") {
            button.className = "bg-[#FFF8DB] text-[#D97706] border border-[#FDE68A] p-2 rounded-full font-medium text-xs";
            icon = `<i class="fa-solid fa-life-ring text-[#D97706]"></i>`;
        }
        else if (label === "enhancement") {
            button.className = "bg-[#DEFCE8] text-[#00A96E] border border-[#BBF7D0] p-2 rounded-full font-medium text-xs";
            icon = `<i class="fa-regular fa-star text-[#00A96E]"></i>`;
        }
        else {
            button.className = "bg-[#DEFCE8] text-[#00A96E] border border-[#BBF7D0] p-2 rounded-full font-medium text-xs";
            icon = `<i class="fa-regular fa-clipboard" style="color: #00a96e;"></i>`
        }

        button.innerHTML = `
            ${icon} ${label.toUpperCase()}
        `;

        container.appendChild(button);

    });
}

function displayCards(issues) {
    // console.log(issues);
    cardsContainer.innerHTML = "";

    issues.forEach(issue => {
        const card = document.createElement("div");
        card.classList = `card shadow-md border-t-2 ${issue.status === "open" ? "border-t-[#00A96E]" : "border-t-[#A855F7]"}`;
        card.innerHTML = `
            <div class="upper-part space-y-3 p-3">
                <div class="flex justify-between items-center">
                    <div id="status" class="inner-card-img ${issue.status == "open" ? "bg-[#CBFADB]" : "bg-[#F0E2FF]"} p-2 rounded-full">
                        <img src="./assets/${issue.status}-Status.png" alt="">
                    </div>

                    <div id="priority">
                        <button id="priority-btn" class="${issue.priority === "high"
                ? "bg-[#FEECEC] text-[#EF4444]"
                : issue.priority === "medium"
                    ? "bg-[#FFF6D1] text-[#F59E0B]"
                    : issue.priority === "low"
                        ? "bg-[#EEEFF2] text-[#9CA3AF]"
                        : ""
            } px-8 py-2 rounded-full font-medium text-xs">${issue.priority.toUpperCase()}</button>
                    </div>
                </div>

                <div class="space-y-2">
                    <h2 id="title" class="text-[#1F2937] text-sm font-semibold">${issue.title}</h2>
                    <p id="description" class="text-[#64748B] text-xs line-clamp-2">${issue.description}</p>
                    <div class="labels flex gap-2">
                        
                    </div>
                </div>
            </div>

            <hr class="w-full border border-gray-200">

            <div class="lower-part space-y-2 p-3">
                <p id="author" class="text-[#64748B] text-xs">#${issue.id} by ${issue.author}</p>
                <p id="created-at" class="text-[#64748B] text-xs">${issue.createdAt}</p>
            </div>
        `;

        const labelContainer = card.querySelector('.labels');
        issueLabels(issue.labels, labelContainer);

        cardsContainer.appendChild(card);
    });
}

loadAllIssues();