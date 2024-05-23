const tableBodyDOM = document.getElementById("table-body");
const sortDropDownButtonDOM = document.getElementById("dropdown-button");
const sortDropDownMenuDOM = document.getElementById("dropdown-menu");
const sortDropDownMenuListDOM = document.getElementById("dropdown-menu-ul");

const DROP_DOWN_LIST_ITEM_CLASS = "dropdown-menuItem";

const dropDownMap = {
    eNAME : "Name",
    ePRICE : "Price",
    eDESCRIPTION : "Description"
}

let dataJSON = [];

async function getDataJSONObject(filePathURL)
{
    const response = await fetch(filePathURL)
    const responseJSON = await response.json();
    return responseJSON;
}

const jsonFilePath = "./assets/data/Assignment.JSON";

async function initGetJSONDataObject()
{
    dataJSON = await getDataJSONObject(jsonFilePath);
}

function getTableRowHTML(row)
{
    const rowHTML = `
    <tr class="bg-white border-b dark:bg-gray-500 dark:border-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-100 whitespace-nowrap dark:text-white">
            ${row.name}
        </th>
        <td class="px-6 py-4">
            ${row.category}
        </td>
        <td class="px-6 py-4">
            ${row.description}
        </td>
        <td class="px-6 py-4">
            $${row.price}
        </td>
    </tr>`;
    return rowHTML;
}

function updateTable(dataObjList)
{
    let tableContentHTML = "";
    for (const data of dataObjList)
    {
        tableContentHTML += getTableRowHTML(data);
    }
    tableBodyDOM.innerHTML = tableContentHTML;
}

// function create drop down list
function InitDropDownList()
{
    let allListItemHTML = "";

    for (const value of Object.values(dropDownMap))
    {
        allListItemHTML += `
        <li>
            <a href="#" class="${DROP_DOWN_LIST_ITEM_CLASS} block px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-500 dark:hover:text-white">${value}</a>
        </li>
        `;
    }
    sortDropDownMenuListDOM.innerHTML = allListItemHTML;
}

// function to sort the List
function sortList(dataObjList, selectedCAT)
{
    dataObjList.sort((obj1, obj2)=>{

        switch (selectedCAT)
        {
            case dropDownMap.eNAME:
                return obj1.name.localeCompare(obj2.name);
            case dropDownMap.ePRICE:
                return obj1.price - obj2.price;
            case dropDownMap.eDESCRIPTION:
                return obj1.description.localeCompare(obj2.description);
            default:
                return 0;
        }
    });
}

function objectDisplayHide(object, isHide)
{
    if ((isHide && !object.classList.contains("hidden")) ||
        (!isHide && object.classList.contains("hidden")))
    {
        object.classList.toggle("hidden");
    }
}

function actionSelectedSortCategory(selectedCAT)
{
    sortDropDownButtonDOM.innerHTML = `Sort By : ` + selectedCAT + 
    `<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>`;
    sortList(dataJSON, selectedCAT);

    //console.log(dataJSON);

    updateTable(dataJSON);
    objectDisplayHide(sortDropDownMenuDOM, true);
}


// ****************************** Implementation *************************** //

sortDropDownButtonDOM.addEventListener("click", (event)=>{
    sortDropDownMenuDOM.classList.toggle("hidden");
});

// Must Init The List First To have the class name object
InitDropDownList();

// Add Event Listener to all the Drop Down Menu List Item
// Do Update the Drop Down Button Current Sorting Category
// Do Sorting by the category
// Do Update the table
const allDropDownMenuListDOM = document.querySelectorAll("." + DROP_DOWN_LIST_ITEM_CLASS);

for (const eachMenuListDOM of allDropDownMenuListDOM)
{
    eachMenuListDOM.addEventListener("click", (event)=>{
        actionSelectedSortCategory(event.target.textContent);
    });
}

await initGetJSONDataObject();
//console.log(dataJSON);
updateTable(dataJSON);