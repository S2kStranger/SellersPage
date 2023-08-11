var pname = document.getElementById('name');
var pprice = document.getElementById('price');
var productid = document.getElementById('productid');
var btnsubmit = document.getElementById('submit');
var myform = document.getElementById('myform');
var tcost = document.getElementById('tcost');
let totamt = parseInt(tcost.value,10);

window.addEventListener("DOMContentLoaded", () => {
    //console.log("Calling event listener");
    axios.get("http://localhost:3000/getProducts")
    .then(response => {
    //console.log(response);
    let totamt = 0;
    for(var i=0;i<response.data.allproducts.length;i++)
    {
        //console.log(response.data.allproducts[i]);
        listProducts(response.data.allproducts[i]);
    }
    })
    .catch(err => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    })
})

function listProducts(obj) {
    var str=`${obj.price} - ${obj.productName}`;
    //creating li attribute
    var data=document.getElementById('plist');
    var li=document.createElement('li');
    li.appendChild(document.createTextNode(str));

    //create delete button
    var deletebtn=document.createElement('button');
    deletebtn.appendChild(document.createTextNode('Delete Product'));
    li.append(deletebtn);
    deletebtn.classList.add('btn');

    //add eventlistener to delete button
    deletebtn.addEventListener('click',(e) => {
        e.preventDefault();
        li.remove();
        axios.delete(`http://localhost:3000/deleteProduct/${obj.id}`)
            .then(result => {
                totamt = totamt-parseInt(obj.price,10);
                tcost.value=totamt;
                console.log("Product deleted");
            })
            .catch(err => {
                document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
                console.log(err);
            })
    })

    data.appendChild(li);

    totamt = totamt+parseInt(obj.price,10);
    tcost.value=totamt;
}



myform.addEventListener('submit', async (e) =>  {
    e.preventDefault();

    try{

        const productObj={
            pname: pname.value,
            pprice : pprice.value,
        }
        //console.log("Sumbit event listener added");
        const response = await axios.post('http://localhost:3000/postProduct',productObj);
        const productdetail=response.data.productdata;
        //console.log(userdetail);
        listProducts(productdetail);
        myform.reset();
    }catch(err) {
        document.body.innerHTML = document.body.innerHTML+'<h4>Duplicate values</h4>';
        console.log(err);
    }
})




