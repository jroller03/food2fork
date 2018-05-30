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
    let url = `http://food2fork.com/api/search?key=652282850d8832061fa94909007a95f6&q=${search}`;

    xml.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    xml.open("GET",url,true);
    xml.send();

    let getElements = function(response) {
      response.recipes.forEach(function(recipe) {
        $('#publisher').append(`<h1>Title ${recipe.title}</h1>`);
        $('#publisher').append(`<img id=\"pics\" src=\"${recipe.image_url}\" ><br>`);
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
});
