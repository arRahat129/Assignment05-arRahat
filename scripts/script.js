const allFilterBtn = document.getElementById("all-filter-btn");
const openFilterBtn = document.getElementById("open-filter-btn");
const closedFilterBtn = document.getElementById("closed-filter-btn");

const issueCount = document.getElementById("issue-count");

const cardsContainer = document.getElementById("cards-container");

const labelContainer = document.querySelectorAll("#labels");

function toogleStyle(id){
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
    treesContainer.innerHTML = "";
}

function hideLoading() {
    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
}

function countLength(issues){
    let allCardsTotal = issues.length;
    // console.log(allCardsTotal);
    issueCount.innerText = `${allCardsTotal} Issues`
    
}


async function loadAllIssues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    const issues = data.data;
    
    displayCards(issues);
    countLength(issues);
    
}

function issueLabels(labels, container){
    labels.forEach(label => {
        const button = document.createElement("button");
        let icon = "";
        
        if(label === "bug"){
            button.className = "w-fit bg-[#FEECEC] text-[#EF4444] border border-[#f7c3c3] p-2 rounded-full font-medium text-xs";
            icon = `<i class="fa-solid fa-bug text-[#EF4444]"></i>`;
        }
        else if(label === "help wanted"){
            button.className = "bg-[#FFF8DB] text-[#D97706] border border-[#FDE68A] p-2 rounded-full font-medium text-xs";
            icon = `<i class="fa-solid fa-life-ring text-[#D97706]"></i>`;
        }
        else if(label === "enhancement"){
            button.className = "bg-[#DEFCE8] text-[#00A96E] border border-[#BBF7D0] p-2 rounded-full font-medium text-xs";
            icon = `<i class="fa-regular fa-star text-[#00A96E]"></i>`;
        }
        else{
            button.className = "hidden";
        }

        button.innerHTML = `
            ${icon} ${label}
        `;

        container.appendChild(button);
        
    });
}

function displayCards(issues){
    // console.log(issues);
    
    issues.forEach(issue => {
        const card = document.createElement("div");
        card.classList = "card shadow-md border-t-2 border-t-[#00A96E]"
        card.innerHTML = `
            <div class="upper-part space-y-3 p-3">
                <div class="flex justify-between items-center">
                    <div id="status" class="inner-card-img ${issue.status == "open" ? "bg-[#CBFADB]" : "bg-[#F0E2FF]"} p-2 rounded-full">
                        <img src="./assets/${issue.status}-Status.png" alt="">
                    </div>

                    <div id="priority">
                        <button id="priority-btn" class="${
                            issue.priority === "high"
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
                    <div class="flex gap-2">
                        <span id="labels">
                            
                        </span>
                    </div>
                </div>
            </div>

            <hr class="w-full border border-gray-200">

            <div class="lower-part space-y-2 p-3">
                <p id="author" class="text-[#64748B] text-xs">#1 by john_doe</p>
                <p id="created-at" class="text-[#64748B] text-xs">1/15/2024</p>
            </div>
        `;

        cardsContainer.appendChild(card);
    });
}

loadAllIssues();