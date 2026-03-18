const url = 'https://jsonplaceholder.typicode.com/users';
const users = document.getElementById("usuarios");
const button = document.getElementById("cargar");
const items = document.getElementById("items");
const search = document.getElementById("search");
const load = document.getElementById("load");
let chill = true;
let listusers = [];
let listsearch = [];

class User{
    constructor(name,email,phone,web,city,company)
    {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.web = web;
        this.city = city;
        this.company = company;
    }
}

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
    city.textContent = "🌆 "+user.city;
    company.textContent = "🏢 "+user.company;
    phone.textContent = "📱 "+ user.phone;
    web.textContent = "🌐 "+ user.web;

    box.append(name,email,phone,web,city,company);
    box.classList.add("item");
    return box;
}

async function RenderList(list) {
    items.innerHTML = "";
    if(list.length > 0){
        list.forEach(u => {
            items.appendChild(CreateComponent(u));
        });
    }
    else{
        let message = document.createElement("h3");
        message.textContent = `Lo sentimos pero no hay ningun usuario.`;
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

async function LoadList(response) {
    if(chill && listusers.length <= 0){
        response.forEach(r => {
            listusers.push(
                new User(
                    r.name,
                    r.email,
                    r.phone,                    
                    r.website,
                    r.address.city,
                    r.company.name
                )
            )
        });
    }
}

async function LoadListSearch(text) {
    if(text.trim() != ""){
        listsearch = listusers.filter(x => x.name.trim().toUpperCase().includes(text.trim().toUpperCase()));
    }
    else{
        listsearch = listusers;
    }
}

button.addEventListener("click",async ()=>{
    let response = await GetResponse();
    LoadList(response);
    RenderList(listusers);
})

search.addEventListener("input",() =>{
    LoadListSearch(search.value)
    RenderList(listsearch)
})