import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
$(document).ready(function() {
  $(".search").submit(function(event) {
    event.preventDefault();

    let search = $("#searchFood").val();
    $("#searchFood").val("");

    let xml = new XMLHttpRequest();
    let url = `http://food2fork.com/api/search?key=${process.env.API_KEY}&q=${search}`;

    xml.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    xml.open("GET",url,true);
    xml.send();

    let getElements = function(response) {
      $('#publisher').empty();
      response.recipes.forEach(function(recipe) {

        $('#publisher').append(`<h1>Title ${recipe.title}</h1>`);
        $('#publisher').append(`<img id=\"pics\" class=\"img-thumbnail\" src=\"${recipe.image_url}\" ><br>`);
        $('#publisher').append(`<li><b><em>Publisher: </b></em> ${recipe.publisher}</li>`);
        $('#publisher').append(`<li><b><em>Url       :</b></em> <a target=\"_blank\"href="${recipe.f2f_url}">Food2Fork Recipe Link</a></li>`);
        $('#publisher').append(`<li><b><em>Source    :</b></em> <a target=\"_blank\"href="${recipe.source_url}">Recipe Source Link</a></li>`);
        $('#publisher').append(`<li><b><em>Recipe Id : </b></em>${recipe.recipe_id}</li>`);
        $('#publisher').append(`<li><b><em>Rank:</b></em> ${recipe.social_rank}</li>`);
        $('#publisher').append(`<li><b><em>Url:</b></em> <a target=\"_blank\"href="${recipe.publisher_url}">Recipe Publisher Link</a></li><br>`);
        $('#publisher').append(`<b><em><hr class=\"my4\">`);

      })
      $(".output").show();

    }

  });

  $("#beer").on("click",function(event){
    event.preventDefault();

    let beerAPI = new XMLHttpRequest();
    let beerURL = "https://api.punkapi.com/v2/beers";

    beerAPI.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        let beer_api_response = JSON.parse(this.responseText);
        getBeerElements(beer_api_response);
      }
    }

    beerAPI.open("GET",beerURL,true);
    beerAPI.send();
    $("#publisher").empty();
    $("#drinks").empty();
    let getBeerElements = function(beer_api_response) {
      beer_api_response.forEach(function(beer) {
        $('#drinks').append(`<h1>${beer.name}</h1>`);
        $('#drinks').append(`<img id=\"beerpics\" src=\"${beer.image_url}\">`);
        $('#drinks').append(`<li><h3>Description</h3></li>`);
        $('#drinks').append(`<li>${beer.description}</li>`);
        $('#drinks').append(`<li>abv: ${beer.abv}</li>`);
        $('#drinks').append(`<li>ibu: ${beer.ibu}</li>`);
        $('#drinks').append(`<li>target_fg: ${beer.target_fg}</li>`);
        $('#drinks').append(`<li>target_og: ${beer.target_og}</li>`);
        $('#drinks').append(`<li>ebc: ${beer.ebc}</li>`);
        $('#drinks').append(`<li>srm: ${beer.srm}</li>`);
        $('#drinks').append(`<li>ph: ${beer.ph}</li>`);

        $('#drinks').append(`<hr class="my-4">`);
      });

    }
  });

});
