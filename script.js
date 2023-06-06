//Criando uma variavel mais clean para o querySelector
let modalQt = 1;
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//Criando a área das pizzas e mostrando na tela, listagem das pizzas 
pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //Setando atributo da key
    pizzaItem.setAttribute('data-key', index);

    //Preenchendo o item 
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //Adicionado evento de click nas pizzas / efeito de transição do modal 
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        //Adicionando um id para saber quais pizza está selecioando e adiconando nome das pizzas no modal
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        let modalQt = 1;  

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, indexSize)=>{
            if(indexSize == 2){
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[indexSize];
        });

        c('.pizzaInfo--qt').innerHTML = modalQt;
        
        
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.pizza-area').append(pizzaItem);

});

//Eventos do MODAL
function closedModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);

}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closedModal);
})