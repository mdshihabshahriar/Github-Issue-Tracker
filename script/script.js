let currentTab = "all";

const loadCard = ()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => displayCard(data.data))
}

const displayCard = (data) =>{
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ""

    data.forEach(d => {
        const card = document.createElement("div")
        card.innerHTML = `
                <div onclick="loadDetail(${d.id})" class="card bg-base-100 space-y-3 shadow-xl p-4 border-t-4 border-[#00A96E]">
                    <div class="flex justify-between">
                        <img src="./assets/Open-Status.png" alt="">
                        <span class="bg-red-100 rounded-xl text-[#EF4444] px-2">${d.priority.toUpperCase()}</span>
                    </div>
                    <div class="space-y-3">
                        <h4 class="font-semibold text-[#1F2937] text-[14px]">${d.title}</h4>
                        <p class="text-[#64748B] text-xs">${d.description}</p>
                        <span class="bg-red-100 rounded-xl text-[#EF4444] px-2 text-xs">${d.labels[0]?.toUpperCase() || ""}</span>
                        <span class="bg-yellow-100 text-[#D97706] px-2 text-xs">
                        ${d.labels[1]?.toUpperCase() || ""}</span>
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

loadCard()

const countIssue = ()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data =>{
        const issues = data.data
        document.getElementById("count-issue").innerText = issues.length + " Issues"
    })
}

countIssue();

const loadDetail = async (id)=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    console.log(url)
    const res = await fetch(url)
    const details = await res.json()
    displayCardDetails(details.data)
}

const displayCardDetails = (data) =>{
    console.log(data)
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `
        <div class="space-y-2">
            <h4 class="font-bold text-2xl text-[#1F2937]">${data.title}</h4>
            <span class="font-medium text-[#ffffff] bg-[#00A96E] p-2 rounded-xl">${data.status.toUpperCase()}</span>
            <span class="text-[#64748B] text-xs">Opened by ${data.assignee}</span>
            <span class="text-[#64748B] text-xs">${data.createdAt}</span>
        </div>
        <div>
            <span class="bg-red-100 rounded-xl text-[#EF4444] px-2 text-xs">${data.labels[0]?.toUpperCase() || ""}</span>
            <span class="bg-yellow-100 text-[#D97706] px-2 text-xs">${data.labels[1]?.toUpperCase() || ""}</span>
        </div>
        <div>
            <p class="text-[#64748B] text-[16px]">${data.description}</p>
        </div>
        <div class="flex space-x-30">
            <div class="space-y-1">
                <p class="text-[#64748B] text-[16px]">Assignee:</p>
                <p class="font-semibold text-[#1F2937] text-[16px]">${data.assignee}</p>
            </div>
            <div>
                <p class="text-[#64748B] text-[16px]">Priority:</p>
                <span class="font-medium text-[#FFFFFF] bg-red-500 text-[12px] rounded-xl p-2">${data.priority.toUpperCase()}</span>
            </div>
        </div>
    
    `
    document.getElementById("card_modal").showModal()
}

function switchTab(tab){
    console.log(tab);
    const tabs = ["all", "open", "close"];
    currentTab = tab;

    for(const t of tabs){
        const tabName = document.getElementById("tab-"+t);
        if(t === tab)
        {
            tabName.classList.add("btn-neutral");
            tabName.classList.remove("bg-white");
        }
        else
        {
            tabName.classList.remove("btn-neutral");
            tabName.classList.add("bg-white");
        }
    }

    const pages = [allContainer, interviewContainer, rejectedContainer];

    for(const section of pages)
    {
        section.classList.add("hidden");
    }
    emptyState.classList.add("hidden"); 

    if(tab === "all")
    {
        allContainer.classList.remove("hidden");
        if(allContainer.children.length < 1)
        {
            emptyState.classList.remove("hidden");
        }
    }
    else if(tab === "interview")
    {
        interviewContainer.classList.remove("hidden");
        if(interviewContainer.children.length < 1)
        {
            emptyState.classList.remove("hidden");
        }
    }
    else
    {
        rejectedContainer.classList.remove("hidden");
        if(rejectedContainer.children.length < 1)
        {
            emptyState.classList.remove("hidden");
        }
    }
    updateStat();
}