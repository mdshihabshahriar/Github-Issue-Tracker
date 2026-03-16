let currentTab = "all";

const loadCard = ()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => displayCard(data.data))
}

const createElements = (arr) =>{
    const htmlElements = arr.map(el => `<span class="bg-yellow-100 rounded-xl text-[#D97706] px-2 text-xs">${el}</span>`)
    return htmlElements.join(" ")
}

const manageSpinner = (status)=>{
    if(status == true)
    {
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("card-container").classList.add("hidden")
    }
    else
    {
        document.getElementById("card-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}

const displayCard = (data) =>{
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ""
    
    // update count
    document.getElementById("count-issue").innerText = data.length + " Issues"

    if(data.length == 0)
    {
        cardContainer.innerHTML = `
       <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div class="space-y-2">
                <h2 class="text-2xl font-semibold text-gray-700">No Issues Found</h2>
                <p class="text-gray-500">Try searching with a different keyword.</p>
            </div>
        </div>
        `
        return;
    }

    data.forEach(d => {
        const borderColor = d.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]";

        let priorityColor = "";
        if(d.priority.toLowerCase() === "high")
        {
            priorityColor = "bg-red-100 text-[#EF4444]";
        } 
        else if(d.priority.toLowerCase() === "medium")
        {
            priorityColor = "bg-yellow-100 text-[#D97706]";
        }
        else 
        { 
            priorityColor = "bg-gray-100 text-[#9CA3AF]";
        }

        let statusIcon = "";

        if(d.status === "open")
        {
            statusIcon = "./assets/Open-Status.png";
        }
        else
        {
            statusIcon = "./assets/Closed- Status .png";
        }

        const card = document.createElement("div")
        card.innerHTML = `
                <div onclick="loadDetail(${d.id})" class="card bg-base-100 space-y-3 shadow-xl p-4 border-t-4 ${borderColor} cursor-pointer">
                    <div class="flex justify-between">
                        <img src="${statusIcon}" alt="">
                        <span class="rounded-xl ${priorityColor} px-2">${d.priority.toUpperCase()}</span>
                    </div>
                    <div class="space-y-3">
                        <h4 class="font-semibold text-[#1F2937] text-[14px]">${d.title}</h4>
                        <p class="text-[#64748B] text-xs">${d.description}</p>
                        ${createElements(d.labels)}
                    </div>
                    <div>
                        <hr class="border-gray-200">
                    </div>
                    <div class="space-y-3">
                        <p class="text-[#64748B] text-xs">#${d.id} by ${d.author}</p>
                        <p class="text-[#64748B] text-xs">${d.createdAt}</p>
                    </div>
               </div>
        `
        cardContainer.append(card)
    });
}

loadCard();

const loadDetail = async (id)=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    console.log(url)
    const res = await fetch(url)
    const details = await res.json()
    displayCardDetails(details.data)
}

const displayCardDetails = (data) =>{
    console.log(data)

    let priorityColor = "";
    if(data.priority.toLowerCase() === "high")
    {
        priorityColor = "bg-red-500";
    } 
    else if(data.priority.toLowerCase() === "medium")
    {
        priorityColor = "bg-yellow-500";
    }
    else 
    { 
        priorityColor = "bg-gray-500";
    }

    const statusColor = data.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]";

    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `
        <div class="space-y-2">
            <h4 class="font-bold text-2xl text-[#1F2937]">${data.title}</h4>
            <span class="font-medium text-[#ffffff] ${statusColor} p-2 rounded-xl text-xs">${data.status.toUpperCase()}</span>
            <span class="text-[#64748B] text-xs"> • Opened by ${data.assignee}</span>
            <span class="text-[#64748B] text-xs"> • ${data.createdAt}</span>
        </div>
        <div>
            ${createElements(data.labels)}
        </div>
        <div>
            <p class="text-[#64748B] text-[16px]">${data.description}</p>
        </div>
        <div class="flex space-x-30">
            <div class="space-y-1">
                <p class="text-[#64748B] text-[16px]">Assignee:</p>
                <p class="font-semibold text-[#1F2937] text-[16px]">${data.assignee ? data.assignee : "Not Available"}</p>
            </div>
            <div class="space-y-1">
                <p class="text-[#64748B] text-[16px]">Priority:</p>
                <span class="font-medium text-[#FFFFFF] ${priorityColor} text-[12px] rounded-xl p-2">${data.priority.toUpperCase()}</span>
            </div>
        </div>
    
    `
    document.getElementById("card_modal").showModal()
}


document.getElementById("btn-search").addEventListener("click",()=>{
    const input = document.getElementById("input-search")
    const searchText = input.value.trim().toLowerCase()
    manageSpinner(true)
    console.log(searchText)
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    .then(res=>res.json())
    .then(data=>{
        const allWords = data.data
        console.log(allWords)
        const filterWords = allWords.filter(issue=>issue.title.toLowerCase().includes(searchText))
        displayCard(filterWords)
        manageSpinner(false)
        input.value = "";
    });
})

let allIssues = [];

const switchTab = (tab) => {
    manageSpinner(true);
    const tabs = ["all", "open", "close"];

    // button active 
    for(const t of tabs){
        const tabBtn = document.getElementById("tab-" + t);
        if(t === tab){
            tabBtn.classList.add("btn-primary");
            tabBtn.classList.remove("bg-white");
        } else {
            tabBtn.classList.remove("btn-primary");
            tabBtn.classList.add("bg-white");
        }
    }

    // filter issues
    let filtered = [];
    if(tab === "all"){
        filtered = allIssues;
    } else if(tab === "open"){
        filtered = allIssues.filter(i => i.status === "open");
    } else if(tab === "close"){
        filtered = allIssues.filter(i => i.status === "closed");
    }

    displayCard(filtered);
    manageSpinner(false);
};

const fetchIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data; // save all issues
            switchTab("all");      // initially all
        });
};

fetchIssues()

document.getElementById("tab-all").addEventListener("click", () => switchTab("all"));
document.getElementById("tab-open").addEventListener("click", () => switchTab("open"));
document.getElementById("tab-close").addEventListener("click", () => switchTab("close"));
