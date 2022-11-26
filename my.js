let state = {
    films: [
        {
            id: idGen(),
            name: "Bosszuállók",
            studio: "Marvel Studios",
            year: 2012,
            img: "Bosszúállók.jpg",
        },
        {
            id: idGen(),
            name: "Shazam!",
            studio: "Warner Bros",
            year: 2019,
            img: "Shazam!_(film)_poster.jpg"
        },
        {
            id: idGen(),
            name: "Doctor Strange az őrület multiverzumában",
            studio: "Marvel Studios",
            year: 2022,
            img: "Dr_Strange2.jpg"
        },
        {
            id: idGen(),
            name: "Pókember: Nincs hazaút",
            studio: "Marvel Studios",
            year: 2021,
            img: "spiderman_no_way_home_extra-poster.jpg"
        },
        {
            id: idGen(),
            name: "Az öngyilkos osztag",
            studio: "Warner Bros",
            year: 2021,
            img: "suicidsquad.jpg"
        },
        {
            id: idGen(),
            name: "Az Igazság Ligája",
            studio: "Warner Bros",
            year: 2017,
            img: "justicel.jpg"
        },
        {
            id: idGen(),
            name: "Avatar: A víz útja",
            studio: "20th Century Fox",
            year: 2022,
            img: "avatar2.jpg"
        },
    ],
    order: false,
    event: "read",
    currentID: null
};
function idGen() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function cardAppear(id) {
    let index = searchIndex(id)
    renderCard(index);
}

function renderCard(index) {
    film = state.films[index]
    let cardHtml =  `
        <img src="${'images/'+film.img}" class="card-img-top" alt="${film.name}" title="${film.name}">
    <div class="card-body">
        <h5 class="card-title">${film.name}</h5>
        <p class="card-text">${film.studio}</p>
        <p class="card-text">${film.year}</p>
    </div>
    `
    
    document.getElementById("card").innerHTML = cardHtml
}

    function tableRender(keresett) {
        let tableHTML ="";
    for (const film of keresett) {
        tableHTML += `<tr>`;
    for (const key in film) {
            if (key != "id" && key != "img") {
        tableHTML += `<td onclick="cardAppear('${film.id}')"> ${film[key]}  </td>`;

            }
        }
    tableHTML += `<td class="d-flex flex-row m-2">
        <!-- Törlés -->
        <button type="button"
            class="btn btn-danger btn-sm"
            onclick="deleteFilm('${film.id}')"
        >
            <i class="bi bi-trash3"></i>
        </button>

        <!-- Módosítás -->
        <button type="button"
            class="btn btn-success ms-2 btn-sm"
            onclick="updateFilm('${film.id}')" id="update-film"
        >
            <i class="bi bi-pencil"></i>
        </button>
    </td>`

    tableHTML += "</tr>"
    }
document.getElementById("tbody").innerHTML = tableHTML;
}

let masolat = [...state.films]

tableRender(state.films)

function searchIndex(id) {
    for (let index = 0; index < state.films.length; index++) {
        if (id === state.films[index].id) {
            return index
        }
    }
}


function SortName() {
    state.order = !state.order
    if (state.order) {

        state.films.sort((a, b) => a.name.localeCompare(b.name))
    } else {
        state.films.sort((a, b) => b.name.localeCompare(a.name))

    }
    tableRender(state.films)
}
function SortYear() {
    state.order = !state.order
    if (state.order) {
        state.films.sort((a, b) => a.year - b.year)
    } else {
        state.films.sort((a, b) => b.year - a.year)

    }
    tableRender(state.films)

}


function categories() {

    let kategoria = document.getElementById("kategoriak").value
    keresett = masolat.filter(film => film.studio.includes(kategoria))
    tableRender(keresett)
    console.log(keresett);
}


function Search() {

    let beirtAdat = document.getElementById("SearchText").value;
    keresett = state.films.filter(film => {
        return film.name.toLowerCase().includes(beirtAdat.toLowerCase())
    })
    tableRender(keresett);
    console.log(keresett);
}

// film torlese
function deleteFilm(id) {
    state.event = "delete";
    let index = searchIndex(id)
    state.films.splice(index, 1)
    tableRender(state.films)
}

// film modositasa
function updateFilm(id) {
    state.event = "update"
    state.currentID = id

    let index = searchIndex(id)

    let name = state.films[index].name
    let studio = state.films[index].studio
    let year = state.films[index].year
    let img = state.films[index].img
  

    document.getElementById("name").value = name
    document.getElementById("studio").value = studio
    document.getElementById("year").value = year
    document.getElementById("img").value = img

    document.getElementById("title-new").classList.add("d-none")
    document.getElementById("title-update").classList.remove("d-none")

    formView()


}

// megse gomb
document.getElementById("film-cancel").onclick = function (id) {
    state.event = "read";
    fromHide();
}

function fromHide() {
    document.getElementById("createTable").classList.add("d-none")
}

function formView() {
    document.getElementById("createTable").classList.remove("d-none")
}

// uj film hozzaadasa
document.getElementById("create-film").onclick = function (id) {
    state.event = "create";

    document.getElementById("title-new").classList.remove("d-none")
    document.getElementById("title-update").classList.add("d-none")
    formView()
}

document.getElementById("film-save").onclick = function (event) {
    event.preventDefault();

    //hozzajutas aza datokhoz
    let name = document.getElementById("name").value;
    let studio = document.getElementById("studio").value;
    let year = document.getElementById("year").value;
    let img = document.getElementById("img").img;

    //validalas
    let errorList = [];
    if (!(name)) {
        window.alert("NameHiba")
        document.getElementById("name-label").classList.add("text-danger")
        errorList.push("Név hiba")
    } else {
        document.getElementById("name-label").classList.remove("text-danger")
    }
    if (!(studio)) {
        window.alert("StudioHiba")
        document.getElementById("studio-label").classList.add("text-danger")
        errorList.push("studio hiba")
    } else {
        document.getElementById("studio-label").classList.remove("text-danger")
    }
    if (!(year)) {
        window.alert("yearHiba")
        document.getElementById("year-label").classList.add("text-danger")
        errorList.push("Év hiba")
    } else {
        document.getElementById("year-label").classList.remove("text-danger")
    }
    if (errorList.length > 0) {
        return;
    }


    //generalas
    let id = idGen();
    if (state.event === "update") {
        id = state.currentID;
    }

    let film = {
        id: id,
        name: name,
        studio: studio,
        year: year,
        img: img
    }
    if (state.event == "create") {
        state.films.push(film)
    } else if (state.event = "update") {
        let index = searchIndex(id);
        state.films[index] = film
    }

    tableRender(state.films);
    fromHide();

    ///mezok uritese
    document.getElementById("name").value = null;
    document.getElementById("studio").value = null;
    document.getElementById("year").value = null;
    document.getElementById("img").value = null;

}
//kategoria rendereleses
function categoriesRender() {
    let kategoriak = state.films.map(film => film.studio)

    let milyenKategoriak = kategoriak.filter(function (kategoria, index, array) {
        return index === kategoriak.indexOf(kategoria)
    })

    let categoriesHTML = `<option value="">Összes</option>`
    for (const kategoria of milyenKategoriak) {
        categoriesHTML += `
        <option value="${kategoria}">${kategoria}</option>
        `
            ;
    }
    document.getElementById("kategoriak").innerHTML = categoriesHTML;
}



function init() {
    tableRender(state.films)
    categoriesRender()
}

window.onload = init();