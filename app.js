const loadAllData = async() =>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    const response = await fetch(url);
    const data = await response.json();
    displayShowData(data.data.tools.slice(0, 6));
    
}

const displayShowData = (details) =>{
    const mainUnivberse = document.getElementById('main-univberse');
    mainUnivberse.innerHTML ="";
    // display 6 data show 
    const showAll = document.getElementById('show-all');
    if(details.length < 12){
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden');
    }
    
    // foeach-part
    details.forEach((detail) => {
        // console.log(detail);
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="card w-96 h-full bg-base-100 shadow-xl">
            <figure><img src="${detail.image}" alt=""/></figure>
            <div class="card-body">
            <h2 class=" text-2xl font-semibold">Fetures</h2>
            <ol id="features-list-item" class="text-gray-500 border-b-2 py-2">
  
             <li> ${detail.features[0] ? detail.features[0]:''}</li>
                <li> ${detail.features[1] ? detail.features[1]:''}</li>
                <li> ${detail.features[2] ? detail.features[2]:''}</li>
             <li> ${detail.features[3] ? detail.features[3]:''}</li>
            </ol>
            <div class="flex justify-between">
                <div>
                    <h2 class=" text-2xl font-semibold">${detail.name}</h2>
                    <p class="text-gray-400 mt-2"><i class="fa-solid fa-calendar-days mx-2"></i>${detail.published_in}</p>
                </div>
                <div class="card-actions justify-end">
                    <div class="card-actions justify-end ">
                        <label for="my-modal-6" onclick ="loadDetails('${detail.id}')" class ="mt-5 text-red-500 cursor-pointer"><i class="fa-solid fa-arrow-right"></i></label>
                    </div>
                    <a class="mt-5 text-red-500" href=""></a>
                </div>
            </div>
            </div>
        </div>
        `

        mainUnivberse.appendChild(newDiv);
    });
    // spinner end
    toggoleSpinner(false)
}

// spinner function
const toggoleSpinner = isLoading =>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('hidden');
    }else{
        spinner.classList.add('hidden');
    }
}
// spinner start
toggoleSpinner(true)

// show all data
const displayAllDataShow = async() =>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    const response = await fetch(url);
    const data = await response.json();
    displayShowData(data.data.tools);
}
// sort by date

// modal
const loadDetails = async (id) => {
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    const response = await fetch(url);
    const data = await response.json();
    displayDetails(data.data);
}

const displayDetails = (detail) =>{
    console.log(detail);

    // modal discription part
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = detail.description;

    // Features part
    const featureList= document.getElementById('feature-list');
    featureList.innerHTML = `
        <ul class="text-gray-500 py-2">
            <li>${detail.features[1].feature_name}</li>
            <li>${detail.features[2].feature_name}</li>
            <li>${detail.features[3].feature_name}</li>
        </ul>
    `
    // integration-part
    const integrationsList = document.getElementById('integrations-list');
    integrationsList.innerHTML = `
        <ul class="text-gray-500 py-2">
            <li>${detail.integrations[0] ? detail.integrations[0]: ''}</li>
            <li>${detail.integrations[1] ? detail.integrations[1]: ''}</li>
            <li>${detail.integrations[2] ? detail.integrations[2]: ''}</li>
        </ul>
    `
    // modal-pricing part
    const pricingItems = document.getElementById('pricing-item')
    pricingItems.innerHTML =`
        <div class="text-green-400 font-bold p-3 bg-white rounded-2xl"><span>${detail.pricing[0].price}</span> <br>${detail.pricing[0].plan }</div>
        <div class="text-blue-400 font-bold p-3 bg-white rounded-2xl"><span>${detail.pricing[1].price}</span> <br>${detail.pricing[1].plan}</div>
        <div class="text-red-400 font-bold p-3 bg-white rounded-2xl"><span>${detail.pricing[2].price}</span> <br>${detail.pricing[2].plan}</div>
    `

    // modal img
    const modalImage = document.getElementById('modal-image');
    modalImage.src = `${detail.image_link[0] ? detail.image_link[0] :'Not available'}`;
    // modal-input
    const modalInputDetails = document.getElementById('modal-input-title');
    modalInputDetails.innerText = detail.input_output_examples[0].input ;
    // modal-ouput
    const modalOutputDetails = document.getElementById('modal-output-title');
    modalOutputDetails.innerText = `${detail.input_output_examples[0].output ? detail.input_output_examples[0].output : 'No data found'}`;
    // modal-button-accuracy
    const accuracyMainContainer = document.getElementById('accuracy-main-container');
    accuracyMainContainer.innerHTML= `
     <a  href="" class="${detail.accuracy.score ? detail.accuracy.score: 'hidden'} py-2 px-3 bg-red-400 text-white rounded absolute right-6 top-8"><span id="modal-accuracy">${detail.accuracy.score * 100}% accuracy </span></a>
    `
    

    console.log(detail.input_output_examples[0]);

}



loadAllData();