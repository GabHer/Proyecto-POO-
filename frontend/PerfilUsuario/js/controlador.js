var id = document.getElementById('id').value
axios({
  url:'../../backend/api/usuarios.php?idUsuario='+id,
  method: 'GET',
  dataType: 'json'
}).then((res)=>{
  document.getElementById('perfil').innerHTML = `<img class="img-fluid img-thumbnail rounded-circle" style="height: 300px; width: 300px;" src="${res.data.urlProfileImage}" alt="" srcset="">`
  document.getElementById('information').innerHTML = ` <h3><b>Name:</b> ${res.data.name}; <b>Lastname:</b> ${res.data.lastName};  <b>Birthday:</b> ${res.data.birthday}; <b>Country:</b> ${res.data.country};  <b>Address:</b> ${res.data.address};    <b>Phone:</b> ${res.data.phone};    <b>Email:</b> ${res.data.email};   <b>Card:</b> ${res.data.creditNumber}</h3>`;
  document.getElementById('user').innerHTML = `<h1  class="display-4 letter" style="color: #f9a826;"> ${res.data.name} ${res.data.lastName}</h1>`;
} ).catch((error)=>{
  console.error(error);
});

function verPerfilesEmpresas() {
  axios({
    url:'../../backend/api/empresas.php',
    method: 'GET',
    dataType: 'json'
  }).then((res)=>{
  console.log(res.data);
  document.getElementById('area').innerHTML = ''
  for(let llave in res.data){
    document.getElementById('area').innerHTML += `
    <div class="col-xl-3 col-lg-4 col-mol-6 col-12 cardE" style="border-radius: 10px;">
    <div class="row row-cols-1 row-cols-md-2" >
    <div class="col mb-4">
      <div class="card " style="font-family: 'Comic Neue', cursive; margin-top:5px">
        <img style="height:150px; width: 240px; border-radius: 10px 10px 0px 0px;" src="../PerfilEmpresa/${res.data[llave].urlProfileImage}" class="card-img-top" alt="...">
        <div class="card-body ">
          <h5 class="card-title"><b>${res.data[llave].nameEnterprise}</b></h5>
          <hr>
          <p class="card-text">Dirección: ${res.data[llave].addressEnterprise}<br>Telefono: ${res.data[llave].phoneNumberEnterprise}<br>Email: ${res.data[llave].emailEnterprise}</p>
        </div>
      </div>
    </div>
    </div>

      <ul style="color:white; font-size: 20px; text-align: center" onclick="productsEnterprise('${llave}')" class=" ml-auto">
      See Products</ul>

    </div>
        `
      }
  }).catch((error)=>{
    console.error(error);
  });
}

function favEmpresasPromo() {
  document.getElementById('area').innerHTML = '';
  document.getElementById('area').innerHTML = `
  <div class="container-fluid ">
  <div class="row">
  <div class="btn-group m-auto"  style="margin-left:50px;" role="group" aria-label="Basic example">
    <button onclick="favEmpresas()" type="button" class="btn btn-secondary">Empresas</button>
    <button onclick="favPromo()" type="button" class="btn btn-secondary">Promociones</button>
  </div>
  </div>
  <div class="row" style="margin-top: 60px;" id="area2"></div>
  </div>
  `;
}

function favEmpresas() {
  document.getElementById('area2').innerHTML = "";
  for (i = 0; i < usuarios.length; i++) {
    for (j = 0; j < usuarios[i].EmpresasFav.length; j++) {
      document.getElementById('area2').innerHTML += `
    <div class="col-xl-3 col-lg-4 col-mol-6 col-12">
    <div class="row row-cols-1 row-cols-md-2" >
    <div class="col mb-4">
      <div class="card" style="font-family: 'Comic Neue', cursive;">
        <img style="height:150px; width: 240px;" src="${usuarios[i].EmpresasFav[j].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><b>${usuarios[i].EmpresasFav[j].nombre}</b></h5>
          <hr>
          <p class="card-text">Dirección: ${usuarios[i].EmpresasFav[j].direccion}<br>Telefono: ${usuarios[i].EmpresasFav[j].telefono}<br>Email: ${usuarios[i].EmpresasFav[j].email}</p>
        </div>
      </div>
    </div>
    </div>
    </div>
        `
    }
  }
}

function favPromo() {
  document.getElementById('area2').innerHTML = "";
  for (i = 0; i < usuarios.length; i++) {
    for (j = 0; j < usuarios[i].productosfav.length; j++) {
      document.getElementById('area2').innerHTML += `
    <div class="col-xl-3 col-lg-4 col-mol-6 col-12">
    <div class="row row-cols-1 row-cols-md-2" >
    <div class="col mb-4">
      <div class="card" style="font-family: 'Comic Neue', cursive;">
        <img style="height:150px; width: 230px;" src="${usuarios[i].productosfav[j].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><b>${usuarios[i].productosfav[j].nombreProducto}</b></h5>
          <hr>
          <h6 class="card-title"><b>${usuarios[i].productosfav[j].enterprise}</b></h6>
          <p class="card-text">Categoría: ${usuarios[i].productosfav[j].categoria}<br>Precio: ${usuarios[i].productosfav[j].precio}<br>Descripción: ${usuarios[i].productosfav[j].descripcion}</p>
        </div>
      </div>
    </div>
    </div>
    </div>
        `
    }
  }
}

function promEnGoogle() {
  document.getElementById('area').innerHTML = '';
  document.getElementById('area').innerHTML = `<div id="map" class="map">Encuentra las promociones más cerca de ti en GoogleMaps</div>`;
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-87.2276534, 14.0571083]),
      zoom: 17
    })
  });

}

function productsEnterprise(indiceEnterprise){
  document.getElementById('modal-p').innerHTML="";
  document.getElementById('titulo').innerHTML= "";
  $('#modal-productsEnterprise').modal('show');
  axios({
    url:'../../backend/api/empresas.php?idEmpresa='+indiceEnterprise,
    method: 'GET',
    dataType: 'json'
  }).then((res)=>{
  document.getElementById('titulo').innerHTML= res.data.nameEnterprise;
  }).catch((error)=>{
    console.error(error);
  });
  axios({
    url:'../../backend/api/productos.php?idEmpresa='+indiceEnterprise,
    method: 'GET',
    dataType: 'json'
  }).then((res)=>{
  for (let llave in res.data) {
    document.getElementById('modal-p').innerHTML += `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="../PerfilEmpresa/${res.data[llave].urlProductImage}" class="card-img" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 style="margin:0px;" class="card-title"><b>${res.data[llave].nameProduct}</b></h5>
          <p class="card-text">$ ${res.data[llave].priceProduct}<br>${res.data[llave].descriptionProduct}</p>
        </div>
      </div>
    </div>
  </div>
  <hr>`
  }}).catch((error)=>{
    console.error(error);
  });
}


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Código botón subir
jQuery('document').ready(function($){
  var subir = $('.back-to-top');
  subir.click(function(e){
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 500);
  });
  subir.hide();
  $(window).scroll(function(){
      if( $(this).scrollTop() > 200 ) {
          subir.fadeIn();
      } else {
          subir.fadeOut();
      }
  });
  
});
// Termina código