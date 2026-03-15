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
                <div class="card bg-base-100 space-y-3 shadow-xl p-4 border-t-4 border-[#00A96E]">
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