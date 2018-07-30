jQuery(document).ready(function() {
   jQuery("#user_order").prop("readonly", true);
   //Defaul do no show any of the color selectors 
   jQuery( ".colors_short" ).hide();
   jQuery( ".colors_long" ).hide();
   jQuery( ".colors_sweater" ).hide();
   //In sval we are saving the design selected in the Design Page
   var params = location.search.substr(location.search.indexOf("?")+1);
   var sval = "";
   params = params.split("&");
   for (var i=0; i<params.length; i++) {
       temp = params[i].split("=");
       if ( [temp[0]] == "design" ) { sval = temp[1]; }
   }
   console.log(sval);
   //Definition of "selectSelectableElement" function
   function selectSelectableElement (selectableContainer, elementToSelect){
      elementToSelect.addClass("ui-selected");
   }
   //Definition of "fillupthetext" function
   function fillupthetext (selectableContainer, elementToSelect){
      var preselect=elementToSelect.text();
      console.log("fillupthetext: " + preselect);
      var predesign = jQuery( "#select-result" ).empty();
      predesign.append( preselect );
      var predesign2 = jQuery( "input#id_designSel.wpcf7-form-control.wpcf7-text" ).empty();
      predesign2.val( preselect );
   }
   //If this page is called from the Design Page this will have a value
   //So call to select a design: selectSelectableElement
   //if not, no design should be selected.
   if (sval != ""){
      // select the item sval -1 
      selectSelectableElement (jQuery("#selectDesign"), jQuery("#selectDesign").children().eq(sval-1));
      //and we have to Save the value of the selected DESIGN in field select-result
      //and in field id_designSel
      fillupthetext (jQuery("#selectDesign"), jQuery("#selectDesign").children().eq(sval-1));
   }
   //This one always has to happens every time we select a design
   //Save the value of the selected DESIGN in field select-result
   //and in field id_designSel
   jQuery( "#selectDesign" ).selectable({
      selected: function (event, ui) {
         var result = ui.selected.innerHTML;
         console.log(result);
         var design_r = jQuery( "#select-result" ).empty();
         design_r.append( result );
         var design_r2 = jQuery( "input#id_designSel.wpcf7-form-control.wpcf7-text" ).empty();
         design_r2.val( result ); 
      }
   });
   //Save the value of the selected CLOTHES in field id_garment
   jQuery('.class_shirts').attr('checked', true).change(function(event) {
      var cloth= jQuery('input[name="shirts"]:checked'). val();
      console.log(cloth);
      jQuery( "input#id_garment.wpcf7-form-control.wpcf7-text" ).val(cloth);
      if(cloth == "Shorts Sleeves Tee"){
        console.log("display shorts sleeve colors");
        jQuery( ".colors_short" ).show();
        jQuery( ".colors_long" ).hide();
        jQuery( ".colors_sweater" ).hide();
      }
      else if(cloth == "Long Sleeves Tee"){
        console.log("display long sleeve colors ");
        jQuery( ".colors_short" ).hide();
        jQuery( ".colors_long" ).show();
        jQuery( ".colors_sweater" ).hide();
      }
      else if(cloth == "Sweatshirt"){
        console.log("display sweatershirt colors");
        jQuery( ".colors_short" ).hide();
        jQuery( ".colors_long" ).hide();
        jQuery( ".colors_sweater" ).show();
      }
   });
   //Delete the values of the fields when click in DELETE    
   jQuery("#button_delete").click(function(event){
      event.preventDefault();
      jQuery("#user_order").empty();
      jQuery( "input#quantity.wpcf7-form-control.wpcf7-text" ).val('');
      jQuery("#select-result").empty();
      jQuery( "input#id_designSel.wpcf7-form-control.wpcf7-text" ).val('');
   });
   //Save the order in the textarea #user_order
   jQuery('#button_add').click(function(event) {
      event.preventDefault();
      var design2 = jQuery( "input#id_designSel.wpcf7-form-control.wpcf7-text" ).val();
      var cloth2= jQuery( "input#id_garment.wpcf7-form-control.wpcf7-text" ).val();
      var quantities = jQuery( "input#quantity.wpcf7-form-control.wpcf7-text" ).val();
      console.log(quantities);
      var colores= jQuery( "input#ID_Invisible_color.wpcf7-form-control.wpcf7-text.class_Invisible" ).val();
      console.log(colores);
      var sizes= jQuery( "select#size option:selected" ).val();
      console.log(sizes);
      var previousv= jQuery( "textarea#user_order.wpcf7-form-control.wpcf7-textarea" ).val();
      console.log(previousv);
      jQuery( "textarea#user_order.wpcf7-form-control.wpcf7-textarea" ).append("\nDesign: " + design2 + ". Garment: " + cloth2 + ". Color: " + colores + " . Size: " + sizes+ " . Quantity: " + quantities);
   });
   //SHORT SLEEVES  
   //default, Kelly color is shown
   jQuery("#selected-color").attr("src","http://www.mangotee.org/wp-content/uploads/2015/12/CL050Kelly.png");
   jQuery( "#selec_color" ).selectable({
    selected: function (event, ui) {
     var variable = ui.selected.innerHTML;
     console.log(variable);
         //Save the color Short Sleeve in #ID_Invisible_color to send it in the email
         var color_r = jQuery( "input#ID_Invisible_color.wpcf7-form-control.wpcf7-text.class_Invisible" ).empty();
         color_r.val( variable );
         //to make the img change with the color selected
         var colorElegido= "http://www.mangotee.org/wp-content/uploads/2015/12/CL050"+variable+".png";
         jQuery("#selected-color").attr("src", colorElegido);
       }
     });
   //LONG SLEEVES  
   //default, Purple color is shown
   jQuery("#LGselected-color").attr("src","http://www.mangotee.org/wp-content/uploads/2015/12/CL110Purple.png");
   jQuery( "#selec_colorL" ).selectable({
    selected: function (event, ui) {
     var variable = ui.selected.innerHTML;
     console.log(variable);
         //Save the color LONG in #ID_Invisible_color to send it in the email
         var color_r = jQuery( "input#ID_Invisible_color.wpcf7-form-control.wpcf7-text.class_Invisible" ).empty();
         color_r.val( variable );
         //to make the img change with the color selected
         var colorElegido= "http://www.mangotee.org/wp-content/uploads/2015/12/CL110"+variable+".png";
         jQuery("#LGselected-color").attr("src", colorElegido);
       }
   });
   //SWEATER
   //default, Royal color is shown
   jQuery("#sweater").attr("src","http://www.mangotee.org/wp-content/uploads/2015/12/18000Royal.png")
   jQuery( "#selec_colorS" ).selectable({
    selected: function (event, ui) {
     var variable = ui.selected.innerHTML;
     console.log(variable);
         //Save the color SWEATshirt in #ID_Invisible_color to send it in the email
         var color_r = jQuery( "input#ID_Invisible_color.wpcf7-form-control.wpcf7-text.class_Invisible" ).empty();
         color_r.val( variable );
         var colorElegido= "http://www.mangotee.org/wp-content/uploads/2015/12/18000"+variable+".png";
         //to make the img change with the color selected
         jQuery("#sweater").attr("src", colorElegido);
       }
     });
});