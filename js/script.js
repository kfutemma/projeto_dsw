var map;
var infoWindow;

// markersData variáveis que armazena os dados dos pedágios
var markersData = [
   {lat :-22.771146,
   lng: -47.022172, 
   name: "Pedágio Jaguariúna",
   address1:"Rodovia Campinas-Mogi Mirim, Km 124, s/n",
   address2: "Campinas - SP",
   price: "Preço: R$ 11.60"
 },
   {lat :-22.857450,
   lng: -47.300405,
   name: "Pedágio Sumaré",
   address1:"Rodovia dos Bandeirantes, Km 115, s/n",
   address2: "Sumaré - SP",
   price: "Preço: R$ 7.80"
 },
   {lat :-22.770797,
   lng: -47.239024,
   name: "Pedágio Nova Odessa",
   address1:"Rodovia Anhanguera, Km 115, s/n",
   address2: "Nova Odessa - SP",
   price: "Preço: 7.80"
 },
   {lat :-23.013010,
   lng: -47.022993,
   name: "Pedágio Valinhos",
   address1:"Rodovia Anhanguera, Km 82, s/n",
   address2: "Valinhos - SP",
   price: "Preço: 8.80"
},
   {lat :-23.058137,
   lng: -47.044032,
   name: "Pedágio Itupéva",
   address1:"Rodovia dos Bandeirantes, Km 77, s/n",
   address2: "Itupéva - SP",
   price: "Preço: R$ 8.80"
},
   {lat :-23.063418,
   lng: -47.154831,
   name: "Pedágio Indaiatuba",
   address1:"Rodovia Eng. Ermênio de Oliveira Penteado, Km 60, s/n",
   address2: "Indaiatuba - SP",
   price: "Preço: R$ 12,80"
},
   {lat :-22.690273,
   lng: -47.154936,
   name: "Pedágio Cosmópolis",
   address1:"Rodovia Professor Zeferino Vaz, Km 132, s/n",
   address2: "Cosmópolis - SP",
   price: "Preço: R$ 8.00"
},
   {lat :-22.977969,
   lng: -47.350943,
   name: "Pedágio Monte Mor",
   address1:"Rodovia Jorn. Francisco Aguirre Proença, Km 28, s/n",
   address2: "Monte Mor - SP",
   price: "Preço: R$ 6.70"
},
   {lat : -22.953887,
   lng: -46.859348,
   name: "Pedágio Itatiba",
   address1:"Rodovia Dom Pedro I, Km 110, s/n",
   address2: "Itatiba - SP",
   price: "Preço: R$ 9,50"}
];


function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng( -22.851441, -47.127274),
      zoom: 10,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   // cria a janela com as informações
   infoWindow = new google.maps.InfoWindow();

   // evento que fecha a info 
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // chamada da função que mostra as marcações no mapa
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);


// Função que faz a iteracão com o array dos dados
function displayMarkers(){

   // essa variável coloca no mapa os bounds de acordo com as marcações
   var bounds = new google.maps.LatLngBounds();
   
   // esse loop varre o array com os dados chamando a função de createMarker para cada marcação
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var name = markersData[i].name;
      var address1 = markersData[i].address1;
      var address2 = markersData[i].address2;
      var price = markersData[i].price;

      createMarker(latlng, name, address1, address2, price);

      // a posição da marcação é add na variável de bound
      bounds.extend(latlng);  
   }

   // então os bounds são add no mapa com essa função
   map.fitBounds(bounds);
}

// essa função cria cada marcação e add a janela de informação
function createMarker(latlng, name, address1, address2, price){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name
   });

   //Esse evento espera um clique em uma marcação
   // quando disparado, a janela com as informações é criado
   // e então a janela é aberta
   google.maps.event.addListener(marker, 'click', function() {
      
      // Formato do conteúdo na janela de informação de cada marcador
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + name + '</div>' +
         '<div class="iw_content">' + address1 + '<br />' +
         address2 + '<br />' +
         price + '</div></div>';
      
      // add conteúdo nas janelas
      infoWindow.setContent(iwContent);

      // abre a janela de informação no mapa com a atual marcação
      infoWindow.open(map, marker);
   });
}



