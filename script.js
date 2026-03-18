const url = 'https://jsonplaceholder.typicode.com/users';
const users = document.getElementById("usuarios");
const button = document.getElementById("cargar");
const items = document.getElementById("items");
const search = document.getElementById("search");
const load = document.getElementById("load");
let chill = true;


function CreateComponent(user){
    let box = document.createElement("div");
    let name = document.createElement("h3");
    let email = document.createElement("p");
    let phone = document.createElement("p");
    let web = document.createElement("p")
    let city = document.createElement("p");
    let company = document.createElement("p");

    name.textContent = user.name;
    email.textContent ="📧 "+user.email;
    city.textContent = "🌆 "+user.address.city;
    company.textContent = "🏢 "+user.company.name;
    phone.textContent = "📱 "+ user.phone;
    web.textContent = "🌐 "+ user.website;

    box.append(name,email,phone,web,city,company);
    box.classList.add("item");
    return box;
}

async function RenderResponse(response) {
    items.innerHTML = "";
    if(chill){
        response.forEach(r => {
            items.appendChild(CreateComponent(r));
        });
    }
    else{
        let message = document.createElement("h3");
        message.textContent = `Lo sentimos pero tuvimos un error en la peticion fue un ${response.status}.`;
        console.log(response);
        items.appendChild(message);
    }
}



async function GetResponse()
{
    load.style.display = "block";

    let resp = fetch(url)
    .then(r=>{
        if(!r.ok)
        {            
            chill = false;   
            return r;         
        }
        chill = true;
        return r.json();
    })
    .then(json =>{
        console.log(json)
        return json;
    })
    .catch(error =>{        
        console.log("fallo aca")
        console.log(error)  
    }) 

    load.style.display = "none";
    return resp;
}

button.addEventListener("click",async ()=>{
    let response = await GetResponse();
    RenderResponse(response);
})