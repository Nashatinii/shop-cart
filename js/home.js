var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCateg=document.getElementById("productCateg");
var productDesc=document.getElementById("productDesc");
var productcount=document.getElementById("productcount")

var productContainer
if(localStorage.getItem("ourproducts") == null ){
    productContainer=[];
}
else{
productContainer=JSON.parse(localStorage.getItem("ourproducts"))
displayproduct();
}


var mood="add"; //to know the func of the btn add or update
 var temp; //to catch the value of i in the whole code

the_main_color(); //to make add buuton default  color 

function addProduct(){
    var product = {
        Name:productName.value,
        Price:productPrice.value,
        Categ:productCateg.value,
        Desc:productDesc.value,
        count:productcount.value,
        }

        if(mood==='add'){
            if(product.count>1){
                for(var i=0;i<product.count;i++){
       productContainer.push(product);
       localStorage.setItem("ourproducts",JSON.stringify(productContainer))
                }
            }else{
       productContainer.push(product);
       localStorage.setItem("ourproducts",JSON.stringify(productContainer))
            }
        add_alert();
        check();

        }else{       //if mood is update now
            productContainer[temp]=product;
            mood='add'; //to return to add mode to add items as its func
            document.getElementById("add").innerHTML='Add product'
            productcount.style.display='block'
   hidecount.style.display='block';
   the_main_color();
    update_alert();
    clearvalue();
    localStorage.setItem("ourproducts",JSON.stringify(productContainer))
        }
      
// console.log(product);
displayproduct();
// clearvalue();

// check();
}


function displayproduct() {
var productlist="";
for(var i=0 ; i<productContainer.length;i++){
productlist+=`
<tr>
<td> ${i+1}</td>
<td> ${productContainer[i].Name}</td>
<td> ${productContainer[i].Price}</td>
<td> ${productContainer[i].Categ}</td>
<td> ${productContainer[i].Desc}</td>

<td> <button class="btn btn-danger mt-3" onclick="deleterow(${i})">Delete</button>
<i class="fa-solid fa-trash"></i>
</td>
<td> <button class="btn btn-warning mt-3" onclick="update(${i})">update</button>
<i class="fa-solid fa-upload"></i>
</td>
</tr>
`
}
document.getElementById("tBody").innerHTML=productlist
}

function deleteall(){
    productContainer.splice(0);
    displayproduct();
    delete_alert();
    localStorage.setItem("ourproducts",JSON.stringify(productContainer))
}

function clearvalue(){
    productName.value="";
    productCateg.value="";
    productDesc.value="";
    productPrice.value="";
    productcount.value="";
}
function deleterow(i){
    productContainer.splice(i,1);
    displayproduct();
delete_alert();
localStorage.setItem("ourproducts",JSON.stringify(productContainer))
}


function update(i){
    productName.value=productContainer[i].Name;
   productPrice.value=productContainer[i].Price;
   productCateg.value=productContainer[i].Categ;
   productDesc.value=productContainer[i].Desc;
   mood='update'
  temp=i;

   productcount.style.display='none';
   hidecount.style.display='none';
  document.getElementById("add").innerHTML='Update product';
changecolor();
  scroll({
    top:0,
    behavior:"smooth"
  })
//   clearvalue();

    // console.log(i);
}

function add_alert(){
    var messageContainer = document.getElementById('messageContainer');
    messageContainer.classList.remove('hidden');
     // Set the duration in milliseconds (e.g., 3000 milliseconds = 3 seconds)
 var duration = 900;

 // After the specified duration, hide the message again
 setTimeout(function () {
   messageContainer.classList.add('hidden');
 }, duration);
}
function delete_alert(){
    var messageContainer = document.getElementById('messageContainer-delete');
    messageContainer.classList.remove('hidden');
 // Set the duration in milliseconds (e.g., 3000 milliseconds = 3 seconds)
 var duration = 900;

 // After the specified duration, hide the message again
 setTimeout(function () {
   messageContainer.classList.add('hidden');
 }, duration);
}
function update_alert(){
    var messageContainer= document.getElementById("messageContainer-update");
    messageContainer.classList.remove("hidden");
    var duration=900;
    setTimeout(function() { messageContainer.classList.add("hidden")},duration);
}

function changecolor(){
    var color = document.getElementById('add');
    color.classList.add('color_yellow')
    color.classList.remove('btn-info');
}

function the_main_color(){
    var color = document.getElementById('add');
    color.classList.remove('color_yellow')
    color.classList.add('btn-info');
}

function check(){
    if( productName.value==""|| productCateg.value==""||productDesc.value==""||productPrice.value==""||productcount.value==""){
        alert("YOU SHOULD WRITE VALID DATA");
    }
    else {
        clearvalue();
    }
}