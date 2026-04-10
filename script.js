let items = []

async function loadItems(){

const local = localStorage.getItem("items")

if(local){
items = JSON.parse(local)
render()
return
}

try{

const response = await fetch('./items.json')
items = await response.json()

saveLocal()
render()

}catch(err){
console.error("โหลด JSON ไม่ได้",err)
}

}

function render(){

let html = ""

items.forEach((item,index)=>{

html += `

<tr>

<td>
<input type="checkbox" class="select">
</td>

<td>${index+1}</td>

<td>
<input value="${item.spawn || ''}" 
onchange="update(${index},'spawn',this.value)">
</td>

<td>
<input value="${item.label || ''}" 
onchange="update(${index},'label',this.value)">
</td>

<td>
<input type="checkbox" 
${item.gift ? "checked" : ""} 
onchange="update(${index},'gift',this.checked)">
</td>

<td>
<input type="checkbox" 
${item.drop ? "checked" : ""} 
onchange="update(${index},'drop',this.checked)">
</td>

<td>
<input type="checkbox" 
${item.use ? "checked" : ""} 
onchange="update(${index},'use',this.checked)">
</td>

<td>
<input type="checkbox" 
${item.trunk ? "checked" : ""} 
onchange="update(${index},'trunk',this.checked)">
</td>

<td>
<input type="checkbox" 
${item.trade ? "checked" : ""} 
onchange="update(${index},'trade',this.checked)">
</td>

<td>
<input 
value="${item.limit || ''}" 
onchange="update(${index},'limit',this.value)">
</td>

</tr>

`

})

document.getElementById("itemList").innerHTML = html

}

function update(index,key,value){

items[index][key] = value
saveLocal()

}

function addItem(){

items.push({

spawn:"",
label:"",
gift:true,
drop:true,
use:true,
trunk:true,
trade:false,
limit:""

})

saveLocal()
render()

}

function removeSelected(){

const rows = document.querySelectorAll("tbody tr")

items = items.filter((item,index)=>{

return !rows[index].querySelector(".select").checked

})

saveLocal()
render()

}

function saveLocal(){

localStorage.setItem("items",JSON.stringify(items))

}

function saveJSON(){

console.log(JSON.stringify(items,null,2))
alert("Copy JSON จาก Console")

}

loadItems()