$(document).ready(function(){

	$("#form-data").submit(function(e){

		var content = tinymce.get("texteditor").getContent();

		$("#data-container").html(content);

		return false;

	});

	$("#set-data-btn").on("click", function(e) {
		
		var content = "<p>Hello World</p>";

		tinymce.get("texteditor").setContent(content);

	});

});